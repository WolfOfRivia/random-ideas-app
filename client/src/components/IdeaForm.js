import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Form Validation
    if(!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.username.value) {
      alert('Please enter all fields');
      return;
    } 

    // Save user to local storage
    localStorage.setItem('username', this._form.elements.username.value);

    // Create idea object
    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value
    }

    // Add idea server
    const newIdea = await IdeasApi.createIdea(idea);
    // Add idea to DOM
    this._ideaList.addIdeaToList(newIdea.data.data);

    // Clear fields
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    // Render the form again after clearing fields (This is so the username shows from local storage, we still need to display it though which we did on line 59)
    this.render();

    // Dispactch custom event to close modal upon submit
    // On a side note dispatchEvent is very helpful with modular code in vanilla js because it allows components to communicate with each other
    document.dispatchEvent(new Event('closemodal'));

    // console.log(idea);
    // console.log('Submit');
  }

  render() {
    this._formModal.innerHTML = `
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}"/>
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