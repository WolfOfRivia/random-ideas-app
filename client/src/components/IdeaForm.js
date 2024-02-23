class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();

    // Create idea object
    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value
    }

    // Clear fields
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    // Dispactch custom event to close modal upon submit
    // On a side note dispatchEvent is very helpful with modular code in vanilla js because it allows components to communicate with each other
    document.dispatchEvent(new Event('closemodal'));

    console.log(idea);
    console.log('Submit');
  }

  render() {
    this._formModal.innerHTML = `
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
    `;
    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }

}

export default IdeaForm;