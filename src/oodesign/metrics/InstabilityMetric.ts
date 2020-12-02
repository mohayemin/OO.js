import { OOClassDesign } from "../OOClassDesign";
import { OODesignMetric } from "./OODesignMetric";
import { Range } from "./Range";


export class AverageInstabilityMetric implements OODesignMetric {
    possibleValueRange(values: number[]): Range {
        throw new Error("Method not implemented.");
    }
    

    factor = -1;
    id = "average-instability";
    value(design: OOClassDesign): number {
        throw new Error("Method not implemented.");
    }
}
