import { OOClassDesign } from "../OOClassDesign"
import { AverageCohesionOfClasses } from "./AverageCohesionOfClasses"
import { AverageCouplingBetweenClasses } from "./AverageCouplingBetweenClasses"
import { AverageMethodPerclass } from "./AverageMethodPerclass"
import { OOMetricResult } from "./OOMetricResult"
import { CompositeOODesignMetric } from "./CompositeOODesignMetric"

export class CompositeMetric1 implements CompositeOODesignMetric {
    value(design: OOClassDesign): OOMetricResult {
        const cohesion = new AverageCohesionOfClasses().value(design)
        const coupling = new AverageCouplingBetweenClasses().value(design)
        const methods = new AverageMethodPerclass().value(design)
        return new OOMetricResult(cohesion * methods / coupling, [cohesion, methods, coupling])
    }
}
