class NoteDAO {
  /** @type {IDBDatabase} */
 #connection;
 #storeName = 'notes';
 #user;

  constructor({ connection, user }) {
    this.#connection = connection;
    this.#user = user;
  }

  create(note) {
    const request = this.#getStore().add(note);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  }

  get notes() {
    const cursor = this.#getStore().openCursor();
    const notes = [];

    return new Promise((resolve, reject) => {
      cursor.onsuccess = (event) => {
        const current = event.target.result;
        if(current) {
          if(current.value.createdBy === this.#user) {
            notes.push(current.value)
          }
          current.continue();
        } else {
          resolve(notes);
        }
      };

      cursor.onerror = (event) => reject(event.target.error);
    });
  }

  #getStore(operationType = 'readwrite') {
    return this.#connection
      .transaction([this.#storeName], operationType)
      .objectStore(this.#storeName);
  }
}