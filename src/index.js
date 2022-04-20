import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CardHandling from "./js/card-handling";
import { compare } from "./js/card-game";
import { asignNumVal } from "./js/card-game";
// import { returnCards } from "./js/card-game";

let deck = "";
$("#start").click(function () {
  let hand = [];
  let deckPromise = CardHandling.getDeck();
  deckPromise.then(function (response) {
    deck = JSON.parse(response);
    console.log(deck);
    console.log(deckPromise);
    console.log("deck created");
  });
  $("#draw").click(function () {
    (async function () {
      let card = await CardHandling.drawCard(deck.deck_id);
      asignNumVal(card.cards);
      console.log(card.cards[0].value);
      hand.push(card);
      console.log(hand);
      for (let i = 0; i <= 1; i++) {
        console.log(hand[i]);
        $(`#img${i + 1}`).attr("src", hand[i].cards[0].image);
      }
      console.log(hand[0].cards[0].image);
      // $(`#img1`).attr("src", hand[0].cards[0].image);
      // $(`#img2`).attr("src", hand[1].cards[0].image);
      if (hand.length === 2) {
        if (compare(hand[0].cards[0], hand[1].cards[0])) {
          $("#result").html(`<h1>You Win</h1>`);
        } else if (!compare(hand[0].cards[0], hand[1].cards[0])) {
          $("#result").html(`<h1>You Lose</h1>`);
        }
        hand = [];
      }
    })();
  });
});
