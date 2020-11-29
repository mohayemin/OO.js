import { OOClass } from "../OOClass";
import { AverageOfClassesOODesignMetric } from "./AverageOfClassesOODesignMetric";


export class AverageInstabilityMetric extends AverageOfClassesOODesignMetric {
    valueForClass(ooClass: OOClass): number {
        return 0;
    }
}
