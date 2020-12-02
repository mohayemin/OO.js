import { sumBy } from "lodash";
import { OOClassDesign } from "../OOClassDesign";
import { CohesionOfClassMetric } from "./CohesionOfClassMetric";
import { OODesignMetric } from "./OODesignMetric";

export class WeightedAverageCohesionOfClasses implements OODesignMetric {
    value(design: OOClassDesign): number {
        const classCohession = new CohesionOfClassMetric().value;
        const wightedSum = sumBy(design.classes, cls => cls.methods.length * classCohession(cls))
        const wightedAvg = wightedSum / design.totalMethods()
        return wightedAvg
    }
}

