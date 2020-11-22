import { Graph } from "./Graph";
import { fileSync as tempFile } from 'tmp';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { EdgeInfo } from "./cgTypes";

export class GraphBuilder {
    constructor(public readonly filepath: string){
    }

    buildCg(): Graph {
        const outFile = tempFile({ postfix: '.json' });
        execSync(`npx js-callgraph --cg ${this.filepath} --output=${outFile.name}`, { encoding: 'utf-8' });
        const jsonString = readFileSync(outFile.name, { encoding: 'utf-8' });
        const edgeInfos: EdgeInfo[] = JSON.parse(jsonString);
        var cg = new Graph();
    
        for (let i = 0; i < edgeInfos.length; i++) {
            cg.addEdge(edgeInfos[i]);
        }
    
        return cg;
    }
}
