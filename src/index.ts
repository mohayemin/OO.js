import { CallGraphBuilder } from "./cg/CallGraphBuilder"

async function main() {
    const args = process.argv.slice(2)
    const graphBuilder = new CallGraphBuilder(args[0])
    let cg = graphBuilder.buildCg()
    console.log(cg.nodes)
}

main()

