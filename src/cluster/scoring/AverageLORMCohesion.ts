import { meanBy } from "lodash";
import { OOClass } from "../OOClass";
import { LORM } from "./LORM";

export class AverageLORMCohesion {
    score(classes: OOClass[]): number {
        return meanBy(classes, c => LORM(c.internalRelationCount(), c.components.length));
    }
}

