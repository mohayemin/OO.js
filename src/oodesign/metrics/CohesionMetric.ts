import { intersection, sumBy } from "lodash";
import { OOClass } from "../OOClass";
import { OOClassDesign } from "../OOClassDesign";
import { AverageOfClassMetric } from "./AverageOfClassMetric";
import { OOClassMetric } from "./OOClassMetric";
import { OODesignMetric } from "./OODesignMetric";

export class AverageCohesionMetric extends AverageOfClassMetric {
    constructor(){
        super("average-cohession", 1, new CohesionOfClassMetric)
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
