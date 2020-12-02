import { OOClassDesign } from "../OOClassDesign";
import { Range } from "./Range";

export interface OODesignMetric {
    readonly id: string
    readonly factor: number
    value(design: OOClassDesign): number
    possibleValueRange(values: number[]): Range
}

