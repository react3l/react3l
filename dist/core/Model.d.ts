import { ErrorMap } from 'core/error-map';
export declare abstract class Model {
    errors?: ErrorMap<this>;
    static clone<T extends Model>(ModelClass: new () => T, t?: Partial<T>): T;
}
