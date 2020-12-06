import { sortBy } from "lodash";
import { CallGraphBuilder } from "../src/cg/CallGraphBuilder";
import { OOClass } from "../src/oodesign/OOClass";
import { OOClassDesign } from "../src/oodesign/OOClassDesign";


export const abcdefg_dCallsG = (function () {
    const cg = new CallGraphBuilder('sample-input/' + 'abcdefg_d-calls-g.js').buildCg()
    const allMethods = sortBy(cg.nodes, f => f.id)
    const class1 = new OOClass("1", allMethods.slice(0, 4))
    const class2 = new OOClass("2", allMethods.slice(4, 6))
    const class3 = new OOClass("3", allMethods.slice(6))
    const bestDesign = new OOClassDesign([class1, class2, class3])
    return { cg, allMethods, bestDesign, class1, class2, class3 }
})();

export const abcdefg_2Class = (function () {
    const cg = new CallGraphBuilder('sample-input/' + 'abcdefg_2-class.js').buildCg()
    const allMethods = sortBy(cg.nodes, f => f.id)
    const class1 = new OOClass("1", allMethods.slice(0, 4))
    const class2 = new OOClass("2", allMethods.slice(4))
    const bestDesign = new OOClassDesign([class1, class2])
    return { cg, allMethods, bestDesign, class1, class2 }
})()