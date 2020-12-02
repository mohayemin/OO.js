import { clone, intersection, union, uniq } from "lodash";
import { FunctionNode } from "../cg/FunctionNode";

export class OOClass {
    allNeighbours: FunctionNode[];
    allCallees: FunctionNode[];

    constructor(public id: string,
        public methods: FunctionNode[]) {
        this.buildCache();
    }

    mergeWith(other: OOClass): void {
        this.id += "$" + other.id;
        this.methods.push(...other.methods);
        this.buildCache();
    }

    private buildCache() {
        this.allNeighbours = uniq(this.methods.flatMap(n => n.neighbours()));
        this.allCallees = this.methods.flatMap(n => n.callees);
    }

    clone() {
        return new OOClass(this.id, clone(this.methods));
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
}
