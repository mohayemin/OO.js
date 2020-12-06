import { uniq, without } from "lodash";
import { OOClass } from "../OOClass";
import { AverageOfClassMetric, fromValuesValueRangeAlgorithm } from "./AverageOfClassMetric";
import { OOClassMetric } from "./OOClassMetric";

export class AverageCouplingMetric extends AverageOfClassMetric {
    constructor() {
        super("average-coupling",
            -1,
            new CouplingOfClass,
            fromValuesValueRangeAlgorithm
        );
    }
}

export class CouplingOfClass implements OOClassMetric {
    // Chidamber and Kemerer, 1994
    value(ooClass: OOClass): number {
        let dependeeClasses = uniq(ooClass.allCallees.map(m => m.containerClass))
        dependeeClasses = without(dependeeClasses, ooClass)
        return dependeeClasses.length;
    }
}
