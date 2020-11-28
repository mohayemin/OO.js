import { meanBy } from "lodash";
import { OOClass } from "../OOClass";
import { OOClassDesign } from "../OOClassDesign";
import { OOMetricResult } from "./OOMetricResult";
import { OODesignMetric } from "./OODesignMetric";


export abstract class AverageOfClassesOODesignMetric implements OODesignMetric {
    value(design: OOClassDesign): OOMetricResult {
        const avg = meanBy(design.classes, this.valueForClass);
        return new OOMetricResult(avg);
    }

    abstract valueForClass(ooClass: OOClass): number;
}
