// Animal constructor   
function Animal(name, energy) { 
     
    this.name = name
    this.energy = energy
}

// Member function of Animal
Animal.prototype.eat = function (amount) { 
    console.log(`${this.name} is eating.`)
    this.energy += amount
}

// Another member function of Animal
Animal.prototype.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
}

Animal.prototype.talk = function () {
}

// Cat constructor
function Cat(name, energy) {
    // Equivalent to Java's super call
    Animal.call(this, name, energy) 
}

// Cat inherits Animal
Cat.prototype = Object.create(Animal.prototype) 

// Override talk
Cat.prototype.talk = function () { 
    console.log('meow')
}

new Cat("kitty", 100).talk()
// prints "meow"
