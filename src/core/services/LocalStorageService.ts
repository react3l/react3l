export class LocalStorageService implements Storage {
  [name: string]: any;

  get length(): number {
    return localStorage.length;
  }

  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    return localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}

export const localStorageService: LocalStorageService = new LocalStorageService();
