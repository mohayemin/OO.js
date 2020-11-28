import { meanBy } from "lodash";
import { Cluster } from "./Cluster";
import { ClusterScore } from "./ClusterScore";

export class AverageLORMCohesion implements ClusterScore {
    calculate(clusters: Cluster[]): number {
        return meanBy(clusters, c => this.LORM(c));
    }

    private LORM(cluster: Cluster) {
        const totalRelations = cluster.inClusterEdges();
        const possibleRelations = cluster.components.length * (cluster.components.length - 1) / 2;
        return totalRelations / possibleRelations;
    }
}
