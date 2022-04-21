import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { CardHandling } from "./js/card-handling";
import { compare, shuffleDeck } from "./js/card-game";
import { asignNumVal } from "./js/card-game";
import { threeCardScore } from "./js/card-game.js";
import { compareCards } from "./js/card-game.js";

let deck = "";
let hand = [];

async function draw(id, hand, count) {
  let card = await CardHandling.drawCard(id, count);
  for (let i = 0; i < card.cards.length; i++) {
    asignNumVal(card.cards[i]);
  }
  console.log(hand);
  hand.push(card);
  return card;
}

function showImg(hand, card) {
  console.log(card.remaining);
  if (card.remaining % 2) {
    $(`#img1`).attr("src", hand[0].cards[0].image);
    $(`#img2`).attr("src", "");
  } else {
    $(`#img2`).attr("src", hand[1].cards[0].image);
  }
}
function show3CardImg(hand1, hand2) {
  $(`#img1`).attr("src", hand1[0].cards[0].image);
  $(`#img2`).attr("src", hand1[0].cards[1].image);
  $(`#img3`).attr("src", hand1[0].cards[2].image);
  $(`#img4`).attr("src", hand2[0].cards[0].image);
  $(`#img5`).attr("src", hand2[0].cards[1].image);
  $(`#img6`).attr("src", hand2[0].cards[2].image);
}

function winMessage(choice, hand) {
  if (choice === "low-card") {
    if (compare(hand[0].cards[0], hand[1].cards[0])) {
      $("#result").html(`<h1>You Win</h1>`);
    } else {
      $("#result").html(`<h1>You Lose</h1>`);
    }
  } else {
    if (compare(hand[0].cards[0], hand[1].cards[0])) {
      $("#result").html(`<h1>You Lose</h1>`);
    } else {
      $("#result").html(`<h1>You Win</h1>`);
    }
  }
}
$("#select-game").on("click", function () {
  $("#start-high-card-low-card").show();
  $("#start-3-card-poker").show();
  $(".high-low").hide();
  $("#draw").hide();
  $("#deal").hide();
  $("#player1-name").hide();
  $("#player2-name").hide();
  $("#select-game").hide();
  $("img").attr("src", "");
  $("#remaining").html("");
  $("#result").html("");
});
$("#start-high-card-low-card").on("click", async function () {
  hand = [];
  $("#start-high-card-low-card").hide();
  $("#start-3-card-poker").hide();
  $("#select-game").show();
  $(".high-low").show();
  if (deck === "") {
    let deckPromise = CardHandling.getDeck();
    deckPromise.then(async function (response) {
      deck = JSON.parse(response);
      console.log("deck created");
      await draw(deck.deck_id, hand, 1);
      $(`#img1`).attr("src", hand[0].cards[0].image);
      $("#remaining").html(`<h2>Cards remaining: ${hand[0].remaining}</h2>`);
    });
  } else {
    (async function () {
      await CardHandling.shuffleCards(deck.deck_id);
      await draw(deck.deck_id, hand, 1);
      $(`#img1`).attr("src", hand[0].cards[0].image);
      $("#remaining").html(`<h2>Cards remaining: ${hand[0].remaining}</h2>`);
    })();
  }
});
$(".high-low").on("click", function () {
  let choice = this.id;
  (async function () {
    let card = await draw(deck.deck_id, hand, 1);
    console.log(hand);
    showImg(hand, card);
    if (hand.length >= 2) {
      winMessage(choice, hand);
      $("#draw").show();
      hand = [];
      $("#high-card").hide();
      $("#low-card").hide();
      await shuffleDeck(card, deck.deck_id);
      $("#remaining").html(`<h2>Cards remaining: ${card.remaining}</h2>`);
    }
  })();
});
$("#draw").on("click", async function () {
  $("#draw").prop("disabled", true);
  let card = await draw(deck.deck_id, hand, 1);
  showImg(hand, card);
  $("#draw").hide();
  $("#high-card").show();
  $("#low-card").show();
  $("#draw").prop("disabled", false);
  $("#remaining").html(`<h2>Cards remaining: ${card.remaining}</h2>`);
});
$("#start-3-card-poker").on("click", async function () {
  $("#select-game").show();
  $("#start-high-card-low-card").hide();
  $("#start-3-card-poker").hide();
  $("#deal").show();
  let deckPromise = CardHandling.getDeck();
  deckPromise.then(async function (response) {
    deck = JSON.parse(response);
    console.log("deck created");
  });
});
$("#deal").on("click", async function () {
  await CardHandling.shuffleCards(deck.deck_id);
  let hand1 = [];
  let hand2 = [];
  await draw(deck.deck_id, hand1, 3);
  await draw(deck.deck_id, hand2, 3);
  show3CardImg(hand1, hand2);
  $("#player1-name").html("<h4>Player 1</h4>");
  $("#player2-name").html("<h4>Player 2</h4>");
  $("#player1-name").show();
  $("#player2-name").show();
  let hand1Rank = threeCardScore(hand1[0].cards);
  let hand2Rank = threeCardScore(hand2[0].cards);
  console.log("hand1Rank:" + hand1Rank);
  console.log("hand2Rank:" + hand2Rank);
  let winner = compareCards(
    hand1Rank,
    hand2Rank,
    hand1[0].cards,
    hand2[0].cards
  );
  if (winner === 1) {
    $("#result").html(`<h1>Player 1 Wins</h1>`);
  } else if (winner === 2) {
    $("#result").html(`<h1>Player 2 Wins</h1>`);
  } else {
    $("#result").html(`<h1>Tie Game</h1>`);
  }
});
