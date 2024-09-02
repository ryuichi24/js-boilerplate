import { ArgumentTypes } from "@ts-template/type-util";

type ClassConstructor = new (...args: any[]) => {};

type MethodNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type DecoratorFunc = (decoratorUtils: {
  className: string;
  method: Function;
  instance: InstanceType<ClassConstructor>;
  methodName: string;
  args: object[];
  pick: (returned: any) => any;
}) => any;

type Func = (...args: any) => any;

type FunctionDecoratorFunc = (decoratorUtils: {
  func: Function;
  args: object[];
  pick: (returnedValue: any) => void;
}) => void;

export class DecoratorFactory {
  /**
   * @param decoratorFunc
   * @param filteringToken a token that determines which method to skip
   * @returns
   * A decorator function that mutates the all methods of the targe class.
   * NOTE: This returned decorator directly mutates the prototype of the targe class, meaning that
   * all of the instances born from the class share the decorated methods' implementation.
   * @example
   * ```
   * class Person {
   *   name: string;
   *   age: number;
   *
   *   constructor(name: string, age: number) {
   *     this.name = name;
   *     this.age = age;
   *   }
   *
   *   greet() {
   *     console.log(`Hello, I am ${this.name}.`);
   *   }
   *
   *   introduce() {
   *     console.log(`My name is ${this.name}. I am ${this.age} years old.`);
   *    }
   * };
   *
   * const classDecorator = DecoratorFactory.buildClassDecorator(({ method, args, pick }) => {
   *   console.log("class decorator init");
   *   pick(method(...args));
   *   console.log("class decorator end");
   * });
   *
   * classDecorator(Person);
   *
   * const p1 = new Person("John", 15);
   *
   * p1.greet(); // class decorator init
   *             // Hello, I am John.
   *             // class decorator end
   *
   * p1.introduce(); // class decorator init
   *                 // My name is John. I am 15 years old.
   *                 // class decorator end
   *
   * ```
   */
  public static buildClassDecorator(
    decoratorFunc: DecoratorFunc,
    filteringToken?: string
  ) {
    return function <TClass extends ClassConstructor>(targetClass: TClass) {
      const targetProto = targetClass.prototype as Record<string, any>;
      for (const propName of Object.getOwnPropertyNames(targetProto)) {
        if (
          typeof targetProto[propName] !== "function" ||
          propName === "constructor" ||
          (filteringToken && propName.includes(filteringToken))
        ) {
          continue;
        }
        const targetMethod = targetProto[propName] as Function;
        // decorate (override) the target method here
        targetProto[propName] = function (...args: object[]) {
          let returnedValue: object | void = void 0;
          decoratorFunc({
            className: targetClass.name,
            method: targetMethod.bind(this) as Function,
            methodName: propName,
            instance: this,
            args: args,
            pick: (returned: object) => {
              returnedValue = returned;
            },
          });
          return returnedValue;
        };
      }

      return targetClass;
    };
  }

  /**
   *
   * @param decoratorFunc
   * @returns
   * A decorator function that mutate a methods of the targe class.
   * NOTE: This returned decorator directly mutates the prototype of the targe class, meaning that
   * all of the instances born from the class share the decorated methods' implementation.
   * @example
   * ```
   * class Person {
   *   name: string;
   *   age: number;
   *
   *   constructor(name: string, age: number) {
   *     this.name = name;
   *     this.age = age;
   *   }
   *
   *   greet() {
   *     console.log(`Hello, I am ${this.name}.`);
   *   }
   *
   *   introduce() {
   *     console.log(`My name is ${this.name}. I am ${this.age} years old.`);
   *    }
   * };
   *
   * const methodDecorator = DecoratorFactory.buildMethodDecorator(({ method, args, pick }) => {
   *   console.log("method decorator init");
   *   pick(method(...args));
   *   console.log("method decorator end");
   * });
   *
   * methodDecorator(Person, "greet");
   *
   * const p1 = new Person("John", 15);
   *
   * p1.greet(); // method decorator init
   *             // Hello, I am John.
   *             // method decorator end
   *
   * p1.introduce(); // My name is John. I am 15 years old.
   *
   * ```
   */
  public static buildMethodDecorator(decoratorFunc: DecoratorFunc) {
    return function <TClass extends ClassConstructor>(
      targetClass: TClass,
      targetMethodName: MethodNames<InstanceType<TClass>>
    ) {
      // NOTE: the prototype of the targetClass is not the instance of the targetClass
      const targetProto = targetClass.prototype as InstanceType<TClass>;
      if (
        typeof targetProto[targetMethodName] !== "function" ||
        targetMethodName === "constructor"
      ) {
        return;
      }

      const targetMethod = targetProto[targetMethodName] as Function;
      // decorate (override) the target method here
      targetProto[targetMethodName] = function (
        this: InstanceType<TClass>,
        ...args: object[]
      ) {
        let returnedValue: object | void = void 0;
        decoratorFunc({
          className: targetClass.name,
          method: targetMethod.bind(this) as Function,
          methodName: targetMethodName as string,
          instance: this,
          args: args,
          pick: (returned: object) => {
            returnedValue = returned;
          },
        });
        return returnedValue;
      } as InstanceType<TClass>[MethodNames<InstanceType<TClass>>];

      return targetClass;
    };
  }

  /**
   *
   * @param decoratorFunc
   * @returns
   * A decorator function that creates a new function based on the passed target function.
   * NOTE: This returned decorator does not mutate the target function itself and creates a new decorated function, meaning that
   * only the returned function has the newly decorated implementation.
   * @example
   * ```
   * function sayHello() {
   *   console.log("hello");
   * }
   *
   * const decoratedSayHello = DecoratorFactory.buildFunctionDecorator(({ func, args, pick }) => {
   *   console.log("func decorator init");
   *   pick(func(...args));
   *   console.log("func decorator init");
   * })(sayHello);
   *
   * decoratedSayHello(); // func decorator init
   *                      // hello
   *                      // func decorator init
   * ```
   */
  public static buildFunctionDecorator(decoratorFunc: FunctionDecoratorFunc) {
    return function <TTargetFunc extends Func>(targetFunc: TTargetFunc) {
      return function (
        ...args: ArgumentTypes<TTargetFunc>
      ): ReturnType<TTargetFunc> | void {
        let picked: ReturnType<TTargetFunc> | void = void 0;
        decoratorFunc({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
          func: targetFunc,
          args: args,
          pick: (item) => {
            picked = item as ReturnType<TTargetFunc>;
          },
        });
        return picked;
      };
    };
  }
}
