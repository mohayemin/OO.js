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

    A.adOutNeighbour(C);
    B.adOutNeighbour(E, F, G);
    C.adOutNeighbour();
    D.adOutNeighbour(A, C);
    E.adOutNeighbour(F, G);
    F.adOutNeighbour(G);
    G.adOutNeighbour(C, D);

    let clusters = [A, B, C, D, E, F, G];
    const level = new ClusterLevel(clusters.map(n => new Cluster(n.id, [n])));


    function printClusters() {
        console.log(level.clusterPairs.map(p => p + ''));
    }

    it('should correctly find the closest pair', () => {
        //printClusters();
        let closest = level.findClosestPair();
        expect(closest.first.id).toBe("B");
        expect(closest.second.id).toBe("E");

        level.merge(closest.first, closest.second);
        printClusters();
        closest = level.findClosestPair();
        expect(closest.first.id).toBe("A");
        expect(closest.second.id).toBe("D")

        level.merge(closest.first, closest.second);
        closest = level.findClosestPair();
        expect(closest.first.id).toBe("A$D");
        printClusters()
        expect(closest.second.id).toBe("G")

        return
        level.merge(closest.first, closest.second);
        closest = level.findClosestPair();
        expect(closest.first.id).toBe("B$E");
        expect(closest.second.id).toBe("F")

        level.merge(closest.first, closest.second)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("A$D$G")
        expect(closest.second.id).toBe("C")
        // expect(level.mergedCluster.id).toEqual('A$D$G$C');
        // expect(level.mergedCluster.id).toEqual('A$D$G$C$B$E$F');
    });
});
