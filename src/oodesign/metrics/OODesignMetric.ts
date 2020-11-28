import { mean, uniq, without } from "lodash";
import { OOClass } from "../OOClass";
import { OOClassDesign } from "../OOClassDesign";

export interface OODesignMetric {
    value(design: OOClassDesign): OOMetricResult
}

export class ChidamberCouplingBetweenObjects implements OODesignMetric {
    value(design: OOClassDesign): OOMetricResult {
        let avgCbo = mean(design.classes.map(this.cbo))
        return new OOMetricResult(avgCbo);
    }

    cbo(ooClass: OOClass) {
        return uniq(without(ooClass.allCallees, ...ooClass.components)).length;
    }
}

export class OOMetricResult {
    constructor(
        public readonly value: number,
        public readonly parts: number[] = []
    ) {

    }
}