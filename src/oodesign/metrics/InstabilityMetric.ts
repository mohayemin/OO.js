import { OOClassDesign } from "../OOClassDesign";
import { OODesignMetric } from "./OODesignMetric";


export class AverageInstabilityMetric implements OODesignMetric {
    factor = -1;
    id = "average-instability";
    value(design: OOClassDesign): number {
        throw new Error("Method not implemented.");
    }
}
