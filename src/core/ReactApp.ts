export abstract class ReactApp {
  /**
   * Bootstrap the app, initialize services, ...
   *
   * Web: render the app to root element
   *
   * Mobile: register the root component
   */
  public bootstrap?(): void | Promise<void>;
}
