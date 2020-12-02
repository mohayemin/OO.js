import { FunctionNode } from "../src/cg/FunctionNode"
import { CohesionOfClassMetric } from "../src/oodesign/metrics/CohesionMetric"
import { OOClass } from "../src/oodesign/OOClass"

describe("cohession of classes", () => {
    let E = new FunctionNode("E"),
        F = new FunctionNode("F"),
        G = new FunctionNode("G")

    E.addCallees(F, G)
    F.addCallees(G)
    G.addCallees()

    it("should be calculated correctly", () => {
        const abcd = new OOClass("", [
            E, F, G
        ])

        const metric = new CohesionOfClassMetric()
        const val = metric.value(abcd)
        expect(val).toBeCloseTo(.6667)
    })
})

describe("Weighted average cohession of classes", ()=>{

})