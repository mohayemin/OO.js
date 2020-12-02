import { sumBy, uniq, without } from "lodash";
import { OOClass } from "../OOClass";
import { AverageOfClassMetric } from "./AverageOfClassMetric";
import { OOClassMetric } from "./OOClassMetric";

export class AverageCouplingMetric extends AverageOfClassMetric {
    constructor() {
        super("average-coupling", -1, new CouplingOfClass);
    }
}

export class CouplingOfClass implements OOClassMetric {
    // Chidamber and Kemerer, 1994
    value(ooClass: OOClass): number {
        return uniq(without(ooClass.allCallees, ...ooClass.methods)).length;
    }
}
