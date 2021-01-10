/**
 * A service handles logic for app
 */
import type {Bootstrappable} from '@react3l/react3l/types';

export abstract class Service implements Bootstrappable {
  /**
   * Implement a method to initialize the service instance
   *
   * The method can be sync or async
   */
  public initialize?(): void | Promise<void>;
}
