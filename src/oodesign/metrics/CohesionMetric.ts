import { intersection, sumBy } from "lodash";
import { OOClass } from "../OOClass";
import { OOClassDesign } from "../OOClassDesign";
import { AverageOfClassMetric, zeroToOneValueRangeAlgorithm } from "./AverageOfClassMetric";
import { OOClassMetric } from "./OOClassMetric";
import { OODesignMetric } from "./OODesignMetric";
import { Range } from "./Range";

export class AverageCohesionMetric extends AverageOfClassMetric {
    constructor() {
        super("average-cohession",
            1,
            new CohesionOfClassMetric,
            zeroToOneValueRangeAlgorithm
        )
    }

    possibleValueRange() {
        return new Range(0, 1)
    }
}

export class CohesionOfClassMetric implements OOClassMetric {
    value(ooClass: OOClass): number {
        const functions = ooClass.methods.length;
        if (functions == 1)
            return 1;

        const inClassCalls = intersection(ooClass.allCallees, ooClass.methods).length;
        const possibleRelations = functions * (functions - 1) / 2;

        return inClassCalls / possibleRelations;
    }
}
