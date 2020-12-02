
export class OOMetricResult {
    constructor(
        public readonly value: number,
        public readonly parts: number[] = []
    ) {
    }

    format() {
        return this.value.toFixed(2) + " (" + this.parts.map(p => p.toFixed(2)).join(" ") + ")"
    }
}
