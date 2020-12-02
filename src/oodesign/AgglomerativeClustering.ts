import { maxBy } from "lodash"
import { CallGraph } from "../cg/CallGraph"
import { FunctionNode } from "../cg/GraphNode"
import { CompositeOODesignMetric } from "./metrics/CompositeOODesignMetric"
import { OOClass } from "./OOClass"
import { OOClassDesign as OOClassDesign } from "./OOClassDesign"
import { OODesignResult } from "./OODesignResult"
import { OODesignResultItem } from "./OODesignResultItem"

export class AgglomerativeClustering {
    constructor(private graph: CallGraph
        , private functionToClass: (node: FunctionNode) => OOClass
        , private designMetric: CompositeOODesignMetric
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


