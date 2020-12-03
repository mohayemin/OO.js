import { CallGraph } from "./cg/CallGraph"
import { CallGraphBuilder, mapSimpleNodeId } from "./cg/CallGraphBuilder"
import { AgglomerativeClustering } from "./oodesign/AgglomerativeClustering"
import { AverageCohesionMetric } from "./oodesign/metrics/CohesionMetric"
import { AverageCouplingMetric } from "./oodesign/metrics/CouplingMetric"

export function analyzeCallGraph(callGraph: CallGraph){
    const clustering = new AgglomerativeClustering(callGraph, [
        new AverageCohesionMetric,
        new AverageCouplingMetric
    ])
    const result = clustering.apply()
    const top = result.topScorer

    for (const res of result.resultItems) {
        console.log(res.format())
    }
    
    // console.log("-------------------")
    // for (const item of result.resultItems) {
    //     if(item.closestPair)
    //         console.log(item.closestPair.closeness.toFixed(2), item.closestPair.first.id, item.closestPair.second.id)
    // }

    // const sorted = sortBy(result.resultItems, item=>item.rank)



    // console.log(cg.nodes.length)

    // top.design.classes.forEach((aClass, i) => {
    //     console.log("============== " + i + " ==============")
    //     aClass.methods.forEach(m => {
    //         console.log(m.id)
    //     });

    //     console.log()
    //     console.log()
    // });
}

export function analyzeFile(filepath: string) {
    console.log("Analyzing " + filepath)
    const graphBuilder = new CallGraphBuilder(filepath, mapSimpleNodeId)
    let callGraph = graphBuilder.buildCg()
    analyzeCallGraph(callGraph)
    console.log()
}
