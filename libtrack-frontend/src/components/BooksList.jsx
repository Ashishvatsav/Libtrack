import { useState, useEffect } from 'react';
import { BookOpen, AlertCircle, Loader } from 'lucide-react';
import { booksAPI } from '../services/api';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', author: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await booksAPI.getAllBooks();
      setBooks(response.data);
      const availResponse = await booksAPI.getAvailableBooks();
      setAvailableBooks(availResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Make sure the backend is running on http://localhost:8080');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await booksAPI.addBook({ ...formData, availability: true });
      setFormData({ title: '', author: '' });
      setShowForm(false);
      fetchBooks();
    } catch (err) {
      setError('Failed to add book');
    }
  };

  const handleSearch = async (field) => {
    if (!searchTerm.trim()) {
      fetchBooks();
      return;
    }
    setLoading(true);
    try {
      const response = field === 'title'
        ? await booksAPI.searchByTitle(searchTerm)
        : await booksAPI.searchByAuthor(searchTerm);
      setBooks(response.data);
      // When searching, we should calculate availability from the filtered list
      // instead of separate API calls to avoid inconsistent counts
      const filteredAvailable = response.data.filter(b => b.availability);
      setAvailableBooks(filteredAvailable);
      setError(null);
    } catch (err) {
      setError(`Failed to search by ${field}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && books.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Books Management</h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Books</p>
          <p className="text-3xl font-bold text-blue-600">{books.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Available</p>
          <p className="text-3xl font-bold text-green-600">{availableBooks.length}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Unavailable</p>
          <p className="text-3xl font-bold text-orange-600">{books.length - availableBooks.length}</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={() => handleSearch('title')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search Title
          </button>
          <button
            onClick={() => handleSearch('author')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search Author
          </button>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition self-start"
        >
          {showForm ? 'Cancel' : 'Add New Book'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddBook} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Book Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Add Book
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Author</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-900">{book.bookId}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{book.title}</td>
                <td className="px-4 py-3 text-gray-600">{book.author}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      book.availability
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {book.availability ? 'Available' : 'Unavailable'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {books.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No books found. Add your first book!</p>
        </div>
      )}
    </div>
  );
}

export default BooksList;
