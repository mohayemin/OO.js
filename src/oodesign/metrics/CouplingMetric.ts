import { meanBy, sumBy, uniq, without } from "lodash";
import { OOClass } from "../OOClass";
import { OOClassDesign } from "../OOClassDesign";
import { OOClassMetric } from "./OOClassMetric";
import { OODesignMetric } from "./OODesignMetric";
import { Range } from "./Range";

export class AverageCouplingMetric implements OODesignMetric {
    id: string = "average-coupling";
    factor: -1;
    value(design: OOClassDesign): number {
        const couplingOfClass = new CouplingOfClass().value
        const maxPossibleCoupling = design.classes.length - 1
        return meanBy(design.classes, c => couplingOfClass(c) / maxPossibleCoupling)
    }
    possibleValueRange(values: number[]): Range {
        return new Range(0, 1);
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
