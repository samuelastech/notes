class Note {
  #text;

  constructor({ text }) {
    this.#text = text;
  }

  get text() {
    return this.#text;
  }

  set text(content) {
    this.#text = content;
  }
}