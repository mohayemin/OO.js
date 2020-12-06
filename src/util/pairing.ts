export interface Pair<T> {
    first: T,
    second: T
}

export function createPairs<T>(items: T[]): Pair<T>[] {
    const pairs = items.slice(0, items.length - 1).flatMap((first, i) =>
        items.slice(i + 1, items.length).map(second => ({ first, second } as Pair<T>))
    )

    return pairs
}

export class PairSet<T> {
    private addedPairs: Pair<T>[] = []
    add(pair: Pair<T>) {
        if(this.has(pair))
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