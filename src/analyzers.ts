import { CallGraph } from "./cg/CallGraph"
import { CallGraphBuilder, mapNodeIdWithFileName, mapSimpleNodeId } from "./cg/CallGraphBuilder"
import { AgglomerativeClustering } from "./oodesign/AgglomerativeClustering"
import { AverageCohesionMetric } from "./oodesign/metrics/CohesionMetric"
import { AverageCouplingMetric } from "./oodesign/metrics/CouplingMetric"
import { basename } from 'path'
import { writeFileSync, lstatSync } from 'fs'
import { Parser } from 'json2csv'
import { OODesignResult } from "./oodesign/OODesignResult"

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

    const graphBuilder = new CallGraphBuilder(filepath, getNodeIdMapper(filepath))
    let callGraph = graphBuilder.buildCg()
    const result = analyzeCallGraph(callGraph)
    const filename = basename(filepath, ".js")
    logResults(result, filename)

    console.log()
    return { callGraph, result }
}

function logResults(result: OODesignResult, filename: string) {
    const outfilePath = `./results/${filename}.csv`
    const csvParser = new Parser({
        header: true
    })
    const csv = csvParser.parse(result.toJSON())
    writeFileSync(outfilePath, csv)

    console.log(result.format())

}

function getNodeIdMapper(path: string) {
    if (lstatSync(path).isDirectory()) 
        return mapNodeIdWithFileName

    return mapSimpleNodeId
    
}