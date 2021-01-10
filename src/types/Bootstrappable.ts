export interface Bootstrappable {
  initialize?(): void | Promise<void>;
}
