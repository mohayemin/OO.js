import { Cluster } from "./Cluster";

export interface ClusterMergingRule {
    getClusterAfterMerge(current: Cluster, newId: string, firstOldId: string, secondOldId: string): Cluster;
}