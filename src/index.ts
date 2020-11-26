import { GraphBuilder } from "./cg/GraphBuilder"

async function main() {
    const args = process.argv.slice(2)
    const graphBuilder = new GraphBuilder(args[0])
    let cg = graphBuilder.buildCg()
    console.log(cg.nodes)
}

main()

