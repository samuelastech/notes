class NoteList {
  #notes = [];

  create(note) {
    this.#notes.push(note);
  }

  get notes() {
    return [].concat(this.#notes);
  }
}