import { AverageLORMCohesion } from "./AverageLORMCohesion";
import { Cluster } from "../Cluster";
import { ClusterScore, ClusterScorer } from "./ClusterScorer";
import { LORMCoupling } from "./LORMCoupling";
import { map, mean, meanBy, sumBy } from "lodash";

export class LORMClusterScore implements ClusterScorer {
    score(clusters: Cluster[]) {
        const cohesion = new AverageLORMCohesion().score(clusters);
        const coupling = new LORMCoupling().score(clusters);
        return new ClusterScore(cohesion, coupling);
    }
}

export class NaiveClusterScorer implements ClusterScorer {
    score(clusters: Cluster[]) {
        let cohesion = meanBy(clusters, c => c.inClusterEdges() / c.components.length)
        let coupling = meanBy(clusters, c => c.outClusterEdges());
        return new ClusterScore(cohesion, coupling);
    }
}

