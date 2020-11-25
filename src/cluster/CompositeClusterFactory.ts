import { ClusterFactory } from "./ClusterFactory";
import { CompositeCluster } from "./CompositeCluster";


export class CompositeClusterFactory extends ClusterFactory<CompositeCluster> {
    merge(first: CompositeCluster, second: CompositeCluster): CompositeCluster {
        const mergedId = first.id + "$" + second.id;
        const allComponents = first.components.concat(second.components);
        return new CompositeCluster(mergedId, allComponents);
    }
    updateNeighbours(source: CompositeCluster, mergedId: string, firstOldId: string, secondOldId: string): CompositeCluster {
        return new CompositeCluster(source.id, source.components);
    }

}
