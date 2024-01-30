const { MarkovMachine } = require("./markov");

describe("Markov Machine Object Creation", function () {
    test('word list creation', function () {
        let machine = new MarkovMachine('the cat in the hat is in the hat');
        expect(machine.words).toEqual(['the', 'cat', 'in', 'the', 'hat', 'is', 'in',  'the', 'hat']);
    });

    test('chain object creation', function () {
        let machine = new MarkovMachine('the cat in the hat is in the hat');
        expect(machine.chains).toEqual({"cat": ["in"], "hat": ["is", null], "in": ["the", "the"], "is": ["in"], "the": ["cat", "hat", "hat"]});
    });
});

describe("Markov Machine Text Generator", function () {
    test('test output text length', function () {
        let machine = new MarkovMachine('the cat in the hat is in the hat');
        let text = machine.makeText(numWords = 10);
        let words = text.split(/[ \r\n]+/).filter(c => c !== "");
        expect(words.length).toEqual(10);
    });

    test('test output text follows machine chain', function () {
        let machine = new MarkovMachine('the cat in the hat is in the hat');
        let text = machine.makeText(numWords = 10);
        let words = text.split(/[ \r\n]+/).filter(c => c !== "");
        console.log(machine);
        console.log(words);
        for(var i = 0; i < words.length - 1; i++) {
            if (machine.chains[words[i]].includes(null)) {
                expect(machine.words).toContain(words[i + 1]);
            }
            else {
                expect(machine.chains[words[i]]).toContain(words[i + 1]);
            }
        }
    })
});
