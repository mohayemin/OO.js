import { clone, flatMap, intersection, union, uniq, without } from "lodash";
import { GraphNode } from "../cg/GraphNode";

export class Cluster {
    neighbours: GraphNode[];
    constructor(public id: string,
        public components: GraphNode[]) {
            this.buildCache();
    }

    mergeWith(other: Cluster): void {
        this.id += "$" + other.id;
        this.components.push(...other.components);
    }

    private buildCache() {
        this.neighbours = [].concat(...this.components.map(n => n.getOutNeighbours()));
    }

    score(): number {
        const outClusterEdges = without(this.neighbours, ...this.components).length;
        const inClusterEdges = this.neighbours.length - outClusterEdges
        
        const diff = inClusterEdges - outClusterEdges;
        const score = diff / this.neighbours.length;

        return score;
    }

    clone() {
        return new Cluster(this.id, clone(this.components));
    }

    // TODO: cache closeness for performance
    closeness(other: Cluster): number {
        const inter = intersection(this.neighbours, other.neighbours);
        const all = union(this.neighbours, other.neighbours);
        return inter.length / all.length;
    }
}
