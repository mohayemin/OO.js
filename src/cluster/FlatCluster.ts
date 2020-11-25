import { uniq } from "lodash";
import { Cluster } from "./Cluster";


export class FlatCluster extends Cluster {
    private readonly neighbourhood: string[];
    constructor(
        id: string,
        neighbourIds: string[]
    ) {
        super(id);
        this.neighbourhood = uniq([id, ...neighbourIds]);
    }

    getNeighbourhood() {
        return this.neighbourhood;
    }
}
