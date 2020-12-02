import { OOClassDesign } from "../OOClassDesign";
import { WeightedAverageCohesionOfClasses } from "./WeightedAverageCohesionOfClasses";
import { AverageCouplingBetweenClasses } from "./AverageCouplingBetweenClasses";
import { OOMetricResult } from "./OOMetricResult";
import { CompositeOODesignMetric } from "./CompositeOODesignMetric";


export class CohesionCouplingMetric implements CompositeOODesignMetric {
    value(design: OOClassDesign): OOMetricResult {
        const cohesion = new WeightedAverageCohesionOfClasses().value(design);
        let coupling = new AverageCouplingBetweenClasses().value(design) + 0.01;
        // a small value added to avoid devide by zero
        
        return new OOMetricResult(cohesion / coupling, [cohesion, coupling]);
    }
}
