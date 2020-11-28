import { Dictionary } from "lodash"
import { EdgeInfo, NodeInfo } from "./cgTypes"
import { GraphNode } from "./GraphNode"

export class Graph {
    constructor(public readonly nodes: GraphNode[]) {
    }
}

