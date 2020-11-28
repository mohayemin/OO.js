import { sumBy } from "./lodash";
import { OOClass } from "../OOClass";
import { LORM } from "./LORM";

export class LORMCoupling {
    score(classes: OOClass[]): number {
        const totalRelations = sumBy(classes, c => c.externalRelationCount()) / 2;
        const coupling = LORM(totalRelations, classes.length)
        return coupling;
    } 
}
