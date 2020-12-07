import { intersection, union } from "lodash";
import { OOClass } from "../OOClass";

export interface ClassClosenessMetric {
    closeness(class1: OOClass, class2: OOClass): number;
}

export class MethodNeighbourhoodClassClosenessMetric implements ClassClosenessMetric {
    closeness(class1: OOClass, class2: OOClass): number {
        return jaccardSimilarity(class1.allNeighbours, class2.allNeighbours)
    }
}

export class ClassNeighbourhoodClassClosenessMetric implements ClassClosenessMetric {
    closeness(class1: OOClass, class2: OOClass): number {
        const neighbours1 = class1.allNeighbours.map(n => n.containerClass).concat(class1)
        const neighbours2 = class2.allNeighbours.map(n => n.containerClass).concat(class2)
        return jaccardSimilarity(neighbours1, neighbours2)
    }
}

export function jaccardSimilarity<T>(a: T[], b: T[]): number {
    const common = intersection(a, b)
    const all = union(a, b)
    return common.length / all.length
}