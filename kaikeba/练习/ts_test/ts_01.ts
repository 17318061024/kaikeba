//any类型练习
let obj: any = { x: 0 };

obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

///可选属性练习
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
//联合类型练习
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
  // console.log(id?.toUpperCase && id?.toUpperCase());
}
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

//type类型练习

type ID = number | string;
type Point = {
  x: number;
  y: number;
};

// interface type 区别

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear: Bear = { name: "lala", honey: true };
bear.name;
bear.honey;

type Animal2 = {
  name: string;
};

type Bear2 = Animal2 & {
  honey: boolean;
};

const bear2: Bear2 = { name: "name", honey: false };
bear2.name;
bear2.honey;

//
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "center");
