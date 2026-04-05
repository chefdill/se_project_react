import { baseUrl } from "./constants";

class Api {
  constructor({ headers }) {
    // constructor body
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error ${res.status}`);
  }

  getCards() {
    return fetch(baseUrl + "/items", {
      method: "GET",
    }).then(this._checkResponse);
  }

  addItem({ name, link, weather }) {
    const token = localStorage.getItem("jwt");
    return fetch(baseUrl + "/items/", {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        imageUrl: link,
        weather,
      }),
    }).then(this._checkResponse);
  }

  deleteItem(id, token) {
    return fetch(baseUrl + "/items/" + id, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }



  addCardLike(id, token) {
    return fetch(baseUrl + "/items/" + id + "/likes", {
      method: "PUT",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  removeCardLike(id, token) {
    return fetch(baseUrl + "/items/" + id + "/likes", {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  editUser(token, name, avatar) {
    return fetch(baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        avatar,
      }),
    }).then(this._checkResponse);
  }
}

export default Api;
