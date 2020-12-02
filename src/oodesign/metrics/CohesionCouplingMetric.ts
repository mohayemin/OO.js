import { OOClassDesign } from "../OOClassDesign";
import { AverageCohesionOfClasses } from "./AverageCohesionOfClasses";
import { AverageCouplingBetweenClasses } from "./AverageCouplingBetweenClasses";
import { OOMetricResult } from "./OOMetricResult";
import { CompositeOODesignMetric } from "./CompositeOODesignMetric";


export class CohesionCouplingMetric implements CompositeOODesignMetric {
    value(design: OOClassDesign): OOMetricResult {
        const cohesion = new AverageCohesionOfClasses().value(design);
        const coupling = new AverageCouplingBetweenClasses().value(design);
        return new OOMetricResult(cohesion / coupling, [cohesion, coupling]);
    }
}
