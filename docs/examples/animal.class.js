class Animal {
    constructor(name, energy) {
        this.name = name
        this.energy = energy
    }
    eat(amount) {
        console.log(`${this.name} is eating.`)
        this.energy += amount
    }
    play(length) {
        console.log(`${this.name} is playing.`)
        this.energy -= length
    }
    talk() {
    }
}

class Cat extends Animal {
    constructor(name, energy) {
        super(name, energy)
    }
    talk() {
        console.log('meow')
    }
}

new Cat("kitty", 100).talk()
// meow