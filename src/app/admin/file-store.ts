import {fromEvent} from 'rxjs';
import {first} from 'rxjs/operators';
import {ProductItemModel} from '../_models/product-item.model';

export interface FileStoreItem {
  name: string;
  src: string;
}

export class FileStore {

  store: FileStoreItem[];

  constructor() {
    this.store = [];
  }

  static toDto(value: ProductItemModel, preview: FileStore, content: FileStore, type): ProductItemModel {
    return {...value, preview: preview.extract(value.title)[0], content: content.extract(type === 'video' ? '' : value.title)};
  }

  private extract(alt?: string): Array<{uri: string, alt: string} | string> | {uri: string, alt: string} | string {
    return alt
      ? this.store.map(obj => ({uri: obj.src, alt}))
      : this.store.map(obj => obj.src)[0];
  }

  addImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // ignoring because there is a result property in filereader
    // @ts-ignore
    fromEvent(reader, 'loadend').pipe(first()).subscribe(r => this.store.push({name: file.name, src: r.target.result}));
  }

  addVideo(url: string) {
    this.store.push({name: url, src: url});
  }

  // don't delete this method, it is being used
  remove(name: string) {
    this.store = this.store.filter(f => f.name !== name);
  }
}
