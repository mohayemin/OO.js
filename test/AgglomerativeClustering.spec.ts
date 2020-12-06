import { AgglomerativeClustering } from "../src/oodesign/AgglomerativeClustering"
import { AverageCouplingMetric as AverageCouplingMetric } from "../src/oodesign/metrics/CouplingMetric"
import { AverageCohesionMetric as AverageCohesionMetric } from "../src/oodesign/metrics/CohesionMetric"
import { CallGraphBuilder } from "../src/cg/CallGraphBuilder"
import { analyzeFile } from "../src/analyzers"
import { OOClassDesign } from "../src/oodesign/OOClassDesign"
import { OOClass } from "../src/oodesign/OOClass"
import { OODesignResultItem } from "../src/oodesign/OODesignResultItem"

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
    it("xxx", () => {
        const {callGraph, result} = analyzeFile("sample-input/this-project/code.js")
        let design = new OOClassDesign(callGraph.nodes.map(n => new OOClass(n.id, [n])))

        for (let i = 0; i < 8; i++)
            design = design.merge(0, 1)

        for (let i = 0; i < 7; i++)
            design = design.merge(1, 2)

        for (let i = 0; i < 6; i++)
            design = design.merge(2, 3)

        for (let i = 0; i < 10; i++)
            design = design.merge(3, 4)
        
        const expectedResult = new OODesignResultItem(design, null, [
            new AverageCohesionMetric,
            new AverageCouplingMetric
        ])

        console.log(result.topScorer.getRawValues())
        console.log(expectedResult.getRawValues())
    })
})