import { OOClass } from "../OOClass";
import { AverageOfClassesOODesignMetric } from "./AverageOfClassesOODesignMetric";


export class AverageMethodPerclass extends AverageOfClassesOODesignMetric {
    // Chidamber and Kemerer, 1994
    valueForClass(ooClass: OOClass): number {
        return ooClass.methods.length;
    }
}
