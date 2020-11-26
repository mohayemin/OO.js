import { Cluster } from "./Cluster";
import { FlatCluster } from "./FlatCluster";
import { ClusterLevel } from "./ClusterLevel";
import { AgglomerativeClustering } from "./AgglomerativeClustering";

describe("agglomerative clustering", () => {
    let A = new FlatCluster("A", ["C"]),
        B = new FlatCluster("B", ["E", "F", "G"]),
        C = new FlatCluster("C", []),
        D = new FlatCluster("D", ["A", "C"]),
        E = new FlatCluster("E", ["F", "G"]),
        F = new FlatCluster("F", ["G"]),
        G = new FlatCluster("G", ["C", "D"]);

    let clusters = [A, B, C, D, E, F, G];
    const clustering = new AgglomerativeClustering();

    it('should correctly find the closest pair', () => {
        const pair = clustering.findClosestPair(clusters);
        expect(pair.first).toBe(B);
        expect(pair.second).toBe(E);
        // level = level.next();
        // expect(level.mergedCluster.id).toEqual('B$E');
        // level = level.next();
        // expect(level.mergedCluster.id).toEqual('A$D');
        // level = level.next();
        // expect(level.mergedCluster.id).toEqual('A$D$G');
        // level = level.next();
        // expect(level.mergedCluster.id).toEqual('B$E$F');
        // level = level.next();
        // expect(level.mergedCluster.id).toEqual('A$D$G$C');
        // level = level.next();
        // expect(level.mergedCluster.id).toEqual('A$D$G$C$B$E$F');
    });
});
