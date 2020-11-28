import { OOClassDesign } from "../OOClassDesign"
import { AverageCohesionOfClasses } from "./AverageCohesionOfClasses"
import { AverageCouplingBetweenClasses } from "./AverageCouplingBetweenClasses"
import { AverageMethodPerclass } from "./AverageMethodPerclass"
import { OOMetricResult } from "./OOMetricResult"
import { OODesignMetric } from "./OODesignMetric"


export class CompositeMetric1 implements OODesignMetric {
    value(design: OOClassDesign): OOMetricResult {
        const cohesion = new AverageCohesionOfClasses().value(design).value
        const coupling = new AverageCouplingBetweenClasses().value(design).value
        const methods = new AverageMethodPerclass().value(design).value
        return new OOMetricResult(cohesion * methods / coupling, [cohesion, methods, coupling])
    }
}

export class CohesionOverCouplingMetric implements OODesignMetric {
    value(design: OOClassDesign): OOMetricResult {
        const cohesion = new AverageCohesionOfClasses().value(design).value
        const coupling = new AverageCouplingBetweenClasses().value(design).value
        return new OOMetricResult(cohesion / coupling, [cohesion, coupling])
    }

}