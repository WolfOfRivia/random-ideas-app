// For this project we used Axios, look into that more and make sure when you install it you are in the client directory
// Bring in Axios
import axios from 'axios';

class IdeasApi {
  constructor() {
    this._apiUrl = 'http://localhost:5000/api/ideas';
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  } 

  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }
}

// you can export AND initialize the class here
export default new IdeasApi();