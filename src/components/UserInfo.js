export default class UserInfo {
  constructor({ elementAboutInfo, elementName, elementImage }) {
    this._elementAboutInfo = document.querySelector(elementAboutInfo);
    this._elementName = document.querySelector(elementName);
    this._elementImage = document.querySelector(elementImage);
  }

  getUserInfo() {
    const name = this._elementName.textContent;
    const description = this._elementAboutInfo.textContent;
    const avatar = this._elementImage.style.backgroundImage;
    return { name, description, avatar };
  }

  setUserInfo({ _id, name, about, avatar }) {
    if (_id) this._id = _id;
    if (name) this._elementName.textContent = name;
    if (about) this._elementAboutInfo.textContent = about;
    if (avatar) this.setAvatar(avatar);
  }

  setAvatar(avatarUrl) {
    this._elementImage.style.background = "url(" + avatarUrl + ") round";
  }

  getUserId() {
    return this._id;
  }
}
