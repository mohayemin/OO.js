import { meanBy } from "lodash";
import { Cluster } from "../Cluster";
import { LORM } from "./LORM";

export class AverageLORMCohesion {
    score(clusters: Cluster[]): number {
        return meanBy(clusters, c => LORM(c.inClusterEdges(), c.components.length));
    }
}

