import { IndexedPair } from "../util/pairing";
import { ClassClosenessMetric } from "./metrics/ClassClosenessMetric";
import { OOClass } from "./OOClass";


export class ClassPair implements IndexedPair<OOClass> {
    public readonly closeness: number;
    constructor(
        public readonly firstIndex: number,
        public readonly secondIndex: number,
        public readonly first: OOClass,
        public readonly second: OOClass,
        closenessMetric: ClassClosenessMetric
    ) {
        this.closeness = closenessMetric.closeness(first, second);
    }


    toString() {
        return `${this.first.id} ${this.second.id} ${this.closeness}`;
    }
}
