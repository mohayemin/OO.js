import { Cluster } from "./Cluster";
import { FlatCluster } from "./FlatCluster";

describe('x', () => {
    it('y', () => {
        const one = new FlatCluster("B", ["B", "E", "F", "G"]);
        const two = new FlatCluster("E", ["F", "G"]);

        const closeness = one.closeness(two);
        expect(closeness).toEqual(.75);
    });
});
