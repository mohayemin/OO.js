import { sumBy } from "lodash";
import { Cluster } from "../Cluster";
import { ClusterScorer } from "./ClusterScorer";
import { LORM } from "./LORM";


export class LORMCoupling implements ClusterScorer {
    score(clusters: Cluster[]): number {
        const totalRelations = sumBy(clusters, c => c.outClusterEdges()) / 2;
        return LORM(totalRelations, clusters.length)
    }
}
