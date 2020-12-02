import { CallGraph } from "../cg/CallGraph"
import { FunctionNode } from "../cg/GraphNode"
import { AgglomerativeClustering } from "./AgglomerativeClustering"
import { CohesionCouplingMetric as CohesionCouplingMetric } from "./metrics/CohesionCouplingMetric"
import { OOClass } from "./OOClass"

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


    it('with D calling G', () => {
        D.addCallees(G)
        let g = new CallGraph([A, B, C, D, E, F, G])
        const clustering = new AgglomerativeClustering(g, n => new OOClass(n.id, [n]), new CohesionCouplingMetric)
        const results = clustering.apply()
        expect(results.topScorer.design.classes.length).toBe(3)
    })

    it('without D calling G', () => {
        let g = new CallGraph([A, B, C, D, E, F, G])
        const clustering = new AgglomerativeClustering(g, n => new OOClass(n.id, [n]), new CohesionCouplingMetric)
        const results = clustering.apply()
        console.log(results.format())
        expect(results.topScorer.design.classes.length).toBe(2)
    })
})
