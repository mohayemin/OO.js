# OO.js
OO.js is a tool that suggests Object-Oriented design for a JavaScript code. This repository is the implementation of the paper "OO.js: Object-Oriented Design Suggestions for JavaScript Programs"

Below is the list of available artifacts:
* The source code is in the `src` folder. The code is writen in TypeScript.
* The code is not thoroghly unit tested, but some tests were writen and are available in the `test` folder. It is possible that some tests are outdated. You can run the tests using `npm test` command after the installation is complete.
* The the input and output of the experiments done are in hte `experiment` folder. The output are in CSV format.
* A detailed analysis of the results can be found in [this spreadsheet](https://docs.google.com/spreadsheets/d/1HhFr8qY2q6QnCWQbZHPrDtmuoI8BQKqjH5fAMyuFPBQ/edit?usp=sharing).

## Installation
Node.js and TypeScript is required to run the program. It is tested on a Windows 10 machine. However, it should work on any system that supports the required version of Node.

### Step 1:  Install the system requirements  
Install _Node v14+_ from here: https://nodejs.dev/

When complete, open a terminal and install _TypeScript_ and _TS Node_. Run the following commands
TypeScript: Run the following command in a command line tool   
```
npm install -g typescript
npm install -g ts-node
```

### Step 2: Clone the repository
Open a terminal in a location where you want to install the program and run the following command:
```
git clone https://github.com/mohayemin/OO.js
```
If you do not have git or do not want to clone the repository, you can download the package directly from here: https://github.com/mohayemin/OO.js/archive/main.zip. Unzip the package in your desired location.

### Step 3: Install dependencies
Move to or open your terminal in the reporsitory root directory (the directory where the `README.md` file is located) and install the dependencies:

```bash 
npm install
```

## Running the program

### Run using configuration file
There is an `input.json` file at the repository root. This file contains the inputs for the program. Below are the rescriptions of the parameters.

* `files` (required): A list of string. Specifies the input files for which design should be suggested. Each individual item on the list are considered separate programs. It is an array that takes a list of file or folder paths. It accepts both relative and absolute path. If the path is a directory, it will process all files in that directory and all recursive subdirectories. That means if you want to process a multi-file program, you can just put the files in a directory.
* `outputDirectory` (optional): The results are printed in hte console. You can additionally generate the results as CSV in the `outputDirectory`.
* `closenessMetric` (optional, default=`class`): one of `class` or `method`.
* `cohesionRangeAlgorithm`: (optional, default=`zeroToOne`): one of `zeroToOne` or `fromValues`

Use the command `npm start` to run the program with the configurations in the `input.json` file.

### Quick run
You can also quick run the program with default configuration. Just add the file/folder names as command line arguments. For example:
```
npm start code-file-1.js code-file2.js code-folder-1
```

This command is equivalent to runing the program with the following config file:
```JSON
{
    "files": [
        "./code-file-1.js",
        "./code-file2.js",
        "./code-folder-1"
    ],
}
```

## Sample Input/Output

**sample-input.js**
```javascript
function A() {
    B()
    C()
    D()
}

function B() {
    D();
}

function C() {
    D();
}

function D() {
    G();
}

function e() {
    f();
    G();
}

function f() {
    G()
}

function G() {
}
```

**Command**
```
npm start .\sample-input.js
```

**Output**
```
A B C D G E F : +0.00 (+1.00 -1.00) : 7
A B C D G E$F : +0.09 (+1.00 -0.91) : 4
A$D B C G E$F : +0.07 (+1.00 -0.93) : 5
A$D B C G$E$F : +0.03 (+1.00 -0.97) : 6
A$D$B C G$E$F : +0.22 (+1.00 -0.78) : 3
A$D$B$C G$E$F : +0.53 (+0.92 -0.39) : 1
A$D$B$C$G$E$F : +0.43 (+0.43 +0.00) : 2
```