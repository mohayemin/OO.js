import { without } from "lodash";
import { ClusterElement } from "./ClusterElement";


export class ClusterLevel {
    constructor(
        public readonly elements: ClusterElement[]) {
    }

    hasNext(): boolean {
        return this.elements.length > 1;
    }

    next(): ClusterLevel {
        let maxCloseness = 0;
        let closestPair: ClusterElement[] = [];
        for (let i = 0; i < this.elements.length; i++) {
            const ei = this.elements[i];
            for (let j = i + 1; j < this.elements.length; j++) {
                const ej = this.elements[j];

                const closeness = ClusterElement.closeness(ei, ej);
                if (closeness > maxCloseness) {
                    maxCloseness = closeness;
                    closestPair = [ei, ej];
                }
            }
        }

        const mergedElement = ClusterElement.merge(closestPair[0], closestPair[1]);
        const newElements = without(this.elements, ...closestPair);
        newElements.push(mergedElement);

        return new ClusterLevel(newElements);
    }
}
