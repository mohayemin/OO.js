import { NodeInfo } from "./cgTypes"

export class FunctionNode {
    public readonly callees: FunctionNode[] = []
    public readonly callers: FunctionNode[] = []

    constructor(
        public readonly id: string,
        public readonly info: NodeInfo = null) {
    }

    addCallees(...callees: FunctionNode[]) {
        for (const n of callees) {
            this.callees.push(n)
            n.callers.push(this)
        }
        
        return this
    }

    neighbours() {
        return this.callees.concat(this.callers);
    }
}

