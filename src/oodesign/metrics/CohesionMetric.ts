import { FunctionNode } from "../../cg/FunctionNode";
import { PairSet } from "../../util/pairing";
import { OOClass } from "../OOClass";
import { AverageOfClassMetric, fromValuesValueRangeAlgorithm, zeroToOneValueRangeAlgorithm } from "./AverageOfClassMetric";
import { OOClassMetric } from "./OOClassMetric";

export class AverageCohesionMetric extends AverageOfClassMetric {
    constructor() {
        super("average-cohession",
            1,
            new CohesionOfClassMetric,
            fromValuesValueRangeAlgorithm
        )
    }
}

export class CohesionOfClassMetric implements OOClassMetric {
    // LORM
    value(ooClass: OOClass): number {
        const functions = ooClass.methods.length;
        if (functions == 1)
            return 1;

        const inEdges = new PairSet<FunctionNode>()
        for (const method of ooClass.methods) {
            const inCalls = method.callees.filter(callee => callee.containerClass == ooClass)
            for (const callee of inCalls) {
                inEdges.add({ first: method, second: callee })
            }
        }
        const inClassCalls =  inEdges.size();
        const possibleRelations = functions * (functions - 1) / 2;

        return inClassCalls / possibleRelations;
    }
}
