import { useState, useEffect } from 'react';
import { Users, AlertCircle, Loader } from 'lucide-react';
import { membersAPI } from '../services/api';

function MembersList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await membersAPI.getAllMembers();
      setMembers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch members. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await membersAPI.addMember(formData);
      setFormData({ name: '', email: '' });
      setShowForm(false);
      fetchMembers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add member');
    }
  };

  if (loading && members.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Members Management</h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Total Members</p>
        <p className="text-3xl font-bold text-blue-600">{members.length}</p>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {showForm ? 'Cancel' : 'Add New Member'}
      </button>

      {showForm && (
        <form onSubmit={handleAddMember} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Add Member
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.memberId} className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Member ID</p>
                <p className="text-2xl font-bold text-blue-600">{member.memberId}</p>
              </div>
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-lg font-semibold text-gray-900">{member.name}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-gray-600">{member.email}</p>
            </div>
            {member.borrowLimit && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">Borrow Limit</p>
                <p className="text-sm font-semibold text-gray-900">{member.borrowLimit}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {members.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No members found. Add your first member!</p>
        </div>
      )}
    </div>
  );
}

export default MembersList;
