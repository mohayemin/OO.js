import { Dictionary } from "lodash";
import { EdgeInfo, NodeInfo } from "./cgTypes";
import { Node } from "./Node";

export class Graph {
    readonly nodes: Node[];

    private nodeMap: Dictionary<Node>;

    constructor() {
        this.nodes = [];
        this.nodeMap = {};
    }

    addEdge(edgeInfo: EdgeInfo) {
        const source = this.getOrCreateNode(edgeInfo.source);
        const target = this.getOrCreateNode(edgeInfo.target);

        source.outNeighbours.push(target);
    }

    private getOrCreateNode(nodeInfo: NodeInfo): Node {
        const id = `${nodeInfo.file}@${nodeInfo.label}@${nodeInfo.start.row}:${nodeInfo.start.column}`

        let node = this.nodeMap[id];
        if(!node){
            node = new Node(id, nodeInfo);
            this.nodes.push(node);
            this.nodeMap[id] = node;
        }
            
        return node;
    }
}

