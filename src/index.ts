import { Analyzer } from "./analyzers"
import { readFileSync } from 'fs'
import { AnalysisConfig } from "./AnalysisConfig"

export function main(args: string[]) {
    const config = JSON.parse(readFileSync("./input.json", "utf8"))
    const analysisConfig = new AnalysisConfig(config)
    console.log(analysisConfig)
    new Analyzer(analysisConfig).analyze()
}

main(process.argv.slice(2))
