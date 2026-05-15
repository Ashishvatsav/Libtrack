import { useState, useEffect } from 'react';
import { FileText, AlertCircle, Loader, CheckCircle } from 'lucide-react';
import { issuesAPI, booksAPI, membersAPI } from '../services/api';

function IssuesList() {
  const [issues, setIssues] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [issueFormData, setIssueFormData] = useState({ bookId: '', memberId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [issuesRes, booksRes, membersRes] = await Promise.all([
        issuesAPI.getAllIssues(),
        booksAPI.getAllBooks(),
        membersAPI.getAllMembers(),
      ]);
      setIssues(issuesRes.data);
      setBooks(booksRes.data);
      setMembers(membersRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    if (!issueFormData.bookId || !issueFormData.memberId) {
      setError('Please select both book and member');
      return;
    }
    try {
      await issuesAPI.issueBook({
        bookId: parseInt(issueFormData.bookId),
        memberId: parseInt(issueFormData.memberId),
      });
      setIssueFormData({ bookId: '', memberId: '' });
      setShowIssueForm(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue book');
    }
  };

  const handleReturnBook = async (issueId) => {
    try {
      await issuesAPI.returnBook(issueId);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to return book');
    }
  };

  if (loading && issues.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const activeIssues = issues.filter((issue) => !issue.returnDate);
  const returnedIssues = issues.filter((issue) => issue.returnDate);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Issues Management</h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Issues</p>
          <p className="text-3xl font-bold text-blue-600">{issues.length}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Active Issues</p>
          <p className="text-3xl font-bold text-orange-600">{activeIssues.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Returned</p>
          <p className="text-3xl font-bold text-green-600">{returnedIssues.length}</p>
        </div>
      </div>

      <button
        onClick={() => setShowIssueForm(!showIssueForm)}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {showIssueForm ? 'Cancel' : 'Issue New Book'}
      </button>

      {showIssueForm && (
        <form onSubmit={handleIssueBook} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={issueFormData.bookId}
              onChange={(e) => setIssueFormData({ ...issueFormData, bookId: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Book</option>
              {books
                .filter((b) => b.availability)
                .map((book) => (
                  <option key={book.bookId} value={book.bookId}>
                    {book.title} by {book.author}
                  </option>
                ))}
            </select>
            <select
              value={issueFormData.memberId}
              onChange={(e) => setIssueFormData({ ...issueFormData, memberId: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member.memberId} value={member.memberId}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Issue Book
          </button>
        </form>
      )}

      {activeIssues.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            Active Issues
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Issue ID</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Member</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Book</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Issue Date</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeIssues.map((issue) => (
                  <tr key={issue.issueId} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-900">{issue.issueId}</td>
                    <td className="px-4 py-3 text-gray-900">{issue.member?.name}</td>
                    <td className="px-4 py-3 text-gray-600">{issue.book?.title}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(issue.issueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleReturnBook(issue.issueId)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                      >
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {returnedIssues.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Returned Issues
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Issue ID</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Member</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Book</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Issue Date</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Return Date</th>
                </tr>
              </thead>
              <tbody>
                {returnedIssues.map((issue) => (
                  <tr key={issue.issueId} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-900">{issue.issueId}</td>
                    <td className="px-4 py-3 text-gray-900">{issue.member?.name}</td>
                    <td className="px-4 py-3 text-gray-600">{issue.book?.title}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(issue.issueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(issue.returnDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {issues.length === 0 && !loading && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No issues found yet. Start issuing books!</p>
        </div>
      )}
    </div>
  );
}

export default IssuesList;
