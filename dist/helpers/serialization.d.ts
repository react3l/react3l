import { PrimitiveType } from 'core/primitive-type';
import { Moment } from 'moment';
export interface SerializableObject {
    [key: string]: PrimitiveType | Array<PrimitiveType | SerializableObject> | SerializableObject;
}
export declare type SerializedObject<T extends SerializableObject> = {
    [P in keyof T]: T[P] extends Moment ? string : T[P];
};
export declare function serialize<T>(data: T): T;
export declare function deserialize<T>(data: T): T;
