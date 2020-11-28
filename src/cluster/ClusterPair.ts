import { Cluster } from "./Cluster"

export interface ClusterPair {
    first: Cluster
    second: Cluster
    firstIndex: number
    secondIndex: number
    closeness: number
}
