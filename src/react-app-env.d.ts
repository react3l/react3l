/// <reference types="react-scripts" />

declare module 'ts-nameof.macro' {
  declare function nameof(identifier: any): string;

  export default nameof;
}
