import { OOClassDesign } from "../OOClassDesign";

export interface OODesignMetric {
    readonly id: string
    readonly factor: number
    value(design: OOClassDesign): number
}

