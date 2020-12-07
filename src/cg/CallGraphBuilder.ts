import { CallGraph } from "./CallGraph"
import { EdgeInfo, NodeInfo } from "./cgTypes"
import { FunctionNode } from "./FunctionNode"
import { Dictionary, sortBy } from "lodash"
import * as JCG from "@persper/js-callgraph"
import { basename } from 'path'

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
            if(edgeInfo.source.label === 'anon' || edgeInfo.target.label === 'anon')
                continue

            const source = this.getOrCreateNode(edgeInfo.source)
            if (edgeInfo.target.file === "Native")
                continue

            const target = this.getOrCreateNode(edgeInfo.target)
            source.addCallees(target)
        }

        const nodes = sortBy(Object.values(this.nodeMap), n => n.id)
        return new CallGraph(nodes)
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
    let label = node.label
    if(label === 'constructor')
        label += '_'
    return label
}

export function mapNodeIdWithFileName(node: NodeInfo) {
    return basename(node.file, '.js') + '.' + node.label
}

export function mapSimpleNodeIdWithLineNumber(node: NodeInfo) {
    return node.label + "@" + node.start.row
}
