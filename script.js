var counter = 0;
var correct_word = '';
var letters_found = 0;
var words = {};
var keys = [
    'q', 'w', 'e', 'r', 't', 'y', 'u',
    'i', 'o', 'p', 'a', 's', 'd', 'f',
    'g', 'h', 'j', 'k', 'l', 'z', 'x',
    'c', 'v', 'b', 'n', 'm'
];
var lettersFound = 0;

function help() {
    const game = document.querySelector('#game');
    const help = document.querySelector('#help');

    if (help.style.display == 'none') {
        help.style.display = 'block';
        game.style.display = 'none';
        document.querySelector('#checkButton').style.display = 'none';
        document.querySelector('#keys').style.display = 'none';
    } else {
        help.style.display = 'none';
        game.style.display = 'block';
        document.querySelector('#checkButton').style.display = 'block';
        document.querySelector('#keys').style.display = 'block';
    }

    if (document.querySelector('#helpButton').innerHTML == 'How to Play?') {
        document.querySelector('#helpButton').innerHTML = 'Play Now!';
    } else {
        document.querySelector('#helpButton').innerHTML = 'How to Play?';
    }
}

function wordGuessed() {
    console.log(correct_word);
    const word = document.getElementById(counter);
    if (word == null) return;

    const letters = document.getElementsByName(counter);
    for (let i = 0; i < letters.length; i++) {
        if (!/[A-Za-z]/.test(letters[i].value)) {
            for (let i = 0; i < letters.length; i++) letters[i].style.borderColor = 'red';
            document.getElementById(counter).style.animation = 'shake 0.5s';
            setTimeout(function() {
                document.getElementById(counter).style.animation = '';
            }, 500);
            return;
        }
    }

    var guessed_word = '';
    for (let i = 0; i < letters.length; i++) {
        guessed_word += letters[i].value;
    }

    var found = 0;
    for (var w in words) {
        if (words[w] == guessed_word) {
            found = 1;
            break;
        }
    }

    if (!found) {
        for (let i = 0; i < letters.length; i++) letters[i].style.borderColor = 'pink';
        document.getElementById(counter).style.animation = 'shake 0.5s';
        setTimeout(function() {
            document.getElementById(counter).style.animation = '';
        }, 500);
        letters[4].focus();
        return;
    }

    for (let i = 0; i < letters.length; i++) {
        letters[i].disabled = true;
        letters[i].style.borderColor = 'lightgray';
    }


    for (let i = 0; i < 5; i++) {
        letters[i].style.animation = 'pop 0.4s';
        letters[i].style.animationDelay = (0.4 * i) + 's';

        setTimeout(function() {
            if (guessed_word[i] == correct_word[i]) {
                letters[i].style.backgroundColor = 'green';
                document.getElementById(guessed_word[i]).style.backgroundColor = 'green';
                lettersFound += 1;
            } else {
                for (let j = 0; j < 5; j++) {
                    document.getElementById(guessed_word[i]).style.backgroundColor = 'black';
                    if (guessed_word[i] == correct_word[j]) {
                        letters[i].style.backgroundColor = '#C4BA00';
                        document.getElementById(guessed_word[i]).style.backgroundColor = '#C4BA00';
                        break;
                    }
                }
            }
        }, i * 400);
    }

    setTimeout(function() {
        if (lettersFound >= 5) alert("You Won the Game");
        else {
            counter++;
            const nxtWord = document.getElementById(counter);
            if (nxtWord == null) return;
            const nxtLetters = document.getElementsByName(counter);
            for (let i = 0; i < nxtLetters.length; i++) nxtLetters[i].disabled = false;
            const x = document.getElementById(`${counter}0`);
            if (x != null) x.focus();
        }
    }, 2000);
    
}

function startGame() {
    const game = document.querySelector("#game");
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.id = i;
        for (let j = 0; j < 5; j++) {
            const input = document.createElement('input');
            input.maxLength = 1;
            input.className = 'letter-input';
            input.type = 'text';
            input.id = i.toString() + j.toString();
            input.name = i;
            input.style.borderWidth = '1px';
            input.disabled = true;
            input.onkeyup = function(event) {
                if (event.key == 'Backspace') {
                    const x = document.getElementById(`${i.toString() + (j-1)}`);
                    if (x != null) {
                        x.focus();
                        x.value = '';
                        return;
                    }
                } else if (event.key == 'Enter') {
                    wordGuessed();
                } else {
                    const x = document.getElementById(`${i.toString() + (j+1)}`);
                    if (x != null) {
                        if (/[A-Za-z]/.test(this.value)) {
                            this.value = event.key;
                            x.focus();
                        } else {
                            document.getElementById(`${i.toString() + j}`).focus();
                        }
                    }
                }
            }
            row.appendChild(input);
        }
        game.appendChild(row);
    }
    const letters = document.getElementsByName('0');
    for (let i = 0; i < letters.length; i++) letters[i].disabled = false;
    document.getElementById('00').focus();

    const row1 = document.createElement('div');
    row1.style.textAlign = 'center';
    const row2 = document.createElement('div');
    row2.style.textAlign = 'center';
    const row3 = document.createElement('div');
    row3.style.textAlign = 'center';

    for (let i = 0; i < 10; i++) {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.value = keys[i];
        input.disabled = true;
        input.id = keys[i];
        input.style.borderWidth = '1px';
        input.style.margin = '2px';
        input.style.backgroundColor = 'silver';
        input.className = 'letter-input';
        row1.appendChild(input);
    }
    for (let i = 10; i < 19; i++) {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.value = keys[i];
        input.disabled = true;
        input.id = keys[i];
        input.style.borderWidth = '1px';
        input.style.margin = '2px';
        input.style.backgroundColor = 'silver';
        input.className = 'letter-input';
        row2.appendChild(input);
    }
    for (let i = 19; i < 26; i++) {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.value = keys[i];
        input.disabled = true;
        input.id = keys[i];
        input.style.borderWidth = '1px';
        input.style.margin = '2px';
        input.style.backgroundColor = 'silver';
        input.className = 'letter-input';
        row3.appendChild(input);
    }
    document.querySelector('#keys').appendChild(row1);
    document.querySelector('#keys').appendChild(row2);
    document.querySelector('#keys').appendChild(row3);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('help').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    fetch('https://raw.githubusercontent.com/Nujra40/wordle/main/words.json')
        .catch(error => {
            document.write(`Failed to fetch words from server, make sure computer is connected to internet: Error-- ${error}`);
        })
        .then(response => response.json())
        .then(data => {
            correct_word = data[Math.floor(Math.random() * 2498).toString()];
            words = data;
            startGame();
        });
});