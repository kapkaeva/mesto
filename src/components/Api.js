import { cardsUrl, userUrl } from "../utils/constants.js";
export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl + cardsUrl, { headers: this.headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    );
  }

  getUserInfo() {
    return fetch(this.baseUrl + userUrl, { headers: this.headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }
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
    });
  }

  createCard({ name, link }) {
    return fetch(this.baseUrl + cardsUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + cardsUrl + "/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  addLike(cardId) {
    return fetch(this.baseUrl + cardsUrl + "/" + cardId + "/likes", {
      method: "PUT",
      headers: this.headers,
    });
  }

  removeLike(cardId) {
    return fetch(this.baseUrl + cardsUrl + "/" + cardId + "/likes", {
      method: "DELETE",
      headers: this.headers,
    });
  }

  updateAvatar(avatarUrl) {
    return fetch(this.baseUrl + userUrl + "/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }
}
