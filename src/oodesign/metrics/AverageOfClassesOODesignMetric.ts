import { meanBy } from "lodash";
import { OOClass } from "../OOClass";
import { OOClassDesign } from "../OOClassDesign";
import { OODesignMetric } from "./OODesignMetric";


export abstract class AverageOfClassesOODesignMetric implements OODesignMetric {
    value(design: OOClassDesign): number {
        const avg = meanBy(design.classes, this.valueForClass);
        return avg;
    }

    abstract valueForClass(ooClass: OOClass): number;
}
