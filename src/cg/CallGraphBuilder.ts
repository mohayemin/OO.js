import { CallGraph } from "./CallGraph"
import { fileSync as tempFile } from 'tmp'
import { readFileSync } from 'fs'
import { execSync } from 'child_process'
import { EdgeInfo, NodeInfo } from "./cgTypes"
import { FunctionNode } from "./FunctionNode"
import { Dictionary } from "lodash"

export class CallGraphBuilder {
    private nodeMap: Dictionary<FunctionNode> = {}
    constructor(public readonly filepath: string, 
        private mapNodeId: mapNodeId = mapSimpleNodeId) {
    }

    buildCg(): CallGraph {
        const outFile = tempFile({ postfix: '.json' })
        execSync(`npx js-callgraph --cg ${this.filepath} --output=${outFile.name}`, { encoding: 'utf-8' })
        const jsonString = readFileSync(outFile.name, { encoding: 'utf-8' })
        const edgeInfos: EdgeInfo[] = JSON.parse(jsonString)

        edgeInfos.forEach(edgeInfo => {
            const source = this.getOrCreateNode(edgeInfo.source)
            const target = this.getOrCreateNode(edgeInfo.target)
            source.addCallees(target)
        })

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