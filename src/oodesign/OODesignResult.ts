import { OODesignResultItem } from "./OODesignResultItem";


export class OODesignResult {
    constructor(
        public resultItems: OODesignResultItem[],
        public topScorer: OODesignResultItem
    ) {
    }

    format() {
        return this.resultItems.map(ri => ri.format()).join("\n");
    }
}
