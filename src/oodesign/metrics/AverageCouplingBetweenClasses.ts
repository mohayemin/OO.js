import { uniq, without } from "lodash";
import { OOClass } from "../OOClass";
import { AverageOfClassesOODesignMetric } from "./AverageOfClassesOODesignMetric";


export class AverageCouplingBetweenClasses extends AverageOfClassesOODesignMetric {
    // Chidamber and Kemerer, 1994
    valueForClass(ooClass: OOClass) {
        return 1 + uniq(without(ooClass.allCallees, ...ooClass.methods)).length;
        // one added to avoid zero value that causes devide by zero
    }
}
