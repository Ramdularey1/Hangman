const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".gausses-text b");

const gameModal = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".pay-again");




let currentWord,wrongGuessesCount;
const maxGuesses = 6;
let correctLetters;

//Resetting all the game variable and ui element
const resetGame = ()=>{
    correctLetters = [];
    wrongGuessesCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessesCount}.svg`
    guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}
//Slecting a random word and hint from text
const getRandomWord = ()=>{
    const {word, hint} = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    console.log(word)
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    
}


const gameOver = (isVictory)=>{
    setTimeout(()=>{
        const modalText = isVictory ? `You found the word` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;

        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}<b/>`;
       

    gameModal.classList.add("show");
    },300)
}

const initGame = (button, clickLetter)=>{
    // check if letter exist in word or not
    if(currentWord.includes(clickLetter)){
       [...currentWord].forEach((letter, index)=>{
        if(letter === clickLetter){
            correctLetters.push(letter)
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
       })
    }else{
        wrongGuessesCount++;
        hangmanImage.src = `images/hangman-${wrongGuessesCount}.svg`
        console.log(wrongGuessesCount)
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`


    //Calling gameOver function if any one of two condition meet
    if(wrongGuessesCount === maxGuesses) return gameOver(false);

    if(correctLetters.length === currentWord.length) return gameOver(true);

    
}


//Creating keyboard button and adding event listener
for(let i = 97 ; i<122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",(e)=>{
        return initGame(e.target,String.fromCharCode(i));
    })
}


getRandomWord()
playAgainBtn.addEventListener("click",getRandomWord)
