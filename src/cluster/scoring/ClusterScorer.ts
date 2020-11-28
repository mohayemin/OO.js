import { Cluster } from "../Cluster";

export interface ClusterScorer {
    score(clusters: Cluster[]): ClusterScore
}
export class ClusterScore {
    public readonly score: number
    constructor(
        public readonly cohesion: number,
        public readonly coupling: number
    ) {
        this.score = cohesion / coupling
    }
}
