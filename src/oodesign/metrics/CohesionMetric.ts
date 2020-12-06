import { countBy, filter, intersection, sumBy } from "lodash";
import { OOClass } from "../OOClass";
import { AverageOfClassMetric, zeroToOneValueRangeAlgorithm } from "./AverageOfClassMetric";
import { OOClassMetric } from "./OOClassMetric";
import { Range } from "./Range";

export class AverageCohesionMetric extends AverageOfClassMetric {
    constructor() {
        super("average-cohession",
            1,
            new CohesionOfClassMetric,
            zeroToOneValueRangeAlgorithm
        )
    }
}

export class CohesionOfClassMetric implements OOClassMetric {
    // LORM
    value(ooClass: OOClass): number {
        const functions = ooClass.methods.length;
        if (functions == 1)
            return 1;


        const inClassCalls = filter(ooClass.allCallees, calee => calee.containerClass == ooClass).length
        const possibleRelations = functions * (functions - 1) / 2;

        return inClassCalls / possibleRelations;
    }
}
