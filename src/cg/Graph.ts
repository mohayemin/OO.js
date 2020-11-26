import { Dictionary } from "lodash"
import { EdgeInfo, NodeInfo } from "./cgTypes"
import { GraphNode } from "./GraphNode"

export class Graph {
    readonly nodes: GraphNode[]

    private nodeMap: Dictionary<GraphNode>

    constructor() {
        this.nodes = []
        this.nodeMap = {}
    }

    addEdge(edgeInfo: EdgeInfo) {
        const source = this.getOrCreateNode(edgeInfo.source)
        const target = this.getOrCreateNode(edgeInfo.target)

        source.addNeighbour(target)
    }

    private getOrCreateNode(nodeInfo: NodeInfo): GraphNode {
        const id = `${nodeInfo.file}@${nodeInfo.label}@${nodeInfo.start.row}:${nodeInfo.start.column}`

        let node = this.nodeMap[id]
        if (!node) {
            node = new GraphNode(id, nodeInfo)
            this.nodes.push(node)
            this.nodeMap[id] = node
        }

        return node
    }
}

