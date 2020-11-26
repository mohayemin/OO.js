import { Graph } from "../cg/Graph";
import { Cluster } from "./Cluster";

export class AgglomerativeClustering {
    public findClosestPair(clusters: Cluster[]): ClosestPairResult {
        let closestPair: ClosestPairResult = {
            first: null,
            second: null,
            closeness: -1
        };
        for (let i = 0; i < clusters.length - 1; i++) {
            const first = clusters[i];
            for (let j = i + 1; j < clusters.length; j++) {
                const second = clusters[j];
                const closeness = first.closeness(second);
                if (closeness > closestPair.closeness) {
                    closestPair = { first, second, closeness };
                }
            }
        }

        return closestPair;
    }
}

export interface ClosestPairResult {
    first: Cluster;
    second: Cluster;
    closeness: number;
}