import { CardHandling } from "./card-handling.js";

export function compare(card1, card2) {
  if (card1.value > card2.value) {
    return true;
  } else {
    return false;
  }
}
export function asignNumVal(card) {
  switch (card.value) {
    case "KING":
      card.value = 13;
      break;
    case "QUEEN":
      card.value = 12;
      break;
    case "JACK":
      card.value = 11;
      break;
    case "ACE":
      card.value = 1;
      break;
  }
  card.value = parseInt(card.value);
  return card;
}

export async function shuffleDeck(card, id) {
  if (card.remaining === 0) {
    await CardHandling.shuffleCards(id);
    console.log("shuffled");
  }
}

export function threeCardScore(hand) {
  let handRank = 0;
  if (
    hand[0].suit === hand[1].suit &&
    hand[1].suit === hand[2].suit &&
    straightCheck(hand)
  ) {
    handRank = 5;
    return handRank;
  } else if (
    hand[0].value === hand[1].value &&
    hand[0].value === hand[2].value
  ) {
    handRank = 4;
    return handRank;
  } else if (straightCheck(hand)) {
    handRank = 3;
    return handRank;
  } else if (hand[0].suit === hand[1].suit && hand[1].suit === hand[2].suit) {
    handRank = 2;
    return handRank;
  } else if (
    hand[0].value === hand[1].value ||
    hand[0].value === hand[2].value ||
    hand[1].value === hand[2].value
  ) {
    handRank = 1;
    return handRank;
  } else {
    handRank = 0;
    return handRank;
  }
}

export function straightCheck(hand) {
  if (
    hand[0].value + 1 === hand[1].value &&
    hand[1].value + 1 === hand[2].value &&
    hand[0].value + 2 === hand[2].value
  ) {
    return true;
  } else {
    return false;
  }
}

export function compareCards(hand1Rank, hand2Rank, hand1, hand2) {
  if (hand1Rank > hand2Rank) {
    return 1;
  } else if (hand2Rank > hand1Rank) {
    return 2;
  } else if (hand1Rank === hand2Rank) {
    if (checkHighCard(hand1) > checkHighCard(hand2)) {
      return 1;
    } else if (checkHighCard(hand2) > checkHighCard(hand1)) {
      return 2;
    } else if (checkHighCard(hand2) === checkHighCard(hand1)) {
      return 3;
    }
  }
}

export function checkHighCard(hand) {
  if (hand[0].value >= hand[1].value && hand[0].value >= hand[2].value) {
    return hand[0].value;
  } else if (hand[1].value >= hand[0].value && hand[1].value >= hand[2].value) {
    return hand[1].value;
  } else if (hand[2].value >= hand[0].value && hand[2].value >= hand[1].value) {
    return hand[2].value;
  } else {
    console.log("high card error");
  }
}
