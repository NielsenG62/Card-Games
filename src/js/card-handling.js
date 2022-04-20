export default class CardHandling {
  constructor(id) {
    this.id = id;
  }
  static getDeck() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  static async drawCard(id) {
    try {
      const response = await fetch(
        `http://deckofcardsapi.com/api/deck/${id}/draw/?count=1`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }

  static async returnCards(id) {
    try {
      const response = await fetch(
        `http://deckofcardsapi.com/api/deck/${id}/return`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }
}
