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

  previewStore: FileStore;
  contentStore: FileStore;

  fileType: 'image' | 'video';
  displayedColumns: string[] = ['id', 'title', 'description', 'category', 'type', 'client', 'year', 'edit'];
  dataSource: MatTableDataSource<ProductItemModel>;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    AdminConfig.type = this.route.routeConfig.path as AdminType;
    this.previewStore = new FileStore();
    this.contentStore = new FileStore();

    this.adminService.get(this.type).subscribe(data => {
      this.dataSource = new MatTableDataSource<ProductItemModel>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onCreate(form: NgForm) {
    const submission = {...form.value};
    delete submission.type;
    const data = FileStore.toDto(submission, this.previewStore, this.contentStore, form.value.type);

    this.adminService.post(this.type, data, this.fileType).subscribe(r => this.dataSource.data = [...this.dataSource.data, r]);
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

  logout() {
    this.auth.logout();
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

    item.title = value.title;
    item.description = value.description;
    item.client = value.client;
    item.year = value.year;
    item.category = value.category;

    this.editMode = false;
  }

  delete(file) {
    this.adminService.delete(this.type, {type: file.type, id: file.id}).subscribe(console.log);
  }

  get shopConfig(): any[] {
    return AdminConfig.shopConfig;
  }

  get portfolioConfig(): any[] {
    return AdminConfig.portfolioConfig;
  }

  get type(): AdminType {
    return AdminConfig.type;
  }
}
