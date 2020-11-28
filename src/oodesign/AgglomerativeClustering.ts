import { maxBy } from "lodash"
import { CallGraph } from "../cg/CallGraph"
import { FunctionNode } from "../cg/GraphNode"
import { OODesignMetric, OOMetricResult } from "./metrics/OODesignMetric"
import { OOClass } from "./OOClass"
import { OOClassDesign as OOClassDesign } from "./OOClassDesign"
import { OOClassPair } from "./OOClassPair"

export class AgglomerativeClustering {
    constructor(private graph: CallGraph
        , private functionToClass: (node: FunctionNode) => OOClass
        , private designMetric: OODesignMetric
    ) {
    }

    apply(): OODesignResult {
        const resultItems: Array<OODesignResultItem> = [];
        let design = new OOClassDesign(this.graph.nodes.map(this.functionToClass))
        while (design.hasMultipleClasses()) {
            const resultItem = this.findResultForGroup(design)
            resultItems.push(resultItem);
            design = design.clone();
            design.merge(resultItem.closestPair.firstIndex, resultItem.closestPair.secondIndex)
        }
        resultItems.push(this.findResultForGroup(design))

        const topScorer = maxBy(resultItems, l => l.score.value)

        return new OODesignResult(resultItems, topScorer)
    }

    private findResultForGroup(design: OOClassDesign): OODesignResultItem {
        const score = this.designMetric.value(design)
        const closestPair = design.findClosestPair()
        return new OODesignResultItem(design, closestPair, score)
    }
}

export class OODesignResult {
    constructor(
        public resultItems: OODesignResultItem[],
        public topScorer: OODesignResultItem
    ) {

    }

    format() {
        return this.resultItems.map(ri => ri.format()).join("\n")
    }
}

export class OODesignResultItem {
    constructor(
        public group: OOClassDesign,
        public closestPair: OOClassPair,
        public score: OOMetricResult
    ) {
    }

    public format() {
        return this.group.classes.map(c => c.id).join(" ") +
            " :: " +
            this.score.value.toFixed(2)
    }
}