import { Cluster } from "./Cluster";

export abstract class ClusterFactory<TCluster extends Cluster> {
    abstract merge(first: TCluster, second: TCluster): TCluster;
    abstract updateNeighbours(source: TCluster, mergedId: string, firstOldId: string, secondOldId: string): TCluster;
}
