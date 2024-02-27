// For this project we used Axios, look into that more and make sure when you install it you are in the client directory
// Bring in Axios
import axios from 'axios';

class IdeasApi {
  constructor() {
    this._apiUrl = '/api/ideas';
  }

  // Get Ideas
  getIdeas() {
    return axios.get(this._apiUrl);
  } 

  // Create Idea
  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }

  // Update Idea
  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }

  // Delete Idea
  deleteIdea(id) {
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username,
      }
    });
  }
}

// you can export AND initialize the class here
export default new IdeasApi();