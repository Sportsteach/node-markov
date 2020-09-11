/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov')
const process = require('process')
const axios = require('axios');

function textPrint(text) {

    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.exit(1)
        }
        textPrint(data)
    })
}

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data)

    } catch (err) {
        console.log("ERROR:", err);
        process.exit(1)
    }
    textPrint(data)
}


let path = process.argv[2];

let file;

if (path.startsWith('--out')) {
    path = process.argv[4];
    file = process.argv[3];
    fs_path = fs.readFileSync(path, 'utf8');
    p_str = fs_path.toString();
    console.log("fs", fs_path, file);
    textPrint(p_str, file)
} else {
    if (path.endsWith('com')) {
        webCat(path);
    } else {
        cat(path);
    }
}
