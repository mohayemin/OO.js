import { Graph } from "./Graph"
import { fileSync as tempFile } from 'tmp'
import { readFileSync } from 'fs'
import { execSync } from 'child_process'
import { EdgeInfo, NodeInfo } from "./cgTypes"
import { GraphNode } from "./GraphNode"
import { Dictionary } from "lodash"

export class GraphBuilder {
    private nodeMap: Dictionary<GraphNode>
    constructor(public readonly filepath: string) {
    }

    buildCg(): Graph {
        const outFile = tempFile({ postfix: '.json' })
        execSync(`npx js-callgraph --cg ${this.filepath} --output=${outFile.name}`, { encoding: 'utf-8' })
        const jsonString = readFileSync(outFile.name, { encoding: 'utf-8' })
        const edgeInfos: EdgeInfo[] = JSON.parse(jsonString)

        edgeInfos.forEach(edgeInfo => {
            const source = this.getOrCreateNode(edgeInfo.source)
            const target = this.getOrCreateNode(edgeInfo.target)
            source.addNeighbour(target)
        })

        return new Graph(Object.values(this.nodeMap))
    }

    private getOrCreateNode(nodeInfo: NodeInfo): GraphNode {
        const id = `${nodeInfo.file}@${nodeInfo.label}@${nodeInfo.start.row}:${nodeInfo.start.column}`

        let node = this.nodeMap[id]
        if (!node) {
            node = new GraphNode(id, nodeInfo)
            this.nodeMap[id] = node
        }

        return node
    }
}
