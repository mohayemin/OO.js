import { AverageLORMCohesion } from "./AverageLORMCohesion";
import { Cluster } from "../Cluster";
import { ClusterScorer } from "./ClusterScorer";
import { LORMCoupling } from "./LORMCoupling";
import { map, mean, meanBy, sumBy } from "lodash";

export class LORMClusterScore implements ClusterScorer {
    score(clusters: Cluster[]): number {
        const cohesion = new AverageLORMCohesion().score(clusters);
        const coupling = new LORMCoupling().score(clusters);
        return cohesion / coupling;
    }
}

export class NaiveClusterScorer implements ClusterScorer {
    score(clusters: Cluster[]): number {
        let cohesion = meanBy(clusters, c => c.inClusterEdges() / c.components.length)
        let coupling = meanBy(clusters, c => c.outClusterEdges());
        return cohesion / coupling;
    }
}
