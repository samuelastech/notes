class User {
  #name;

  constructor({ name }) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}
