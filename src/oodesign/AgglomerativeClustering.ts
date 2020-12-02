import { maxBy } from "lodash"
import { CallGraph } from "../cg/CallGraph"
import { FunctionNode } from "../cg/GraphNode"
import { OODesignMetric } from "./metrics/OODesignMetric"
import { OOClass } from "./OOClass"
import { OOClassDesign as OOClassDesign } from "./OOClassDesign"
import { OODesignResult } from "./OODesignResult"
import { OODesignResultItem } from "./OODesignResultItem"

export class AgglomerativeClustering {
    constructor(private graph: CallGraph
        , private metrics: OODesignMetric[]
    ) {
    }

    apply(): OODesignResult {
        const resultItems: Array<OODesignResultItem> = []
        let design = new OOClassDesign(this.graph.nodes.map(n => new OOClass(n.id, [n])))
        while (design.hasMultipleClasses()) {
            const resultItem = this.findResultForDesign(design)
            resultItems.push(resultItem)
            design = design.merge(resultItem.closestPair.firstIndex, resultItem.closestPair.secondIndex)
        }
        resultItems.push(this.findResultForDesign(design))

        return new OODesignResult(resultItems, this.metrics)
    }

    private findResultForDesign(design: OOClassDesign): OODesignResultItem {
        const closestPair = design.findClosestPair()
        const resultItem = new OODesignResultItem(design, closestPair)
        this.metrics.forEach(metric => resultItem.setRaw(metric.id, metric.value(design)))
        return resultItem
    }
}


