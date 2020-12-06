import { Dictionary, map, sum } from "lodash";
import { OODesignMetric } from "./metrics/OODesignMetric";
import { Range } from "./metrics/Range";
import { OOClassDesign as OOClassDesign } from "./OOClassDesign";
import { OOClassPair } from "./OOClassPair";

export class OODesignResultItem {
    private rawValues: Dictionary<number> = {}
    private normalValues: Dictionary<number> = {}
    public rank: number

    constructor(
        public design: OOClassDesign,
        public closestPair: OOClassPair,
        private metrics: OODesignMetric[]
    ) {
        this.process();
    }

    private process() {
        for (const metric of this.metrics)
            this.setRaw(metric.id, metric.value(this.design))
    }

    private _score: number = undefined
    score() {
        if (this._score === undefined)
            this._score = sum(Object.values(this.normalValues))

        return this._score
    }

    setRaw(metricId: string, value: number) {
        this.rawValues[metricId] = value
    }

    getRaw(metricId: string) {
        return this.rawValues[metricId]
    }

    getNormal(metricId: string) {
        return this.normalValues[metricId]
    }

    normalize(metric: OODesignMetric, range: Range) {
        this.normalValues[metric.id] = metric.factor * normalize(this.getRaw(metric.id), range.min, range.max)
    }

    public format() {
        return this.design.classes.map(c => c.id).join(" ") + " : " +
            formatWithSign(this.score()) +
            " (" + map(this.normalValues, formatWithSign).join(" ") + ") : " +
            this.rank;
    }

    public shortFormat() {
        return formatWithSign(this.score()) +
            " (" +
            map(this.normalValues, formatWithSign).join(" ") +
            ") " +
            this.rank +
            " classes: " +
            this.design.classes.length
    }

    public getRawValues() {
        return Object.values(this.rawValues)
    }
}

function formatWithSign(value: number) {
    const fixed = value.toFixed(2)
    return value >= 0 ? "+" + fixed : fixed
}

function normalize(value: number, min: number, max: number) {
    if (max === min) {
        return min
    }
    return (value - min) / (max - min);
}
