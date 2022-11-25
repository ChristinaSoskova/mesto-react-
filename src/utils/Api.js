
class Api {
  #onResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({ message: "Ошибка", res });
  }

  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers }).then(
      (res) => {
        return this.#onResponce(res);
      }
    );
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers }).then(
      (res) => {
        return this.#onResponce(res);
      }
    );
  }

  getEditUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.fullname,
        about: data.profession,
      }),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  getAddCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  removeCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  toggleLike(id, isLike) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => {
      return this.#onResponce(res);
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    authorization: "b75081c3-63ae-4231-8d9c-4e1ac7e43aad",
    "Content-Type": "application/json",
  },
});


export default api;
