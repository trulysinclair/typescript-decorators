import "reflect-metadata";
import { Container, inject, injectable } from "inversify";

const container = new Container();

export function createDecorator<T>(
  identifier: string | symbol,
) {
  return inject<T>(identifier);
}

function registerService<T extends unknown>(service: new(...args: never[]) => T,
  kind: "singleton" | "transient" | "request")
{
  switch (kind) {
    case "singleton":
      container.bind<T>(service.name).to(service).inSingletonScope();
      break;
    case "request":
      container.bind<T>(service.name).to(service).inRequestScope();
      break;
    case "transient":
      container.bind<T>(service.name).to(service);
      break;
  }
}

const IService = createDecorator<IService>("Service");

interface IService {}

@injectable()
class Service {
  log() {
    console.log("log");
  }
}

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

@injectable()
class MyClass2 {
  @IService
  private _service: Service;

  constructor() {
  }

  myMethod() {
    this._service.log();
  }
}

registerService(Service, "singleton");

// container.bind<Service>("Service").to(Service);
container.bind<MyClass2>(MyClass2).to(MyClass2);
container.bind<MyClass>(MyClass).to(MyClass);
container.get(MyClass2).myMethod();
container.get(MyClass).myMethod();

container.unbind(MyClass);
