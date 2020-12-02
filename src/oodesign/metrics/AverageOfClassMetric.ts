import { meanBy } from "lodash";
import { OOClassDesign } from "../OOClassDesign";
import { OOClassMetric } from "./OOClassMetric";
import { OODesignMetric } from "./OODesignMetric";


export class AverageOfClassMetric implements OODesignMetric {
    constructor(
        public id: string,
        public factor: number,
        private classMetric: OOClassMetric
    ) {
    }

    value(design: OOClassDesign): number {
        return meanBy(design.classes, this.classMetric.value);
    }
}
