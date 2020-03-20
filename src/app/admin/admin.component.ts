import { Component, OnInit } from '@angular/core';
import {AdminConfig} from './admin-config';
import {NgForm} from '@angular/forms';
import {fromEvent} from 'rxjs';
import {FileStore, FileStoreItem} from './file-store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  files: FileStore;

  constructor() { }

  ngOnInit(): void {
    this.files = new FileStore();
  }

  onCreate(form: NgForm, type: 'portfolio' | 'shop') {
    console.log(form, type);
  }

  get shopConfig(): any[] {
    return AdminConfig.shopConfig;
  }

  get portfolioConfig(): any[] {
    return AdminConfig.portfolioConfig;
  }

  addFile(event) {
    const file = event.target.files[0];
    if (file) {
      this.files.add(file);
    }
  }

  removeFile(name: string) {
    this.files.remove(name);
  }
}
