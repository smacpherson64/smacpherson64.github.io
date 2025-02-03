class AbortablePromise extends Promise {
  #controller;
  #aborted = false;

  constructor(executor) {
    const controller = new AbortController();

    super((resolve, reject) => {
      Promise.race([
        new Promise(executor),
        new Promise((_, reject) =>
          controller.signal.addEventListener("abort", reject)
        ),
      ])
        .then(resolve)
        .catch(reject);
    });

    this.#controller = controller;
  }

  get aborted() {
    return this.#aborted;
  }

  abort() {
    this.#controller.abort();
    this.#aborted = true;
    return this;
  }
}

const abortable = new AbortablePromise(() => {});
console.log(abortable);
abortable.abort().then(console.log).catch(console.warn);
console.log(abortable);
