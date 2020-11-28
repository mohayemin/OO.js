import { clone, intersection, union, uniq } from "lodash";
import { FunctionNode } from "../cg/GraphNode";


export class OOClass {
    allNeighbours: FunctionNode[];
    allCallees: FunctionNode[];

    constructor(public id: string,
        public components: FunctionNode[]) {
        this.buildCache();
    }

    mergeWith(other: OOClass): void {
        this.id += "$" + other.id;
        this.components.push(...other.components);
        this.buildCache();
    }

    private buildCache() {
        this.allNeighbours = uniq(this.components.flatMap(n => n.neighbours()));
        this.allCallees = this.components.flatMap(n => n.callees);
    }

    clone() {
        return new OOClass(this.id, clone(this.components));
    }

    // TODO: cache closeness for performance
    closeness(other: OOClass): number {
        const inter = intersection(this.allNeighbours, other.allNeighbours);
        const all = union(this.allNeighbours, other.allNeighbours);
        return inter.length / all.length;
    }

    toString() {
        return this.id;
    }

    // TODO: use a set for performance
    internalRelationCount(): number {
        return this.allCallees.filter(callee => this.components.includes(callee)).length;
    }

    // TODO: use a set for performance
    externalRelationCount(): number {
        return this.allNeighbours.filter(e => !this.components.includes(e)).length;
    }
}
