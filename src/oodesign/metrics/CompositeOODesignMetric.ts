import { OOClassDesign } from "../OOClassDesign";
import { OODesignMetric } from "./OODesignMetric";
import { OOMetricResult } from "./OOMetricResult";


export interface CompositeOODesignMetric {
    value(design: OOClassDesign): OOMetricResult
}

export class CompositeOODesignMetricWrapper implements CompositeOODesignMetric {
    constructor(private metric: OODesignMetric) { }

    value(design: OOClassDesign): OOMetricResult {
        const value = this.metric.value(design)
        return new OOMetricResult(value)
    }
}