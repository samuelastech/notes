class AuthController {
  #inputSignIn;
  #userDAO;
  #authView;
  
  constructor() {
    this.#authView = new AuthView({
      element: document.querySelector('#signInPlace'),
    });
    this.#authView.mount();
    this.#inputSignIn = document.querySelector('#signIn');
    this.#userDAO = new UserDAO();
  }

  /**
   * Logs a user in
   * @param {SubmitEvent} event 
   */
  signIn(event) {
    event.preventDefault();
    const user = new User({ name: this.#inputSignIn.value });
    this.#userDAO.add(user);
    this.#authView.unmount(user.name);
    noteController = new NoteController();
  }
}
