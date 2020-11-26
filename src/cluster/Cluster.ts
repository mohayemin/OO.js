import { clone, flatMap, intersection, union, uniq, without } from "lodash";
import { GraphNode } from "../cg/GraphNode";

export class Cluster {
    entitySet: GraphNode[];
    constructor(public id: string,
        public components: GraphNode[]) {
        this.buildCache()
    }

    mergeWith(other: Cluster): void {
        this.id += "$" + other.id;
        this.components.push(...other.components);
        this.buildCache();
    }

    private buildCache() {
        this.entitySet = this.components.flatMap(n => Array.from(n.entitySet));
    }

    score(): number {
        const outClusterEdges = without(this.entitySet, ...this.components).length;
        const inClusterEdges = this.entitySet.length - outClusterEdges

        const diff = inClusterEdges - outClusterEdges;
        const score = diff / this.entitySet.length;

        return score;
    }

    clone() {
        return new Cluster(this.id, clone(this.components));
    }

    // TODO: cache closeness for performance
    closeness(other: Cluster): number {
        const inter = intersection(this.entitySet, other.entitySet);
        const all = union(this.entitySet, other.entitySet);
        return inter.length / all.length;
    }

    toString() {
        return this.id;
    }
}
