import { Dictionary, maxBy, pull, sumBy } from "lodash"
import { OOClass } from "./OOClass"
import { OOClassPair } from "./OOClassPair"
export class OOClassDesign {
    private classPairs: OOClassPair[]

    constructor(
        public readonly classes: OOClass[],
        ) {
        this.recalculatePairs()
    }

    private recalculatePairs() {
        this.classPairs = this.classes.slice(0, this.classes.length - 1).flatMap((_, i) =>
            this.classes.slice(i + 1, this.classes.length).map((_, j) => new PrintableOOClassPair(this.classes, i, i + j + 1))
        )
    }

    hasMultipleClasses() {
        return this.classes.length > 1
    }

    merge(firstIndex: number, secondIndex: number): OOClassDesign {
        const newClasses = this.classes.map(c => c.clone())
        const first = newClasses[firstIndex]
        const second = newClasses[secondIndex]
        first.mergeWith(second)
        pull(newClasses, second)
        return new OOClassDesign(newClasses)
    }

    public findClosestPair(): OOClassPair {
        return maxBy(this.classPairs, p => p.closeness)
    }

    public totalMethods() {
        return sumBy(this.classes, cls => cls.methods.length)
    }
}

class PrintableOOClassPair implements OOClassPair {
    public closeness: number
    public first: OOClass
    public second: OOClass
    constructor(
        classes: OOClass[],
        public firstIndex: number,
        public secondIndex: number
    ) {
        this.first = classes[firstIndex]
        this.second = classes[secondIndex]
        this.closeness = this.first.closeness(this.second)
    }

    toString() {
        return `${this.first.id} ${this.second.id} ${this.closeness}`
    }
}
