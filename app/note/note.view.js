class NoteView {
  #element;

  constructor({ element }) {
    this.#element = element;
  }

  update(model) {
    this.#element.innerHTML = this.#template(model);
  }

  #template(model) {
    return model.notes.map((note) => {
      return `
        <div>
          <p>${note.text}</p>
        </div>
      `;
    }).join('');
  }
}