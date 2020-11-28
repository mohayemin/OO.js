import { Graph } from "../cg/Graph"
import { GraphNode } from "../cg/GraphNode"
import { AgglomerativeClustering } from "./AgglomerativeClustering"
import { Cluster } from "./Cluster"
import { ClusterLevel } from "./ClusterLevel"
import { LORMClusterScore, NaiveClusterScorer } from "./scoring/LORMScore"

describe("agglomaretive clustering", () => {
    let A = new GraphNode("A"),
        B = new GraphNode("B"),
        C = new GraphNode("C"),
        D = new GraphNode("D"),
        E = new GraphNode("E"),
        F = new GraphNode("F"),
        G = new GraphNode("G")

    A.addNeighbour(B, C, D)
    B.addNeighbour(D)
    C.addNeighbour(D)
    D.addNeighbour()
    E.addNeighbour(F, G)
    F.addNeighbour(G)
    G.addNeighbour()

    let nodes = [A, B, C, D, E, F, G]
    const level = new ClusterLevel(nodes.map(n => new Cluster(n.id, [n])))

    let g = new Graph([A, B, C, D, E, F, G])

    const clustering = new AgglomerativeClustering(g, n => new Cluster(n.id, [n]), new NaiveClusterScorer)

    it('should correctly find the closest pair', () => {
        const results = clustering.apply()
        console.log(results.topScorer.closestPair)
    })
})
