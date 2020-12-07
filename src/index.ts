import { Analyzer } from "./analyzers"
import { readFileSync } from 'fs'
import { AnalysisConfig } from "./AnalysisConfig"

export function main(args: string[]) {
    let analysisConfig: AnalysisConfig

    if (args.length === 0) {
        const config = JSON.parse(readFileSync("./input.json", "utf8"))
        analysisConfig = new AnalysisConfig(config)
    } else {
        analysisConfig = new AnalysisConfig({
            files: args
        })
    }
    console.log(analysisConfig)
    
    new Analyzer(analysisConfig).analyze()
}

main(process.argv.slice(2))
