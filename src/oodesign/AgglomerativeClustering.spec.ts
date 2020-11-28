import { CallGraph } from "../cg/CallGraph"
import { FunctionNode } from "../cg/GraphNode"
import { AgglomerativeClustering } from "./AgglomerativeClustering"
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
    D.addCallees(G)
    E.addCallees(F, G)
    F.addCallees(G)
    G.addCallees()

    let nodes = [A, B, C, D, E, F, G]

    let g = new CallGraph([A, B, C, D, E, F, G])

    const clustering = new AgglomerativeClustering(g, n => new OOClass(n.id, [n]), null)

    it('should correctly find the closest pair', () => {
        const results = clustering.apply()
        console.log(results.format())
    })
})
