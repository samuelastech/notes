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
    this.#muralTemplate(model).then((element) => this.#muralElement.innerHTML = element);
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
    return model.notes.then((notes) => {
      return notes.length
        ? notes.map((note) => {
            return `
              <div contenteditable="true" onblur="noteController.update(event)" data-id="${note.key}">
                <p>${note.text}</p>
              </div>
            `
        }).join('')
        : `
          <div></div>
        `;
    });
  }
}