import { OOClassDesign } from "../OOClassDesign";

export interface OOMetric {
    value(design: OOClassDesign): number;
}