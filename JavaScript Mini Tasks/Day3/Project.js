//create a method and bind it to another object

 const obj1 = { name: "Nikita" };
const obj2 = { name: "kanwar" };

function sayHello() {
    console.log("Hello " + this.name);
}

const sayHelloToRaj = sayHello.bind(obj1);
sayHelloToRaj(); 

// USe Call to borrow function
const student = {
    name: "Nikita",
    showName() {
        console.log(this.name);
    }
};

const teacher = { name: "Tanvi Sharma" };
student.showName.call(teacher); 

// Arrow function differ with this
const person = {
    name: "Nikita",
    nFun: function () {
        console.log("Normal:", this.name);
    },
    aFun: () => {
        console.log("Arrow:", this.name);
    }
};

person.nFun(); 
person.aFun();  

