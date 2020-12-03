import { analyzeFile } from "./analyzers"

export function main(filepaths: string[]) {
    for (const filepath of filepaths) {
        analyzeFile(filepath)
    }
}

main(process.argv.slice(2))
