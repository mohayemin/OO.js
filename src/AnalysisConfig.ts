import { ClassClosenessMetric, ClassNeighbourhoodClassClosenessMetric, MethodNeighbourhoodClassClosenessMetric } from "./oodesign/metrics/ClassClosenessMetric";
import { fromValuesValueRangeAlgorithm, valueRangeAlgorithm, zeroToOneValueRangeAlgorithm } from "./oodesign/metrics/AverageOfClassMetric";


export class AnalysisConfig {
    public readonly classClosenessMetric: ClassClosenessMetric;
    public readonly cohesionRangeAlgorithm: valueRangeAlgorithm;
    public readonly filepaths: string[]
    constructor(public info: AnalysisConfigInfo) {
        info.closenessMetric = info.closenessMetric || "class"
        info.cohesionRangeAlgorithm = info.cohesionRangeAlgorithm || "zeroToOne"
        this.classClosenessMetric = info.closenessMetric === "method" ?
            new MethodNeighbourhoodClassClosenessMetric :
            new ClassNeighbourhoodClassClosenessMetric;

        this.cohesionRangeAlgorithm = info.cohesionRangeAlgorithm === "fromValues" ?
            fromValuesValueRangeAlgorithm :
            zeroToOneValueRangeAlgorithm;

        this.filepaths = info.files;
    }
}

export interface AnalysisConfigInfo {
    files: string[]
    cohesionRangeAlgorithm?: "fromValues" | "zeroToOne"
    closenessMetric?: "class" | "method"
}