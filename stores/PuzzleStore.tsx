import { captureRejectionSymbol } from "events"
import words from "../words.json"

export default {
    word : '',
    guesses: [],
    currentGuess: 0,

    get won() {
        return this.guesses[this.currentGuess - 1] === this.word
    },
    get lost(){
        return this.currentGuess === 6
    },
    init() {
        this.word = words[Math.round(Math.random() * words.length)]
        this.guesses.replace(new Array(6).fill(''))
        this.currentGuess = 0
    },
    submitGuess() {
        if(words.includes(this.guesses[this.currentGuess])) {
            this.currentGuess += 1
        }
    },
    handleKeyup(e) {
        if(this.won || this.lost){
            return 
        }

        if(e.key === 'Enter') {
            return this.submitGuess()
        }
        if(e.key === 'Backspace') {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, this.guesses[this.currentGuess].length - 1)
            return
        }
        if(this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess] + e.key.toLowerCase()
        }
    }
}