import { OOClass } from "../OOClass";

export interface OODesignScorer {
    score(classes: OOClass[]): OODesignScore
}
export class OODesignScore {
    public readonly score: number
    constructor(
        public readonly cohesion: number,
        public readonly coupling: number
    ) {
        this.score = cohesion / coupling
    }
}
