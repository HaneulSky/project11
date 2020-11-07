export default class UserInfo {
  constructor(userName, userJob, avatar) {
    this.userName = userName;
    this.userJob = userJob;
  }
  updateUserInfo() {
    this.userName.textContent = this.name;
    this.userJob.textContent = this.about;
  }

  setUserInfo(name, about, updateAvatar) {
    this.name = name;
    this.about = about;
  }
}
