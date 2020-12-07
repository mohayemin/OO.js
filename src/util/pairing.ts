export interface Pair<T> {
    first: T
    second: T
}

export interface IndexedPair<T> extends Pair<T> {
    firstIndex: number,
    secondIndex: number
}

export function createPairs<T>(items: T[]): IndexedPair<T>[] {
    const pairs: IndexedPair<T>[] = [];
    for (let firstIndex = 0; firstIndex < items.length; firstIndex++) {
        const first = items[firstIndex];
        for (let secondIndex = firstIndex + 1; secondIndex < items.length; secondIndex++) {
            const second = items[secondIndex];
            pairs.push({ first, second, firstIndex, secondIndex })
        }
    }

    return pairs
}

export class PairSet<T> {
    private addedPairs: Pair<T>[] = []
    add(pair: Pair<T>) {
        if (this.has(pair))
            return false

        this.addedPairs.push(pair, { first: pair.second, second: pair.first })
        return true
    }

    has(pair: Pair<T>) {
        return this.addedPairs.some(p => p.first == pair.first && p.second == pair.second)
    }

    size() {
        return this.addedPairs.length / 2
    }
}