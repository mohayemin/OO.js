import { AverageCouplingMetric, CouplingOfClass } from "../src/oodesign/metrics/CouplingMetric"
import { abcdefg_2Class, abcdefg_dCallsG } from "./TestData"

describe("coupling", () => {
    describe("of class", () => {
        const coupling = new CouplingOfClass().value
        it("should should be zero for disjoint classes", () => {
            const { class1, class2 } = abcdefg_2Class();
            expect(coupling(class1)).toBeCloseTo(0)
            expect(coupling(class2)).toBeCloseTo(0)
        })

        it("should be n if depends on n class", () => {
            const { class1, class2, class3 } = abcdefg_dCallsG()
            expect(coupling(class1)).toBeCloseTo(1)
            expect(coupling(class2)).toBeCloseTo(1)
            expect(coupling(class3)).toBeCloseTo(0)
        })
    })

    describe("of design", () => {
        const coupling = new AverageCouplingMetric().value
        it("should should be zero for disjoint classes", () => {
            const design = abcdefg_2Class().bestDesign
            expect(coupling(design)).toBeCloseTo(0)
        })

        it("should be correct", () => {
            const design = abcdefg_dCallsG().bestDesign
            expect(coupling(design)).toBeCloseTo(1 / 3)
        })
    })

})
