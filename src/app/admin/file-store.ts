import {fromEvent} from 'rxjs';
import {first} from 'rxjs/operators';

export interface FileStoreItem {
  name: string;
  src: string;
}

export class FileStore {

  store: FileStoreItem[];

  constructor(file?: File) {
    this.store = [];
    if (file) {
      this.add(file);
    }
  }

  add(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // ignoring because there is a result property in filereader which is the target
    // @ts-ignore
    fromEvent(reader, 'loadend').pipe(first()).subscribe(r => this.store.push({name: file.name, src: r.target.result}));
  }

  addVideo(url: string) {
    this.store.push({name: url, src: url});
  }

  remove(name: string) {
    this.store = this.store.filter(f => f.name !== name);
  }
}
