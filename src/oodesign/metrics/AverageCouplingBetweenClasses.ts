import { sumBy, uniq, without } from "lodash";
import { OOClass } from "../OOClass";
import { OOClassDesign } from "../OOClassDesign";
import { OOClassMetric } from "./OOClassMetric";
import { OODesignMetric } from "./OODesignMetric";

export class AverageCouplingBetweenClasses implements OODesignMetric {
    value(design: OOClassDesign): number {
        const classCoupling = new CouplingOfClass().value;
        const wightedSum = sumBy(design.classes, cls => cls.methods.length * classCoupling(cls))
        const wightedAvg = wightedSum / design.totalMethods()
        return wightedAvg
    }
}

export class CouplingOfClass implements OOClassMetric {
    // Chidamber and Kemerer, 1994
    value(ooClass: OOClass): number {
        return uniq(without(ooClass.allCallees, ...ooClass.methods)).length;
    }
}
