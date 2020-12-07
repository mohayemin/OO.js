import { FunctionNode } from "../src/cg/FunctionNode"
import { AverageCohesionMetric, CohesionOfClassMetric } from "../src/oodesign/metrics/CohesionMetric"
import { OOClass } from "../src/oodesign/OOClass"
import { OOClassDesign } from "../src/oodesign/OOClassDesign"
import { abcdefg_2Class, abcdefg_dCallsG } from "./TestData"

describe("cohession", () => {
    describe("of class", () => {
        const cohesion = new CohesionOfClassMetric().value
        it("1", () => {
            const { class1, class2 } = abcdefg_2Class();
            expect(cohesion(class1)).toBeCloseTo(5 / 6)
            expect(cohesion(class2)).toBeCloseTo(1)
        })

        it("2", () => {
            const { class1, class2, class3 } = abcdefg_dCallsG()
            expect(cohesion(class1)).toBeCloseTo(5 / 6)
            expect(cohesion(class2)).toBeCloseTo(1)
            expect(cohesion(class3)).toBeCloseTo(1)
        })

        it("3", () => {
            const a = new FunctionNode("a", null)
            const b = new FunctionNode("b", null)
            a.addCallees(b)
            b.addCallees(a)
            const cls = new OOClass("1", [a, b])
            expect(cohesion(cls)).toBe(1)
        })
    })

    describe("of design", () => {
        function cohesion(design: OOClassDesign) {
            return new AverageCohesionMetric().value(design)
        }
        it("1", () => {
            // (5/6 + 1)/2
            expect(cohesion(abcdefg_2Class().bestDesign)).toBeCloseTo((5 / 6 + 1) / 2)
        })

        it("2", () => {
            expect(cohesion(abcdefg_dCallsG().bestDesign)).toBeCloseTo((5 / 6 + 1 + 1) / 3)
        })
    })
})
