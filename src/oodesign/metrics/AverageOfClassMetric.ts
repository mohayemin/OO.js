import { meanBy } from "lodash";
import { OOClassDesign } from "../OOClassDesign";
import { OOClassMetric } from "./OOClassMetric";
import { OODesignMetric } from "./OODesignMetric";
import { Range } from "./Range";


export class AverageOfClassMetric implements OODesignMetric {
    constructor(
        public id: string,
        public factor: number,
        private classMetric: OOClassMetric,
        private valueRangeAlgorithm: valueRangeAlgorithm
    ) {
    }

    possibleValueRange(values: number[]): Range {
        return this.valueRangeAlgorithm(values)
    }

    value(design: OOClassDesign): number {
        return meanBy(design.classes, c => this.classMetric.value(c))
    }
}

export type valueRangeAlgorithm = (values: number[]) => Range

export function fromValuesValueRangeAlgorithm(values: number[]) {
    return Range.fromValues(values)
}

export function zeroToOneValueRangeAlgorithm() {
    return new Range(0, 1)
}
