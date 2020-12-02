import { OOMetricResult } from "./metrics/OOMetricResult";
import { OOClassDesign as OOClassDesign } from "./OOClassDesign";
import { OOClassPair } from "./OOClassPair";


export class OODesignResultItem {
    constructor(
        public design: OOClassDesign,
        public closestPair: OOClassPair,
        public score: OOMetricResult
    ) {
    }

    public format() {
        return this.design.classes.map(c => c.id).join(" ") +
            " :: " +
            this.score.format();
    }
}
