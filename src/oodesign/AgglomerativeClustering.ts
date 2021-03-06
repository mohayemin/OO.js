import { maxBy } from "lodash"
import { CallGraph } from "../cg/CallGraph"
import { createPairs } from "../util/pairing"
import { ClassPair } from "./ClassPair"
import { ClassClosenessMetric } from "./metrics/ClassClosenessMetric"
import { OODesignMetric } from "./metrics/OODesignMetric"
import { OOClass } from "./OOClass"
import { OOClassDesign as OOClassDesign } from "./OOClassDesign"
import { OODesignResult } from "./OODesignResult"
import { OODesignResultItem } from "./OODesignResultItem"

export class AgglomerativeClustering {
    constructor(private graph: CallGraph
        , private classClosenessMetric: ClassClosenessMetric
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
        const pairs =  createPairs(design.classes)
            .map(p => new ClassPair(p.firstIndex, p.secondIndex, p.first, p.second, this.classClosenessMetric))

        let closestPair = maxBy(pairs, p => p.closeness)

        return new OODesignResultItem(design, closestPair, this.metrics)
    }


}


