class NoteDAO {
  /** @type {IDBDatabase} */
 #connection;
 #storeName = 'notes';
 #user;

  constructor({ connection, user }) {
    this.#connection = connection;
    this.#user = user;
  }

  async create(note) {
    const request = this.#getStore().add(note);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  }

  async update(key, content) {
    const note = await this.note(key);

    if (note) {
      note.text = content;
      const request = this.#getStore().put(note, key);
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
      });
    };
  }

  async note(key) {
    const cursor = this.#getStore().openCursor();
    return new Promise((resolve, reject) => {
      cursor.onsuccess = (event) => {
        const current = event.target.result;
        if (current) {
          if (current.key === key) {
            resolve(current.value);
          }
          current.continue();
        } else {
          resolve(null);
        }
      };
      cursor.onerror = (event) => reject(event.target.error);
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
            const data = { key: current.key, ...current.value }
            notes.push(data);
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