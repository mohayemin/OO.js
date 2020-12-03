import { CallGraph } from "./cg/CallGraph"
import { CallGraphBuilder, mapSimpleNodeId } from "./cg/CallGraphBuilder"
import { AgglomerativeClustering } from "./oodesign/AgglomerativeClustering"
import { AverageCohesionMetric } from "./oodesign/metrics/CohesionMetric"
import { AverageCouplingMetric } from "./oodesign/metrics/CouplingMetric"

export function analyzeCallGraph(callGraph: CallGraph) {
    const clustering = new AgglomerativeClustering(callGraph, [
        new AverageCohesionMetric,
        new AverageCouplingMetric
    ])
    const result = clustering.apply()
    const top = result.topScorer

    console.log(result.format())

    // // for (const res of result.resultItems) {
    // //     console.log(res.shortFormat())
    // // }

    // console.log("-------------------")
    // for (const closestPair of result.resultItems.map(res => res.closestPair)) {
    //     if (closestPair)
    //         console.log(closestPair.closeness.toFixed(2), closestPair.first.id, closestPair.second.id)
    // }

    return result
}

export function analyzeFile(filepath: string) {
    console.log("Analyzing " + filepath)
    const graphBuilder = new CallGraphBuilder(filepath, mapSimpleNodeId)
    let callGraph = graphBuilder.buildCg()
    const result = analyzeCallGraph(callGraph)
    console.log()
    return { callGraph, result }
}
