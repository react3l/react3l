import 'reflect-metadata';
import { DecoratorSymbol } from './DecoratorSymbol';

export class BasePrototype {
  public readonly name: string;

  private readonly descriptors: Record<string, PropertyDescriptor> = {};

  constructor(name: string) {
    this.name = name;
  }

  public get propertyDescriptors(): Record<string, PropertyDescriptor> {
    return this.descriptors;
  }

  public static getOrCreate(
    Target: new (...args: any[]) => any,
  ): BasePrototype {
    if (!Reflect.hasMetadata(DecoratorSymbol.PROTOTYPE, Target)) {
      const basePrototype = new BasePrototype(Target.name);
      Reflect.defineMetadata(DecoratorSymbol.PROTOTYPE, basePrototype, Target);
    }
    return Reflect.getMetadata(DecoratorSymbol.PROTOTYPE, Target)!;
  }

  public setPropertyDescriptor = (
    property: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    console.log(`Property set: ::${property.toString()}`);

    if (!Object.prototype.hasOwnProperty.call(this.descriptors, property)) {
      Object.defineProperty(this.descriptors, property, {
        get: () => descriptor,
        enumerable: true,
        configurable: false,
      });
    }
  };
}
