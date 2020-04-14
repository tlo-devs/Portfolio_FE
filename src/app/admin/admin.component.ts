import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminConfig} from './admin-config';
import {NgForm} from '@angular/forms';
import {FileStore} from './file-store';
import {ActivatedRoute} from '@angular/router';
import {AdminType} from '../_models/admin-type.type';
import {AdminMode} from '../_models/admin-mode.type';
import {AuthService} from '../auth/auth.service';
import {AdminService} from './admin.service';
import {MatTableDataSource} from '@angular/material/table';
import {ProductItemModel} from '../_models/product-item.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Category} from './category.enum';
import {noop} from 'rxjs';
import {ValidationModel} from '../_models/validation.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('editForm', {static: false}) editForm: NgForm;

  editMode = false;
  editing: ProductItemModel;
  validation: ValidationModel = {finished: false};

  previewStore: FileStore;
  contentStore: FileStore;
  shopFile: { data: FormData, name: string };

  fileType: 'image' | 'video';
  displayedColumns: string[];
  dataSource: MatTableDataSource<ProductItemModel>;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    AdminConfig.type = this.route.routeConfig.path as AdminType;
    this.displayedColumns = this.type === 'shop'
      ? ['id', 'title', 'description', 'base_price', 'current_price', 'sale', 'edit']
      : ['id', 'title', 'description', 'category', 'type', 'client', 'year', 'edit'];

    this.previewStore = new FileStore();
    this.contentStore = new FileStore();
    if (this.type === 'shop') {
      this.shopFile = {data: new FormData(), name: ''};
    }

    this.adminService.get(this.type).subscribe(data => {
      this.dataSource = new MatTableDataSource<ProductItemModel>(Array.isArray(data) ? data : [data]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onCreate(form: NgForm) {
    this.validation.started = true;
    if (form.valid) {
      const submission = {...form.value};
      if (this.type === 'shop') {
        form.value.type = 'digital';
      }
      delete submission.type;
      if (submission.shopFile) {
        delete submission.shopFile;
      }
      const data = FileStore.toDto(submission, this.previewStore, this.contentStore, form.value.type);
      if (this.type === 'shop') {
        this.shopFile.data.append('data', JSON.stringify(data));
      }
      this.adminService.post(this.type, this.type === 'shop' ? this.shopFile.data : data, form.value.type).subscribe(r => {
          this.validation = {...this.validation, finished: true, value: true, started: false};
          this.dataSource.data = [...this.dataSource.data, r];
          form.resetForm();
          this.previewStore = new FileStore();
          this.contentStore = new FileStore();
          if (this.type === 'shop') {
            this.shopFile = {data: new FormData(), name: ''};
          }
        },
        () => this.validation = {...this.validation, value: false, finished: true, alert: 'REQUEST_INVALID', started: false}
      );
    } else {
      this.validation = {...this.validation, value: false, alert: 'FORM_INVALID', started: false, finished: true};
    }
  }

  addFile(event, mode: AdminMode) {
    if (event.target) {
      const file = event.target.files[0];
      if (file) {
        this[mode + 'Store'].addImage(file);
      }
    } else {
      this[mode + 'Store'].addVideo(event.value);
      event.value = '';
    }
  }

  removeFile(name: string, mode: AdminMode) {
    this[mode + 'Store'].remove(name);
  }

  addShopFile(event) {
    if (event.target.files.length > 0) {
      this.shopFile.data.append('file', event.target.files[0], event.target.files[0].name);
      this.shopFile.name = event.target.files[0].name;
    }
  }

  removeShopFile() {
    this.shopFile.data.delete('file');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  translate(value: string): string {
    return Category[value];
  }

  openEdit(file) {
    this.editMode = true;
    this.editing = file;

    // copy the object to safely delete properties and assign values to the edit form
    const values = {...this.editing};

    // delete because they are not available for edit thus not in the edit form
    delete values.content;
    delete values.preview;
    delete values.id;

    // timeout so setValue waits until the edit form is rendered
    setTimeout(() => this.editForm.setValue(values));
  }

  confirmEdit() {
    const item = this.dataSource.data.find(d => d.id === this.editing.id && d.type === this.editing.type);
    const value = this.editForm.value;

    this.adminService.patch(this.type, item.id, value, item.type).subscribe(
      d => Object.keys(item).forEach(key => item[key] = d[key]),
      err => console.error(err.message)
    );

    this.editMode = false;
  }

  delete(file) {
    this.adminService.delete(this.type, file.id, {type: file.type}).subscribe(
      noop,
      err => console.error(err.message),
      () => this.dataSource.data = this.dataSource.data.filter(d => !(d.id === file.id && d.type === file.type))
    );
  }

  resetContent() {
    this.contentStore = new FileStore();
  }

  error(): string {
    switch (this.validation.alert) {
      case 'FORM_INVALID':
        return 'The form is invalid.';
      case 'REQUEST_INVALID':
        return 'An error has occurred. Please try again or reload the page.';
    }
  }

  get shopConfig(): any {
    return AdminConfig.shopConfig;
  }

  get portfolioConfig(): any {
    return AdminConfig.portfolioConfig;
  }

  get type(): AdminType {
    return AdminConfig.type;
  }
}
