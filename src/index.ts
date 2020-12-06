import { analyzeFile } from "./analyzers"
import { readFileSync } from 'fs'

export function main(args: string[]) {
    let filepaths: string[]
    if (args.length === 0) {
        filepaths = readFileSync("./input.txt", "utf8")
            .split("\n")
            .filter(fp => fp !== '')
            .map(fp => fp.trim())
    } else {
        filepaths = args
    }
    console.log(filepaths)
    for (const filepath of filepaths) {
        analyzeFile(filepath)
    }
}

main(process.argv.slice(2))
