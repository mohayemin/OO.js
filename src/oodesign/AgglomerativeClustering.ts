import { maxBy } from "./lodash"
import { CallGraph } from "../cg/CallGraph"
import { FunctionNode } from "../cg/GraphNode"
import { OOClass } from "./OOClass"
import { OOClassDesign as OOClassDesign } from "./OOClassDesign"
import { OOClassPair } from "./OOClassPair"
import { OODesignScore, OODesignScorer } from "./scoring/OODesignScorer"

export class AgglomerativeClustering {
    constructor(private graph: CallGraph
        , private functionToClass: (node: FunctionNode) => OOClass
        , private scorer: OODesignScorer
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

        const topScorer = maxBy(resultItems, l => l.score.score)

        return new OODesignResult(resultItems, topScorer)
    }

    private findResultForGroup(group: OOClassDesign): OODesignResultItem {
        const score = this.scorer.score(group.classes)
        const closestPair = group.findClosestPair()
        return new OODesignResultItem(group, closestPair, score)
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
        public score: OODesignScore
    ) {
    }

    public format() {
        return this.group.classes.map(c => c.id).join(" ") +
            " :: " +
            `${this.score.score.toFixed(2)} (${this.score.cohesion.toFixed(2)}/${this.score.coupling.toFixed(2)})`
    }
}