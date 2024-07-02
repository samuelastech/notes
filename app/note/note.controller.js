class NoteController {
  #inputNote;
  #noteDAO;
  #userDAO;
  #noteView;

  constructor() {
    ConnectionFactory.getConnection()
      .then((connection) => this.#init(connection));
  }

  #init(connection) {
    this.#userDAO = new UserDAO();

    this.#noteDAO = new NoteDAO({
      connection,
      user: this.#userDAO.findOne(),
    });
    this.#noteView = new NoteView({
      muralElement: document.querySelector('#notesPlace'),
      formElement: document.querySelector('#notesForm'),
    });
    this.#noteView.mountNoteForm();
    this.#noteView.mountMural(this.#noteDAO);
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
      createdBy: this.#userDAO.findOne(),
    });
    this.#noteDAO.create(note.parse).then(() => {
      this.#noteView.mountMural(this.#noteDAO);
    });
  }
}
