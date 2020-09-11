/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeword_Map();
  }

  /** set markov word_Map:
   *
   *  for text of "the cat in the hat", word_Map will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeword_Map() {
    let word_Map = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let base_Word = this.words[i];
      let next_Word = this.workds[i + 1] || null;

      if (word_Map.has(base_Word)) word_Map.get(base_Word).push(next_Word);
      else word_Map.set(base_Word, [next_Word]);
    }
    this.word_Map = word_Map;
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.word_Map.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.word_Map.get(key));
    }

    return out.join(" ");
  }

}
module.exports = {
  MarkovMachine,
};