import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() { }

  setItem(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  getItem(name: string) {
    return localStorage.getItem(name);
  }

  deleteItem(name: string) {
    localStorage.removeItem(name);
    return true;
  }

  clear() {
    localStorage.clear();
  }
}
