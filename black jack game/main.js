let blackjacGame = {
    you: {
        scoreSpan: '#your-blackjack-result',
        div: '#your-box',
        score: 0
    },
    dealer: {
        scoreSpan: '#your-blakjack-result',
        div: '#dealer-box',
        score: 0
    },

    cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    cardsMap: { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11] }
}

const YOU = blackjacGame['you']
const DEALER = blackjacGame['dealer']

const hitSound = new Audio('sounds/cash.mp3')




document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

function blackjackHit() {
    let card = randomCard();
    console.log(card)
    showCard(card, YOU)
    updateScore(card, YOU);
    console.log(YOU['score']);
    showScore(YOU)

}


function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjacGame['cards'][randomIndex];

}



function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.width = 50;
        cardImage.height = 50;
        cardImage.src = `images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage); //pasako kur pastatysim sukurta elementa
        // hitSound.play();
    }
}

function blackjackDeal() {
    showResult(computeWinner())
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove()
    }
    for (let i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove()
    }
    // dealerImages.forEach(images => {
    //     images.remove()
    // })
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        // if adding 11 keeps me below 21,and 11. Ohterwise, add 1
        if (activePlayer['score'] + blackjacGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjacGame['cardsMap'][card][1]
        } else {
            activePlayer['score'] += blackjacGame['cardsMap'][card][0]
        }

    } else {
        activePlayer['score'] += blackjacGame['cardsMap'][card]
    }
}

function showScore(activePlayer) {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}


function dealerLogic() {
    // let card = randomCard();
    // showCard(card, DEALER);
    // updateScore(card, DEALER);
    // showScore(DEALER);
    let card = randomCard();

    showCard(card, DEALER)
    updateScore(card, DEALER);

    showScore(DEALER)



}


//Who wins and return who just won

function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            winner = YOU;
            console.log('You won')
        } else if (YOU['score'] < DEALER['score']) {
            console.log('You lost');
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            console.log('You draw');

        }


    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        console.log('You lost');
        winner = DEALER;

    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        console.log('draw')
    }
    return winner;


    function showResult(winner) {
        let message, messageColor;
        if (winner === YOU) {
            message = 'You won'
            messageColor = 'green'
        } else if (winner === DEALER) {
            message = 'You lost'
            messageColor = 'red'
        } else {
            message = 'You draw'
            messageColor = 'black'
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').textContent = messageColor;
    }
}
