export default class Api {
  constructor(config) {
    this.baseUrl= config.baseUrl;
    this.headers = config.headers;
  }

  getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    } else {
      return res.json();
    }
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this.getResponseData);
  }

  getInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this.getResponseData);
  }

  userInfoChange(userName, userAbout) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    })
    .then(this.getResponseData)
  }
}
