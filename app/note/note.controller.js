class NoteController {
  #inputNote;
  #noteList;
  #noteView;

  constructor() {
    this.#inputNote = document.querySelector('#note');
    this.#noteList = new NoteList();
    this.#noteView = new NoteView({
      element: document.querySelector('#notesPlace'),
    });
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
    this.#noteView.update(this.#noteList);
  }
}
