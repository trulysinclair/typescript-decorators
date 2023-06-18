import { Container, inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
class Service {
  log() {
    console.log("log");
  }
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
container.get(MyClass).myMethod();
