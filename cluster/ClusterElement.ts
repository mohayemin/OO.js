import { flatMap, intersection, unionBy } from "lodash";
import { Node } from "../cg/Node";

export class ClusterElement {
    constructor(
        public readonly nodes: Node[]) {
    }

    private _outNeighbourhood: string[];
    outNeighbourhood() {
        if (!this._outNeighbourhood) {
            const neighbourIds = flatMap(this.nodes, n => n.outNeighbourhood());
            this._outNeighbourhood = [...new Set<string>(neighbourIds)];
        }

        return this._outNeighbourhood;
    }

    static closeness(element1: ClusterElement, element2: ClusterElement): number {
        const inter = intersection(element1.outNeighbourhood(), element2.outNeighbourhood());
        const union = new Set([...element1.outNeighbourhood(), ...element2.outNeighbourhood()]);
        return inter.length / union.size;
    }

    static merge(element1: ClusterElement, element2: ClusterElement) {
        const nodes = unionBy(element1.nodes, element2.nodes, n => n.id);
        return new ClusterElement(nodes);
    }
}

