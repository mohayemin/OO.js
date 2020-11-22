import { ClusterElement } from "./ClusterElement";
import { ClusterLevel } from "./ClusterLevel";

describe("cluster level", () => {
    let A = new ClusterElement("A", ["C"]),
        B = new ClusterElement("B", ["E", "F", "G"]),
        C = new ClusterElement("C", []),
        D = new ClusterElement("D", ["A", "C"]),
        E = new ClusterElement("E", ["F", "G"]),
        F = new ClusterElement("F", ["G"]),
        G = new ClusterElement("G", ["C", "D"]);

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
