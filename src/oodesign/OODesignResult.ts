import { sortBy } from "lodash";
import { OODesignMetric } from "./metrics/OODesignMetric";
import { OODesignResultItem } from "./OODesignResultItem";

export class OODesignResult {
    topScorer: OODesignResultItem;
    constructor(
        public resultItems: OODesignResultItem[],
        private metrics: OODesignMetric[]
    ) {
        this.process()
    }

    private process() {
        for (const metric of this.metrics) {
            this.processMetric(metric)
        }

        let sortedResultItems = sortBy(this.resultItems, item => -item.score())
        this.topScorer = sortedResultItems[0]
        this.topScorer.rank = 1

        let prevItem = this.topScorer
        for (const item of sortedResultItems) {
            item.rank = prevItem.score() === item.score() ? prevItem.rank : prevItem.rank + 1
            prevItem = item
        }
    }

    private processMetric(metric: OODesignMetric) {
        const rawValues = this.resultItems.map(result => result.getRaw(metric.id))
        const range = metric.possibleValueRange(rawValues)
        for (const result of this.resultItems) 
            result.normalize(metric, range)
    }

    format() {
        return this.resultItems.map(ri => ri.format()).join("\n");
    }

    toJSON() {
        return this.resultItems.map(ri => ri.toJSON())
    }
}
