import { FunctionNode } from "../src/cg/FunctionNode"
import { AgglomerativeClustering } from "../src/oodesign/AgglomerativeClustering"
import { AverageCouplingMetric as AverageCouplingMetric } from "../src/oodesign/metrics/CouplingMetric"
import { AverageCohesionMetric as AverageCohesionMetric } from "../src/oodesign/metrics/CohesionMetric"
import { CallGraphBuilder } from "../src/cg/CallGraphBuilder"
import { main } from "../src"

describe("agglomaretive clustering", () => {

    const metrics = [
        // new AverageClassSizeMetric, 
        new AverageCouplingMetric,
        new AverageCohesionMetric
    ]

    it('without d calling g', () => {
        testIt("abcdefg_2-class.js", 2)
    })

    it('with d calling g', () => {
        testIt("abcdefg_d-calls-g.js", 3)
    })

    it("sample 1", () => {
        testIt("sample1.js", 1)
    })

    function testIt(inputFile: string, expectedClassCount: number) {
        const cg = new CallGraphBuilder("sample-input/" + inputFile).buildCg()
        const clustering = new AgglomerativeClustering(cg, metrics)
        const results = clustering.apply()
        if (expect(results.topScorer.design.classes.length).toBe(expectedClassCount)) {
            console.log(results.format())
        }
    }
})


describe("", () => {
    it("xxx", ()=> {
        main(["sample-input/this-project/code.js"])
    })
})