import { Node } from "../cg/Node";
import { ClusterElement } from "./ClusterElement";

describe('x', () => {
    it('y', () => {
        const one = new ClusterElement("B", ["B", "E", "F", "G"]);
        const two = new ClusterElement("E", ["F", "G"]);

        const closeness = ClusterElement.closeness(one, two);
        expect(closeness).toEqual(.5);
    });
});
