//enum 
const oneHundred = BigInt(100);

// Creating a BigInt via the literal syntax
const anotherHundred = 100n;

const firstName: Symbol = Symbol("name");
const secondName = Symbol("name");
if (firstName === secondName) {
    console.log(11)
}

//缩小范围
// function padLeft(padding: number | string, input: string) {
//     if (typeof padding === "number") {
//       return " ".repeat(padding) + input;
//     }
//     return padding + input;
//   }


function padLeft(padding: number | string, input: string) {
    if (typeof padding === "number") {
        return " ".repeat(padding) + input;


    }
    return padding + input;


}

function example(x: string | number, y: string | boolean) {
    if (x === y) {
        // We can now call any 'string' method on 'x' or 'y'.
        x.toUpperCase();

        y.toLowerCase();

    } else {
        console.log(x);

        console.log(y);

    }
}

type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        return animal.swim();
    }

    return animal.fly();
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }
  const result=isFish({fly:()=>{}})
  const resul2t=isFish({swim:()=>{}})
