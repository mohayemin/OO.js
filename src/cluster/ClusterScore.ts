import { mean } from "lodash";
import { Cluster } from "./Cluster";

export interface ClusterScore {
    calculate(clusters: Cluster[]): number
}

