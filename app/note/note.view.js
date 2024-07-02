class NoteView {
  #muralElement;
  #formElement;

  constructor({ muralElement, formElement }) {
    this.#muralElement = muralElement;
    this.#formElement = formElement;
  }

  mountNoteForm() {
    this.#formElement.innerHTML = this.#noteFormTemplate();
  }

  mountMural(model) {
    this.#muralElement.innerHTML = this.#muralTemplate(model);
  }

  #noteFormTemplate() {
    return `
      <form onsubmit="noteController.create(event)">
        <input id="note" type="text" placeholder="Digite seu texto aqui" />
        <button>Salvar</button>
      </form>
    `;
  }

  #muralTemplate(model) {
    return model.notes.map((note) => {
      return `
        <div>
          <p>${note.text}</p>
        </div>
      `;
    }).join('');
  }
}