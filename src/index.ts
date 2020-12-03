import { CallGraphBuilder, mapNodeIdWithFileName } from "./cg/CallGraphBuilder"
import { AgglomerativeClustering } from "./oodesign/AgglomerativeClustering"
import { AverageCohesionMetric } from "./oodesign/metrics/CohesionMetric"
import { AverageCouplingMetric } from "./oodesign/metrics/CouplingMetric"

export function main(args: string[]) {
    const graphBuilder = new CallGraphBuilder(args[0], mapNodeIdWithFileName)
    let cg = graphBuilder.buildCg()
    const clustering = new AgglomerativeClustering(cg, [
        new AverageCohesionMetric,
        new AverageCouplingMetric
    ])
    const result = clustering.apply()
    const top = result.topScorer


    //console.log(result.format())

    for (const item of result.resultItems) {
        if(item.closestPair)
            console.log(item.closestPair.closeness.toFixed(2), item.closestPair.first.id, item.closestPair.second.id)
    }

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

main(process.argv.slice(2))
