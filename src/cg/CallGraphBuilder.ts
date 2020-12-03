import { CallGraph } from "./CallGraph"
import { EdgeInfo, NodeInfo } from "./cgTypes"
import { FunctionNode } from "./FunctionNode"
import { Dictionary } from "lodash"
import * as JCG from "@persper/js-callgraph"

export class CallGraphBuilder {
    private nodeMap: Dictionary<FunctionNode> = {}
    constructor(public readonly filepath: string,
        private mapNodeId: mapNodeId = mapSimpleNodeId) {

    }

    buildCg(): CallGraph {
        JCG.setArgs({
            "cg": true,
            "output": null
        })
        JCG.setFiles([this.filepath])
        const edgeInfos: EdgeInfo[] = JCG.build()

        for (const edgeInfo of edgeInfos) {
            if (edgeInfo.source.file === "Native" || edgeInfo.target.file === "Native")
                break

            const source = this.getOrCreateNode(edgeInfo.source)
            const target = this.getOrCreateNode(edgeInfo.target)
            source.addCallees(target)
        }

        return new CallGraph(Object.values(this.nodeMap))
    }

    private getOrCreateNode(nodeInfo: NodeInfo): FunctionNode {
        const id = this.mapNodeId(nodeInfo)

        let node = this.nodeMap[id]
        if (!node) {
            node = new FunctionNode(id, nodeInfo)
            this.nodeMap[id] = node
        }

        return node
    }
}

export type mapNodeId = (node: NodeInfo) => string

export function mapSimpleNodeId(node: NodeInfo) {
    return node.label
}

export function mapNodeIdWithFileName(node: NodeInfo) {
    return node.file.split("\\").pop() + "." + node.label
}

export function mapSimpleNodeIdWithLineNumber(node: NodeInfo) {
    return node.label + "@" + node.start.row
}
