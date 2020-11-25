import { Cluster } from "./Cluster";
import { ClusterLevel } from "./ClusterLevel";

describe("cluster level", () => {
    let A = new Cluster("A", ["C"]),
        B = new Cluster("B", ["E", "F", "G"]),
        C = new Cluster("C", []),
        D = new Cluster("D", ["A", "C"]),
        E = new Cluster("E", ["F", "G"]),
        F = new Cluster("F", ["G"]),
        G = new Cluster("G", ["C", "D"]);

    let level = new ClusterLevel([A, B, C, D, E, F, G], null);

    it('should correctly find next level', () => {
        level = level.next();
        expect(level.mergedElement.id).toEqual('B$E');
        level = level.next();
        expect(level.mergedElement.id).toEqual('A$D');
        level = level.next();
        expect(level.mergedElement.id).toEqual('A$D$G');
        level = level.next();
        expect(level.mergedElement.id).toEqual('B$E$F');
        level = level.next();
        expect(level.mergedElement.id).toEqual('A$D$G$C');
        level = level.next();
        expect(level.mergedElement.id).toEqual('A$D$G$C$B$E$F');
    });
});
