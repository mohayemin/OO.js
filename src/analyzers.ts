import { CallGraph } from "./cg/CallGraph"
import { CallGraphBuilder, mapSimpleNodeId } from "./cg/CallGraphBuilder"
import { AgglomerativeClustering } from "./oodesign/AgglomerativeClustering"
import { AverageCohesionMetric } from "./oodesign/metrics/CohesionMetric"
import { AverageCouplingMetric } from "./oodesign/metrics/CouplingMetric"
import { basename } from 'path'
import { writeFileSync } from 'fs'

export function analyzeCallGraph(callGraph: CallGraph) {
    const clustering = new AgglomerativeClustering(callGraph, [
        new AverageCohesionMetric,
        new AverageCouplingMetric
    ])
    const result = clustering.apply()
    return result
}

export function analyzeFile(filepath: string) {
    console.log("Analyzing " + filepath)
    const graphBuilder = new CallGraphBuilder(filepath, mapSimpleNodeId)
    let callGraph = graphBuilder.buildCg()
    const result = analyzeCallGraph(callGraph)
    const resultString = result.format()

    const filename = basename(filepath, ".js")
    const outfilePath = `./results/${filename}.csv`
    writeFileSync(outfilePath, resultString)

    console.log(resultString)

    console.log()
    return { callGraph, result }
}
