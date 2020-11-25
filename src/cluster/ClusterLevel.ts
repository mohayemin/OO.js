import { union, without } from "lodash";
import { Cluster } from "./Cluster";


export class ClusterLevel {
    constructor(
        public readonly elements: Cluster[]
        , public readonly mergedElement: Cluster) {
    }

    hasNext(): boolean {
        return this.elements.length > 1;
    }

    next(): ClusterLevel {
        let { firstIndex, secondIndex } = this.findClosestPair();
        const first = this.elements[firstIndex];
        const second = this.elements[secondIndex];

        const mergedId = first.id + "$" + second.id;
        const mergedNeighbourIds = union(first.getNeighbourhood(), second.getNeighbourhood());

        let newElements = this.elements.slice();
        newElements[firstIndex] = new Cluster(mergedId, mergedNeighbourIds);
        newElements.splice(secondIndex, 1);
        newElements = newElements.map(e => this.copyElementForMerge(e, mergedId, first.id, second.id));

        return new ClusterLevel(newElements, newElements[firstIndex]);
    }

    copyElementForMerge(element: Cluster, newId: string, firstOldId: string, secondOldId: string) {
        const neighbourIds = without(element.getNeighbourhood(), firstOldId, secondOldId, newId);
        if (neighbourIds.length < element.getNeighbourhood().length) {
            neighbourIds.push(newId);
        }
        return new Cluster(element.id, neighbourIds);
    }

    private findClosestPair() {
        let maxCloseness = -1;
        let firstIndex: number, secondIndex: number;
        for (let i = 0; i < this.elements.length - 1; i++) {
            const ei = this.elements[i];
            for (let j = i + 1; j < this.elements.length; j++) {
                const ej = this.elements[j];

                const closeness = Cluster.closeness(ei, ej);
                console.log(ei.id, ej.id, closeness);
                if (closeness > maxCloseness) {
                    maxCloseness = closeness;
                    firstIndex = i;
                    secondIndex = j;
                }
            }
        }

        console.log('-------------------------');

        return { firstIndex, secondIndex };
    }
}
