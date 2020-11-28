import { Cluster } from "../Cluster";

export interface ClusterScorer {
    score(clusters: Cluster[]): number
}
