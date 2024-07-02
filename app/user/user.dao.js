class UserDAO {
  add(user) {
    localStorage.setItem('userName', user.name);
  }

  hasUser() {
    return localStorage.getItem('userName') ? true : false;
  }

  findOne() {
    return localStorage.getItem('userName');
  }
}