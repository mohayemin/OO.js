import { Dictionary } from "lodash"
import { EdgeInfo, NodeInfo } from "./cgTypes"
import { FunctionNode as FunctionNode } from "./GraphNode"

export class CallGraph {
    constructor(public readonly nodes: FunctionNode[]) {
    }
}

