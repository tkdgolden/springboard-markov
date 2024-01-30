/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.chains = this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        var chainObj = {};
        for (var i = 0; i < this.words.length; i++) {
            if (this.words[i + 1]) {
                if (chainObj[this.words[i]]) {
                    chainObj[this.words[i]].push(this.words[i + 1]);
                }
                else {
                    chainObj[this.words[i]] = [this.words[i + 1]];
                }
            }
            else {
                if (chainObj[this.words[i]]) {
                    chainObj[this.words[i]].push(null);
                }
                else {
                    chainObj[this.words[i]] = [null];
                }
            }
        }
        return chainObj;
    }


    /** return random text from chains */

    makeText(numWords = 100) {
        var output = [];
        for (var count = 0; count < numWords; count++) {
            if (count === 0) {
                const x = Math.floor(Math.random() * this.words.length);
                output.push(this.words[x]);
            }
            else {
                const prevWord = output[count - 1];
                const wordChoices = this.chains[prevWord];
                const x = Math.floor(Math.random() * wordChoices.length);
                if (wordChoices[x] === null) {
                    const x = Math.floor(Math.random() * this.words.length);
                    output.push(this.words[x]);
                }
                else {
                    output.push(wordChoices[x]);
                }
            }
        }
        var text = "";
        for (var count = 0; count < output.length; count++) {
            text += output[count] + " ";
        }
        return text;
    }
}

module.exports = {
    MarkovMachine : MarkovMachine
}

// let mm = new MarkovMachine('I could not, would not, on a boat. I will not, will not, with a goat. I will not eat them in the rain. I will not eat them on a train. Not in the dark! Not in a tree! Not in a car! You let me be! I do not like them in a box. I do not like them with a fox. I will not eat them in a house. I do not like them with a mouse. I do not like them here or there. I do not like them anywhere!');
// console.log(mm);
// console.log(mm.makeText(numWords = 50));