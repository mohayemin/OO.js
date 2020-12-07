import { CallGraph } from "./cg/CallGraph"
import { CallGraphBuilder, mapNodeIdWithFileName, mapSimpleNodeId } from "./cg/CallGraphBuilder"
import { AgglomerativeClustering } from "./oodesign/AgglomerativeClustering"
import { AverageCohesionMetric } from "./oodesign/metrics/CohesionMetric"
import { AverageCouplingMetric } from "./oodesign/metrics/CouplingMetric"
import { basename } from 'path'
import { writeFileSync, lstatSync } from 'fs'
import { Parser } from 'json2csv'
import { OODesignResult } from "./oodesign/OODesignResult"
import { ClassNeighbourhoodClassClosenessMetric } from "./oodesign/metrics/ClassClosenessMetric"
import { AnalysisConfig } from "./AnalysisConfig"

export class Analyzer {
    constructor(private config: AnalysisConfig) {
    }

    analyze() {
        for (const filepath of this.config.filepaths) {
            this.analyzeFile(filepath)
        }
    }

    analyzeCallGraph(callGraph: CallGraph) {
        const clustering = new AgglomerativeClustering(callGraph,
            this.config.classClosenessMetric,
            [
                new AverageCohesionMetric(this.config.cohesionRangeAlgorithm),
                new AverageCouplingMetric
            ])
        const result = clustering.apply()
        return result
    }

    analyzeFile(filepath: string) {
        console.log("Analyzing " + filepath)
    
        const graphBuilder = new CallGraphBuilder(filepath, getNodeIdMapper(filepath))
        let callGraph = graphBuilder.buildCg()
        const result = this.analyzeCallGraph(callGraph)
        this.logResults(result, filepath)
    
        console.log()
        return { callGraph, result }
    }

    logResults(result: OODesignResult, inputFilePath: string) {
        const inFileName = basename(inputFilePath, ".js")
        const outfilePath = `${this.config.outputDirectory}/${inFileName}_${this.config.info.closenessMetric}_${this.config.info.cohesionRangeAlgorithm}.csv`
        const csvParser = new Parser({
            header: true
        })
        const csv = csvParser.parse(result.toJSON())
        writeFileSync(outfilePath, csv)
    
        console.log(result.format())
    
    }
}

function getNodeIdMapper(path: string) {
    if (lstatSync(path).isDirectory())
        return mapNodeIdWithFileName

    return mapSimpleNodeId

}