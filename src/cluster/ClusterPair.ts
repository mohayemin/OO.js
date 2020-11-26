import { Cluster } from "./Cluster"

export interface ClusterPair {
    first: Cluster
    second: Cluster
    closeness: number
}
