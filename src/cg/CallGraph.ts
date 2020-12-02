import { FunctionNode as FunctionNode } from "./FunctionNode"

export class CallGraph {
    constructor(public readonly nodes: FunctionNode[]) {
    }
}

