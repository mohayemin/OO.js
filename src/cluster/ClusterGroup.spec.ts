import { FunctionNode } from "../cg/GraphNode"
import { Cluster } from "./Cluster"
import { ClusterGroup } from "./ClusterGroup"

describe("cluster set", () => {
    let A = new FunctionNode("A"),
        B = new FunctionNode("B"),
        C = new FunctionNode("C"),
        D = new FunctionNode("D"),
        E = new FunctionNode("E"),
        F = new FunctionNode("F"),
        G = new FunctionNode("G")

    A.addCallees(C)
    B.addCallees(E, F, G)
    C.addCallees()
    D.addCallees(A, C)
    E.addCallees(F, G)
    F.addCallees(G)
    G.addCallees(C, D)

    let clusters = [A, B, C, D, E, F, G]
    const level = new ClusterGroup(clusters.map(n => new Cluster(n.id, [n])))


    function printClusters() {
        console.log(level.clusterPairs.map(p => p + ''))
    }

    it('should correctly find the closest pair', () => {
        let closest = level.findClosestPair()
        expect(closest.first.id).toBe("B")
        expect(closest.second.id).toBe("E")
        expect(closest.closeness).toBeCloseTo(1)

        level.merge(closest.firstIndex, closest.secondIndex)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("B$E")
        expect(closest.second.id).toBe("F")
        expect(closest.closeness).toBeCloseTo(1)

        level.merge(closest.firstIndex, closest.secondIndex)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("C")
        expect(closest.second.id).toBe("D")
        expect(closest.closeness).toBeCloseTo(1)

        level.merge(closest.firstIndex, closest.secondIndex)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("A")
        expect(closest.second.id).toBe("C$D")
        expect(closest.closeness).toBeCloseTo(3/4)

        level.merge(closest.firstIndex, closest.secondIndex)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("B$E$F")
        expect(closest.second.id).toBe("G")
        expect(closest.closeness).toBeCloseTo(4/6)

        level.merge(closest.firstIndex, closest.secondIndex)
        closest = level.findClosestPair()
        expect(closest.first.id).toBe("A$C$D")
        expect(closest.second.id).toBe("B$E$F$G")
        expect(closest.closeness).toBeCloseTo(3/7)
    })
})
