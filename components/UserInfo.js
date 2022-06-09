export default class UserInfo {
  constructor({ elementAboutInfo, elementName }) {
    this._elementAboutInfo = document.querySelector(elementAboutInfo);
    this._elementName = document.querySelector(elementName);
  }

  getUserInfo() {
    const name = this._elementName.textContent;
    const description = this._elementAboutInfo.textContent;
    return { name, description };
  }

  setUserInfo(name, description) {
    this._elementName.textContent = name;
    this._elementAboutInfo.textContent = description;
  }
}
