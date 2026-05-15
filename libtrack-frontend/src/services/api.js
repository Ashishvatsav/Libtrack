import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Books API
export const booksAPI = {
  getAllBooks: () => api.get('/books'),
  getAvailableBooks: () => api.get('/books/available'),
  searchByTitle: (title) => api.get(`/books/search/title?title=${title}`),
  searchByAuthor: (author) => api.get(`/books/search/author?author=${author}`),
  addBook: (book) => api.post('/books', book),
};

// Members API
export const membersAPI = {
  getAllMembers: () => api.get('/members'),
  addMember: (member) => api.post('/members', member),
  getMember: (id) => api.get(`/members/${id}`),
};

// Issues API
export const issuesAPI = {
  getAllIssues: () => api.get('/issues'),
  issueBook: (issueRequest) => api.post('/issues/issue', issueRequest),
  returnBook: (issueId) => api.put(`/issues/return/${issueId}`),
  getIssuedBooks: (memberId) => api.get(`/members/${memberId}/books`),
};

export default api;
