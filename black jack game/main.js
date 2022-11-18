let blackjackGame = {
    //1.sukuriam objekta su  mano id atskirai you and dealer
    you: {
        scoreSpan: "#your-blackjack-result",
        div: "#your-box",
        score: 0,
    },
    dealer: {
        scoreSpan: "#dealer-blackjack-result",
        div: "#dealer-box",
        score: 0,
    },
    cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
    cardsMap: {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        K: 10,
        Q: 10,
        J: 10,
        A: [1, 11],
    },
};
//2.sukuriam vaeriable kd veliau pasiekti lengviau butu
//you and dealer objektus
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const lostSound = new Audio("sounds/aww.mp3");

//kkkj
//HIT BUTTON
document
    .querySelector("#blackjack-hit-button")
    .addEventListener("click", () => {
        blackjackHit();
    });
// STAND BUTTON
document
    .querySelector("#blackjack-stand-button")
    .addEventListener("click", dealerLogic);

// DEAL BUTTON

document
    .querySelector("#blackjack-deal-button")
    .addEventListener("click", blackjackDeal);

function blackjackHit() {
    let card = randomCard();
    ShowCard(card, YOU);
    updateScore(card, YOU);
    console.log(YOU["score"]);
    showScore(YOU);
}
//i blackjackHit function per daug visko sukuriam atskira funkcija
// ShowCard function ir showCard pridedam to blackjackHit
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame["cards"][randomIndex];
}

function ShowCard(card, activePlayer) {
    // 3. sukuriam kad paspaudus korta pasirodytu musu box
    //if bust need textcontent Bust
    if (activePlayer["score"] <= 21) {
        let cardImage = document.createElement("img");
        cardImage.src = `images/${card}.png`;
        // 5.kad isidetu nuptrauka butent i you
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        cardImage.width = 80;
        cardImage.height = 110;
    }
}

function blackjackDeal() {
    computeWinner();
    let yourImages = document.querySelector("#your-box").querySelectorAll("img");
    let dealerImages = document
        .querySelector("#dealer-box")
        .querySelectorAll("img");

    yourImages.forEach((images) => {
        images.remove();
    });
    // for (i = 0; i < yourImages.length; i++) {
    //     yourImages[i].remove()

    for (i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }
    //after deal button should set score for both = 0 count++ from 0 bt not what befpor
    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    // dealerImages.forEach(images => {
    //     images[i].remove()
    // });

    // CURRENT SCORE /
    // TO TELL EACH CARD WHAT IS THE VALUE NEED TO MAP carsMap
}
// if adding 11 keeps me below 21, and 11 .owerwise add 1

function updateScore(card, activePlayer) {
    if (card === "A") {
        //'A'[1,11] by index 0 and 1
        // jai gausim 'A' ir prie kortu pridesim [1] tai yra 11 bus maziau ar lygu 21 tada
        // taip ir darom o jao ne daugiau nei 21 priedeam [0]  tai yra 1
        if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
            activePlayer["score"] += blackjackGame["cardsMap"][card][1];
            //if score 0 pridedam random(card) ir tas skaiciu yra 'A' ir jai pridejus 11
            //maziau ar lygu su 21 tada prideadam bet jai daugiau adinam 1

            // updateScore -- parodyt skaiciu koks bus kortas sudejas after scorespan
            //activePlayer['score'] dabar= 0;panaudojus funkcija pridedam
            // koki random dave,tarkim 'J' tada per 'cardsMap' perduoda
            //koks skaicius lygus mapsuose = 10 ir kiekviena kart +;= score 10
            // console.log(activePlayer["score"]);
        } else if (activePlayer["score"] + blackjackGame["cardsMap"][card][0]) {
            activePlayer["score"] += blackjackGame["cardsMap"][card][0];
        }
    } else {
        activePlayer["score"] += blackjackGame["cardsMap"][card];
    }
}

function showScore(activePlayer) {
    //jai > 21 buste ir red color
    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "BUSTED";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    } else {
        document.querySelector(activePlayer["scoreSpan"]).textContent =
            activePlayer["score"];
    }
}

function dealerLogic() {
    let card = randomCard();
    ShowCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
}
// COMPUTE WINNER AND RETURN WHO JUST WON
function computeWinner() {
    let winner;
    if (YOU["score"] <= 21) {
        // CONDITION:HIGHER THAN DEALER OR WHEN DEALER BUSTS BUT YOU'RE 21 OR UNDER
        if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
            console.log("YOU win");
            winner = YOU;
        } else if (YOU["score"] < DEALER["score"]) {
            console.log("YOU lost");
            winner = DEALER;
        } else if (YOU["score"] === DEALER["score"]) {
            console.log("BOTH Draw");
        }
        //CONDITION: WHEN USER BUSTS BUT DEALER DOESN'T
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
        console.log("YOu lost");
        winner = DEALER;

        // CONDITION: WHEN YOU AND THE DEALER BUSTS
    } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
        console.log("YOu drew");
    }
    console.log("winner is", winner);
    return winner;
}
