
export class Range {
    constructor(
        public readonly min: number,
        public readonly max: number
    ) { }

    public static fromValues(values: number[]){
        let min = Number.POSITIVE_INFINITY
        let max = Number.NEGATIVE_INFINITY
        for (const val of values) {
            if(val < min) min = val
            if(val > max) max = val
        }

        return new Range(min, max)
    }
}
