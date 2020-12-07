import { pull, sumBy } from "lodash"
import { OOClass } from "./OOClass"
export class OOClassDesign {
    constructor(
        public readonly classes: OOClass[],
        ) {
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

    public totalMethods() {
        return sumBy(this.classes, cls => cls.methods.length)
    }
}
