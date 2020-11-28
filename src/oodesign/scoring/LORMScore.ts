import { AverageLORMCohesion } from "./AverageLORMCohesion";
import { OOClass } from "../OOClass";
import { OODesignScore, OODesignScorer } from "./OODesignScorer";
import { LORMCoupling } from "./LORMCoupling";
import { map, mean, meanBy, sumBy } from "./lodash";

export class LORMDesignScore implements OODesignScorer {
    score(classes: OOClass[]) {
        const cohesion = new AverageLORMCohesion().score(classes);
        const coupling = new LORMCoupling().score(classes);
        return new OODesignScore(cohesion, coupling);
    }
}

export class NaiveDesignScorer implements OODesignScorer {
    score(classes: OOClass[]) {
        let cohesion = meanBy(classes, c => c.internalRelationCount() / c.components.length)
        let coupling = meanBy(classes, c => c.externalRelationCount());
        return new OODesignScore(cohesion, coupling);
    }
}

