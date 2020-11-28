import { mean } from "lodash";
import { OOClassDesign } from "../OOClassDesign";
import { OOMetricResult } from "./OOMetricResult";

export interface OODesignMetric {
    value(design: OOClassDesign): OOMetricResult
}

