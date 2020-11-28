import { meanBy } from "lodash";
import { Cluster } from "../Cluster";
import { ClusterScorer } from "./ClusterScorer";
import { LORM } from "./LORM";

export class AverageLORMCohesion implements ClusterScorer {
    score(clusters: Cluster[]): number {
        return meanBy(clusters, c => LORM(c.inClusterEdges(), c.components.length));
    }
}

