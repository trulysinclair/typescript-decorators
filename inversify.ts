import "reflect-metadata";
import { Container, inject, injectable } from "inversify";
import { create } from "domain";

// Define a decorator
function MyDecorator(metadata: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("my-decorator", metadata, target, propertyKey);
  };
}

@injectable()
class Service {
  log() { console.log("log"); }
}

export function createDecorator<T>(
  identifier: string | symbol,
) {
  return inject<T>(identifier);
}

const IService = createDecorator<Service>("Service");

@injectable()
class MyClass {
  @IService
  private _service: Service;

  constructor() {

  }

  myMethod() {
    this._service.log();
  }
}

const container = new Container();

container.bind<Service>("Service").to(Service);
container.bind<MyClass>(MyClass).to(MyClass);
// Retrieve the metadata for the decorator
// const metadata = Reflect.getMetadata("my-decorator", MyClass.prototype, "myMethod");
// console.log(metadata); // "some metadata"

// new MyClass().myMethod();

container.get(MyClass).myMethod();