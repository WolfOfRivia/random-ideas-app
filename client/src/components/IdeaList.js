// Bring in ideas api
import IdeasApi from "../services/ideasApi";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeas(); // do not confuse this getIdeas method, it's the one from THIS IdeaList class, NOT from the IdeasApi
    
    // Set valid tags and add them to the set
    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions'); 
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if(e.target.classList.contains('fa-times')) {
        // We ONLY want the function to happen if we clicked the times icon
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
        console.log(ideaId);
      }
    })
  }
  
  // Get Ideas 
  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
      console.log(this._ideas);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    // Delete From Server
    try {
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId); // Will filter out all the ideas EXCEPT the one we are deleting
      this.getIdeas();
    } catch (error) {
      alert('You cannot delete this resource');
    }
  }

  // Add Idea to the list
  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  // Create Tag class
  getTagClass(tag) {
    tag = tag.toLowerCase(); 
    let tagClass = '';
    if(this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas.map((idea) => {
      const tagClass = this.getTagClass(idea.tag);
      // Display delete button for the ONLY the user's ideas
      const deleteBtn = idea.username === localStorage.getItem('username') ? `<button class="delete"><i class="fas fa-times"></i></button>` : '';
      return `
        <div class="card" data-id="${idea._id}">
          ${deleteBtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `;
    }).join('');
    this.addEventListeners();
  }
}

export default IdeaList;