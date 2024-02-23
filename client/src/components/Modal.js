class Modal {
  constructor() {
    this._modal = document.querySelector('#modal');
    this._modalBtn = document.querySelector('#modal-btn');
    this.addEventListeners();
  }

  // Add Event Listenters
  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this));
    window.addEventListener('click', this.outsideClick.bind(this));
    // Close modal after listening for custom event we created in IdeaForm.js
    document.addEventListener('closemodal', () => this.close());
  }

  // Open Modal
  open() {
    this._modal.style.display = 'block';
  }

  // Close Modal
  close() {
    this._modal.style.display = 'none';
  }

  // Detect if clicking outside the modal
  outsideClick(e) {
    if(e.target === this._modal) {
      this.close();
    }
  }

}

export default Modal;