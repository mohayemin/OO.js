import { sumBy } from "lodash";
import { Cluster } from "../Cluster";
import { LORM } from "./LORM";

export class LORMCoupling {
    score(clusters: Cluster[]): number {
        const totalRelations = sumBy(clusters, c => c.outClusterEdges()) / 2;
        const coupling = LORM(totalRelations, clusters.length)
        return coupling;
    } 
}
