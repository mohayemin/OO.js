import { Cluster } from "./Cluster";
import { FlatCluster } from "./FlatCluster";
import { ClusterLevel } from "./ClusterLevel";
import { FlatClusterFactory } from "./FlatClusterFactory";

describe("cluster level", () => {
    let A = new FlatCluster("A", ["C"]),
        B = new FlatCluster("B", ["E", "F", "G"]),
        C = new FlatCluster("C", []),
        D = new FlatCluster("D", ["A", "C"]),
        E = new FlatCluster("E", ["F", "G"]),
        F = new FlatCluster("F", ["G"]),
        G = new FlatCluster("G", ["C", "D"]);

    let level = new ClusterLevel([A, B, C, D, E, F, G], null, new FlatClusterFactory());

    it('should correctly find next level', () => {
        level = level.next();
        expect(level.mergedCluster.id).toEqual('B$E');
        level = level.next();
        expect(level.mergedCluster.id).toEqual('A$D');
        level = level.next();
        expect(level.mergedCluster.id).toEqual('A$D$G');
        level = level.next();
        expect(level.mergedCluster.id).toEqual('B$E$F');
        level = level.next();
        expect(level.mergedCluster.id).toEqual('A$D$G$C');
        level = level.next();
        expect(level.mergedCluster.id).toEqual('A$D$G$C$B$E$F');
    });
});
