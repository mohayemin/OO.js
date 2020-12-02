import { OOClass } from "../OOClass";
import { AverageOfClassMetric } from "./AverageOfClassMetric";
import { OOClassMetric } from "./OOClassMetric";

// Chidamber and Kemerer, 1994
export class AverageClassSize extends AverageOfClassMetric {
    constructor() {
        super("average-methods-per-class", -1, new ClassSizeMetric);
    }
}

export class ClassSizeMetric implements OOClassMetric {
    value(ooClass: OOClass): number {
        return ooClass.methods.length
    }
}

