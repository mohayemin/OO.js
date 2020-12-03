class OOClass {
    A1(val) {
        if (val)
            this._allNeighbours = val;
        return this._allNeighbours;
    }
    A2(val) {
        if (val)
            this._allCallees = val;
        return this._allCallees;
    }
    A3(val) {
        if (val)
            this._id = val;
        return this._id;
    }
    A4() {
        return this._methods;
    }
    A5() {
        this.A7();
    }
    A6(other) {
        this.A3(this.A3() + "$" + other.A3());
        this.A4().push(...other.A4());
        this.A7();
    }
    A7() {
        this.A4()[0].neighbours();
        this.A1();
        this.A2();
    }
    A8() {
        this.A3();
        this.A4();
        return this.A5();
    }
    A9(other) {
        this.A1();
        other.A1();
        this.A1();
        other.A1();
        return 0;
    }
}
class OOClassDesign {
    B1() {
        return [];
    }
    B2() {
        return this._classes;
    }
    B3() {
        this.B4();
        return null;
    }
    B4() {
        this.B2();
        this.B1();
    }
    B5() {
        return this.B2().length > 1;
    }
    B6(firstIndex, secondIndex) {
        const newClasses = this.B2();
        newClasses[0].A8();
        const first = newClasses[firstIndex];
        const second = newClasses[secondIndex];
        first.A6(second);
        return this.B3();
    }
    B7() {
        this.B1();
    }
    B8() {
        this.B2()[0].A4();
    }
}
export class OODesignResult {
    C1(val) {
        if (val)
            this._topScorer = val;
        return this._topScorer;
    }
    C2(val) {
        if (val)
            this._metrics = val;
        return this._metrics;
    }
    C3(val) {
        if (val)
            this._resultItems = val;
        return this._resultItems;
    }
    C4() {
        this.C5();
    }
    C5() {
        for (const metric of this.C2()) {
            this.C6(metric);
        }
        this.C3()[0].D5();
        this.C1().D3(1);
        let prevItem = this.C1();
        prevItem.D5();
        prevItem.D3();
    }
    C6(metric) {
        const rawValues = this.C3()[0].D7(metric.id());
        const range = metric.possibleValueRange(rawValues);
        for (const result of this.C3())
            result.D9(metric, range);
    }
    C7() {
        return this.C3()[0].D0();
    }
}
class OODesignResultItem {
    constructor() {
        this._rawValues = {};
        this._normalValues = {};
        this._score = undefined;
    }
    D1(val) {
        if (val)
            this._normalValues = val;
        return this._normalValues;
    }
    D2(val) {
        if (val)
            this._rawValues = val;
        return this._rawValues;
    }
    D3(val) {
        if (val)
            this._rank = val;
        return this._rank;
    }
    D4() {
    }
    D5() {
        if (this._score === undefined)
            this.D1();
        return this._score;
    }
    D6(metricId, value) {
        this.D2()[metricId] = value;
    }
    D7(metricId) {
        return this.D2()[metricId];
    }
    D8(metricId) {
        return this.D1()[metricId];
    }
    D9(metric, range) {
        this.D1()[metric.id] = metric.factor * Y1(this.D7(metric.id), range.min, range.max);
    }
    D0() {
        this.design.B2()[0].A3();
        this.D5();
        X1(0);
        this.D1();
        this.D3();
    }
}
function X1(value) {
    const fixed = value.toFixed(2);
    return value >= 0 ? "+" + fixed : fixed;
}
function Y1(value, min, max) {
    if (max === min) {
        return min;
    }
    return (value - min) / (max - min);
}
