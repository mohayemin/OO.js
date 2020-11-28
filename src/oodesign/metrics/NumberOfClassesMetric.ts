import { OOClassDesign } from "../OOClassDesign";
import { OODesignMetric } from "./OODesignMetric";
import { OOMetricResult } from "./OOMetricResult";


export class NumberOfClassesMetric implements OODesignMetric {
    value(design: OOClassDesign): OOMetricResult {
        return new OOMetricResult(design.classes.length);
    }
}
