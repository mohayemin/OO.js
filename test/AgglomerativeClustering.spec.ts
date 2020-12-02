import { CallGraph } from "../src/cg/CallGraph"
import { FunctionNode } from "../src/cg/GraphNode"
import { AgglomerativeClustering } from "../src/oodesign/AgglomerativeClustering"
import { AverageCouplingMetric as AverageCouplingMetric } from "../src/oodesign/metrics/CouplingMetric"
import { AverageCohesionMetric as AverageCohesionMetric } from "../src/oodesign/metrics/CohesionMetric"

describe("agglomaretive clustering", () => {
    let A = new FunctionNode("A"),
        B = new FunctionNode("B"),
        C = new FunctionNode("C"),
        D = new FunctionNode("D"),
        E = new FunctionNode("E"),
        F = new FunctionNode("F"),
        G = new FunctionNode("G")

    A.addCallees(B, C, D)
    B.addCallees(D)
    C.addCallees(D)
    E.addCallees(F, G)
    F.addCallees(G)
    G.addCallees()


    // it('with D calling G', () => {
    //     D.addCallees(G)
    //     let g = new CallGraph([A, B, C, D, E, F, G])
    //     const clustering = new AgglomerativeClustering(g, n => new OOClass(n.id, [n]), new CohesionCouplingMetric)
    //     const results = clustering.apply()
    //     console.log(results.format())
    //     expect(results.topScorer.design.classes.length).toBe(3)
    // })

    it('without D calling G', () => {
        let g = new CallGraph([A, B, C, D, E, F, G])
        const clustering = new AgglomerativeClustering(g, [
            // new AverageClassSizeMetric, 
            new AverageCouplingMetric,
            new AverageCohesionMetric
        ])
        const results = clustering.apply()
        console.log(results.format())
        expect(results.topScorer.design.classes.length).toBe(2)
    })
})
