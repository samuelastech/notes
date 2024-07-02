class AuthView {
  #element;

  constructor({ element }) {
    this.#element = element;
  }

  mount() {
    this.#element.innerHTML = this.#formTemplate();
  }

  unmount(username) {
    this.#element.innerHTML = this.#loggedTemplate(username);
  }

  #loggedTemplate(username) {
    return `
      <p>Logado como <strong>${username}</strong></p>
    `;
  }
  
  #formTemplate() {
    return `
      <form onsubmit="authController.signIn(event)">
        <input id="signIn" type="text" placeholder="Nome" />
        <button>Entrar</button>
      </form>
    `;
  }
}