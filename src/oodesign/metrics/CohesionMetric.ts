import { intersection, sumBy } from "lodash";
import { OOClass } from "../OOClass";
import { OOClassDesign } from "../OOClassDesign";
import { OOClassMetric } from "./OOClassMetric";
import { OODesignMetric } from "./OODesignMetric";

export class AverageCohesionOfClasses implements OODesignMetric {
    factor = 1;
    id = "weighted-average-cohession-of-classes";
    value(design: OOClassDesign): number {
        const classCohession = new CohesionOfClassMetric().value;
        const wightedSum = sumBy(design.classes, cls => cls.methods.length * classCohession(cls))
        const wightedAvg = wightedSum / design.totalMethods()
        return wightedAvg
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
