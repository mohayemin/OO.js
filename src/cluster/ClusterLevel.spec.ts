import { GraphNode } from "../cg/GraphNode";
import { Cluster } from "./Cluster";
import { ClusterLevel } from "./ClusterLevel";

describe("clustering level", () => {
    // let A = new FlatCluster("A", ["C"]),
    //     B = new FlatCluster("B", ["E", "F", "G"]),
    //     C = new FlatCluster("C", []),
    //     D = new FlatCluster("D", ["A", "C"]),
    //     E = new FlatCluster("E", ["F", "G"]),
    //     F = new FlatCluster("F", ["G"]),
    //     G = new FlatCluster("G", ["C", "D"]);

    let A = new GraphNode("A"),
        B = new GraphNode("B"),
        C = new GraphNode("C"),
        D = new GraphNode("D"),
        E = new GraphNode("E"),
        F = new GraphNode("F"),
        G = new GraphNode("G");

    A.addNeighbour(C);
    B.addNeighbour(E, F, G);
    C.addNeighbour();
    D.addNeighbour(A, C);
    E.addNeighbour(F, G);
    F.addNeighbour(G);
    G.addNeighbour(C, D);

    let clusters = [A, B, C, D, E, F, G];
    const level = new ClusterLevel(clusters.map(n => new Cluster(n.id, [n])));


    function printClusters() {
        console.log(level.clusterPairs.map(p => p + ''));
    }

    it('should correctly find the closest pair', () => {
        let closest = level.findClosestPair()
        expect(closest.first.id).toBe("B")
        expect(closest.second.id).toBe("E")
        expect(closest.closeness).toBeCloseTo(1)

        level.merge(closest.first, closest.second)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("B$E")
        expect(closest.second.id).toBe("F")
        expect(closest.closeness).toBeCloseTo(1)

        level.merge(closest.first, closest.second)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("C")
        expect(closest.second.id).toBe("D")
        expect(closest.closeness).toBeCloseTo(1)

        level.merge(closest.first, closest.second)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("A")
        expect(closest.second.id).toBe("C$D")
        expect(closest.closeness).toBeCloseTo(3/4)

        level.merge(closest.first, closest.second)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("B$E$F")
        expect(closest.second.id).toBe("G")
        expect(closest.closeness).toBeCloseTo(4/6)

        level.merge(closest.first, closest.second)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("A$C$D")
        expect(closest.second.id).toBe("B$E$F$G")
        expect(closest.closeness).toBeCloseTo(3/7)
    });
});
