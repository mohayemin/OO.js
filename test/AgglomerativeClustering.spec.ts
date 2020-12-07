import { AgglomerativeClustering } from "../src/oodesign/AgglomerativeClustering"
import { AverageCouplingMetric as AverageCouplingMetric } from "../src/oodesign/metrics/CouplingMetric"
import { AverageCohesionMetric as AverageCohesionMetric } from "../src/oodesign/metrics/CohesionMetric"
import { CallGraphBuilder } from "../src/cg/CallGraphBuilder"
import { ClassNeighbourhoodClassClosenessMetric } from "../src/oodesign/metrics/ClassClosenessMetric"
import { zeroToOneValueRangeAlgorithm } from "../src/oodesign/metrics/AverageOfClassMetric"

describe("agglomaretive clustering", () => {

    const metrics = [
        // new AverageClassSizeMetric, 
        new AverageCouplingMetric,
        new AverageCohesionMetric(zeroToOneValueRangeAlgorithm)
    ]

    it('without d calling g', () => {
        testIt("abcdefg_2-class.js", 2)
    })

    it('with d calling g', () => {
        testIt("abcdefg_d-calls-g.js", 3)
    })

    it("json2csv/utils", () => {
        testIt("json2Csv/JSON2CSVTransform.js", 1)
    })

    it("sample 1", () => {
        testIt("json2Csv/JSON2CSVAsyncParser.js", 1)
    })

    function testIt(inputFile: string, expectedClassCount: number) {
        const cg = new CallGraphBuilder("./experiment/input/" + inputFile)
            .buildCg()
        const clustering = new AgglomerativeClustering(cg, new ClassNeighbourhoodClassClosenessMetric(), metrics)
        const results = clustering.apply()
        if (expect(results.topScorer.design.classes.length).toBe(expectedClassCount)) {
            console.log(results.format())
        }
    }
})
