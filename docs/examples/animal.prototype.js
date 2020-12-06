function Animal(name, energy) {
    this.name = name
    this.energy = energy
}

Animal.prototype.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
}

Animal.prototype.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
}

Animal.prototype.talk = function () {
}

function Cat(name, energy) {
    Animal.call(this, name, energy)
}

Cat.prototype = Object.create(Animal.prototype)

Cat.prototype.talk = function () {
    console.log('meow')
}

new Cat("kitty", 100).talk()
// meow