class Note {
  #text;
  #createdBy;

  constructor({ text, createdBy }) {
    this.#text = text;
    this.#createdBy = createdBy;
  }

  get text() {
    return this.#text;
  }

  set text(content) {
    this.#text = content;
  }

  get parse() {
    return {
      text: this.#text,
      createdBy: this.#createdBy,
    };
  }
}