import { cardsUrl, userUrl } from "../utils/constants.js";
export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl + cardsUrl, { headers: this.headers }).then(
      (res) => this._responseHandler(res)
    );
  }

  getUserInfo() {
    return fetch(this.baseUrl + userUrl, { headers: this.headers }).then(
      (res) => this._responseHandler(res)
    );
  }

  updateUserInfo(name, about) {
    return fetch(this.baseUrl + userUrl, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._okResponseHandler(res));
  }

  createCard({ name, link }) {
    return fetch(this.baseUrl + cardsUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._responseHandler(res));
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + cardsUrl + "/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._okResponseHandler(res));
  }

  addLike(cardId) {
    return fetch(this.baseUrl + cardsUrl + "/" + cardId + "/likes", {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this._responseHandler(res));
  }

  removeLike(cardId) {
    return fetch(this.baseUrl + cardsUrl + "/" + cardId + "/likes", {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._responseHandler(res));
  }

  updateAvatar(avatarUrl) {
    return fetch(this.baseUrl + userUrl + "/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((res) => this._responseHandler(res));
  }

  _responseHandler(res) {
    return this._okResponseHandler(res).json();
  }

  _okResponseHandler(res) {
    if (res.ok) {
      return res;
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}
