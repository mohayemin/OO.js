import { intersection } from "lodash";
import { OOClass } from "../OOClass";
import { AverageOfClassesOODesignMetric } from "./AverageOfClassesOODesignMetric";


export class AverageCohesionOfClasses extends AverageOfClassesOODesignMetric {
    valueForClass(ooClass: OOClass): number {
        const functions = ooClass.methods.length;
        if (functions == 1)
            return 1;

        const actualRelations = intersection(ooClass.allCallees, ooClass.methods).length;
        const possibleRelations = functions * (functions - 1) / 2;

        return actualRelations / possibleRelations;
    }
}

export class AverageInstabilityMetric extends AverageOfClassesOODesignMetric {
    valueForClass(ooClass: OOClass): number {
        return 0;
    }
}