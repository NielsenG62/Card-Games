// import CardHandling from "./card-handling.js";

export function compare(card1, card2) {
  if (card1.value > card2.value) {
    return true;
  } else {
    return false;
  }
}
export function asignNumVal(card) {
  switch (card[0].value) {
    case "KING":
      card[0].value = 13;
      break;
    case "QUEEN":
      card[0].value = 12;
      break;
    case "JACK":
      card[0].value = 11;
      break;
    case "ACE":
      card[0].value = 1;
      break;
  }
  card[0].value = parseInt(card[0].value);
  return card;
}
