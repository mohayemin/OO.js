import { OOClassDesign } from "../OOClassDesign";

export interface OODesignMetric {
    value(design: OOClassDesign): number
}

