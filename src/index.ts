import { CallGraphBuilder } from "./cg/CallGraphBuilder"
import { AgglomerativeClustering } from "./oodesign/AgglomerativeClustering"
import { AverageCohesionMetric } from "./oodesign/metrics/CohesionMetric"
import { AverageCouplingMetric } from "./oodesign/metrics/CouplingMetric"

async function main() {
    const args = process.argv.slice(2)
    const graphBuilder = new CallGraphBuilder(args[0])
    let cg = graphBuilder.buildCg()
    const clustering = new AgglomerativeClustering(cg, [
        new AverageCohesionMetric,
        new AverageCouplingMetric
    ])
    const design = clustering.apply()
    console.log(design.format())
}

main()

