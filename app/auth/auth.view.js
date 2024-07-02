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
      <div>
        <p>Logado como <strong>${username}</strong></p>
        <button onclick="authController.signOut()">Sair</button>
      </div>
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