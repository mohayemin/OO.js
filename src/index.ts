import { Analyzer } from "./analyzers"
import { readFileSync } from 'fs'
import { AnalysisConfig, AnalysisConfigInfo } from "./AnalysisConfig"

export function main(filePaths: string[]) {
    let config: AnalysisConfigInfo
    if (filePaths && filePaths.length)
        config = { files: filePaths }
    else
        config = JSON.parse(readFileSync("./input.json", "utf8"))

    const analysisConfig = new AnalysisConfig(config)
    console.log(analysisConfig)
    new Analyzer(analysisConfig).analyze()
}

main(process.argv.slice(2))
