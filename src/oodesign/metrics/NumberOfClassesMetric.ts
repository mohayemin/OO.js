import { OOClassDesign } from "../OOClassDesign";
import { OODesignMetric } from "./OODesignMetric";


export class NumberOfClassesMetric implements OODesignMetric {
    value(design: OOClassDesign): number {
        return design.classes.length;
    }
}
