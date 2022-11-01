let blackjacGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#your-blakjack-result', 'div': '#dealer-box', 'score': 0 },
}

const YOU = blackjacGame['you']
const DEALER = blackjacGame['dealer']

const hitSound = new Audio('sounds/cash.mp3')




document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    showCard(DEALER)
}

function showCard(activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.width = 50;
    cardImage.height = 50;
    cardImage.src = 'images/Q.png'
    document.querySelector(activePlayer['div']).appendChild(cardImage); //pasako kur pastatysim sukurta elementa
    hitSound.play();
}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove()
    }
    dealerImages.forEach(images => {
        images.remove()
    });
}