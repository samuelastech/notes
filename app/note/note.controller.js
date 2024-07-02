class NoteController {
  #inputNote;
  #noteList;
  #noteView;

  constructor() {
    this.#noteList = new NoteList();
    this.#noteView = new NoteView({
      muralElement: document.querySelector('#notesPlace'),
      formElement: document.querySelector('#notesForm'),
    });
    this.#noteView.mountNoteForm();
    this.#noteView.mountMural(this.#noteList);
    this.#inputNote = document.querySelector('#note');
  }

  /**
   * Creates a note
   * @param {SubmitEvent} event 
   */
  create(event) {
    event.preventDefault();
    const note = new Note({
      text: this.#inputNote.value,
    });
    this.#noteList.create(note);
    this.#noteView.mountMural(this.#noteList);
  }
}
