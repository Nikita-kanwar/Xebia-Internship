// Create a Car class with methods
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  start() {
    console.log(`${this.make} ${this.model} started.`);
  }
  stop() {
    console.log(`${this.make} ${this.model} stopped.`);
  }
}
const carA = new Car("Honda", "Civic");
carA.start();
carA.stop();

// Add method via prototype to existing object
Car.prototype.honk = function() {
  console.log(`${this.make} ${this.model} says: Beep Beep!`);
};
carA.honk();

// Inherit from a base class
class ElectricCar extends Car {
  constructor(make, model, batteryLife) {
    super(make, model);
    this.batteryLife = batteryLife;
  }
  charge() {
    console.log(`${this.make} ${this.model} is charging. Battery: ${this.batteryLife}%`);
  }
}
const eCar = new ElectricCar("Tesla", "Model 3", 85);
eCar.start();
eCar.charge();
