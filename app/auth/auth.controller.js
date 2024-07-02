class AuthController {
  #inputSignIn;
  #userDAO;
  #authView;
  
  constructor() {
    this.#authView = new AuthView({
      element: document.querySelector('#signInPlace'),
    });
    this.#userDAO = new UserDAO();
    const isLoggedIn = this.#userDAO.hasUser();

    if (isLoggedIn) {
      const userName = this.#userDAO.findOne();
      this.#goToNotes(userName);
    } else {
      this.#authView.mount();
      this.#inputSignIn = document.querySelector('#signIn');
    }
  }

  /**
   * Logs a user in
   * @param {SubmitEvent} event 
   */
  signIn(event) {
    event.preventDefault();
    const user = new User({ name: this.#inputSignIn.value });
    this.#userDAO.add(user);
    this.#goToNotes(user.name);
  }

  #goToNotes(userName) {
    this.#authView.unmount(userName);
    noteController = new NoteController();
  }
}
