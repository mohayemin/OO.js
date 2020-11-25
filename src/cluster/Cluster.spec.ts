import { Cluster } from "./Cluster";

describe('x', () => {
    it('y', () => {
        const one = new Cluster("B", ["B", "E", "F", "G"]);
        const two = new Cluster("E", ["F", "G"]);

        const closeness = Cluster.closeness(one, two);
        expect(closeness).toEqual(.5);
    });
});
