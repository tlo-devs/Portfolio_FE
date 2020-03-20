import {Component, OnInit} from '@angular/core';
import {AdminConfig} from './admin-config';
import {NgForm} from '@angular/forms';
import {FileStore} from './file-store';
import {ActivatedRoute} from '@angular/router';
import {AdminType} from '../_models/admin-type.type';
import {AdminMode} from '../_models/admin-mode.type';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  previewStore: FileStore;
  contentStore: FileStore;

  fileType: 'image' | 'video';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    AdminConfig.type = this.route.routeConfig.path as AdminType;
    this.previewStore = new FileStore();
    this.contentStore = new FileStore();
  }

  onCreate(form: NgForm) {
    console.log(form);
  }

  addFile(event, mode: AdminMode) {
    if (event.target) {
      const file = event.target.files[0];
      if (file) {
        this[mode + 'Store'].add(file);
      }
    } else {
      this[mode + 'Store'].addVideo(event.value);
      event.value = '';
    }
  }

  removeFile(name: string, mode: AdminMode) {
    this[mode + 'Store'].remove(name);
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
