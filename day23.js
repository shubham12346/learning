// There are several cards arranged in a row, and each card has an
// associated number of points. The points are given in the integer
//  array cardPoints. In one step, you can take one card from the
// beginning or from the end of the row. You have to take exactly
// k cards. Your score is the sum of the points of the cards you
// have taken. Given the integer array cardPoints and the integer
//  k, return the maximum score you can obtain.

let cardPoints = [1, 2, 3, 4, 5, 6, 1];
let cardPick = 3;

function findMaxCard(cards, cardpick) {
  let windoSum = 0;
  let maxSum = 0;

  for (let i = 0; i < cardPick; i++) {
    windoSum += cards[i];
  }

  maxSum = windoSum;
  for (let i = cardPick; i < cards.length; i++) {
    windoSum += cards[i] - cards[i - cardPick];
    maxSum = Math.max(maxSum, windoSum);
  }

  return maxSum;
}

console.log("Find max Card ", findMaxCard(cardPoints, cardPick));
