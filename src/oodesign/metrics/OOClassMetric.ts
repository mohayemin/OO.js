import { OOClass } from "../OOClass";


export interface OOClassMetric {
    value(ooClass: OOClass): number;
}

