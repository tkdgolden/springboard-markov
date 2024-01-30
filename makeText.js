/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require("./markov");

function makeText() {
    const inputType = process.argv[2];
    const input = process.argv[3];
    if (inputType === "file") {
        makeFromFile(input);
    }
    else if (inputType === "url") {
        makeFromURL(input);
    }
}

function makeFromFile(file) {
    fs.readFile(file, "utf8", function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        else {
            const machine = new MarkovMachine(data);
            console.log(machine.makeText());
        }
    })
}

async function makeFromURL(url) {
    try {
        const response = await axios.get(url);
        const machine = new MarkovMachine(response.data);
        console.log(machine.makeText());
    }
    catch (error) {
        console.log("Error fetching " + url + " : " + error.code);
    }
}

makeText();