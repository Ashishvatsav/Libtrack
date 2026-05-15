import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Loader } from 'lucide-react';
import { booksAPI, membersAPI, issuesAPI } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    totalMembers: 0,
    activeIssues: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [booksRes, availableRes, membersRes, issuesRes] = await Promise.all([
        booksAPI.getAllBooks(),
        booksAPI.getAvailableBooks(),
        membersAPI.getAllMembers(),
        issuesAPI.getAllIssues(),
      ]);

      const activeIssues = issuesRes.data.filter((issue) => !issue.returnDate).length;

      setStats({
        totalBooks: booksRes.data.length,
        availableBooks: availableRes.data.length,
        totalMembers: membersRes.data.length,
        activeIssues,
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: '📚',
    },
    {
      title: 'Available Books',
      value: stats.availableBooks,
      color: 'bg-green-50',
      textColor: 'text-green-600',
      icon: '✓',
    },
    {
      title: 'Total Members',
      value: stats.totalMembers,
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
      icon: '👥',
    },
    {
      title: 'Active Issues',
      value: stats.activeIssues,
      color: 'bg-orange-50',
      textColor: 'text-orange-600',
      icon: '⚠️',
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition border-l-4 ${card.textColor.replace('text-', 'border-')}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 font-medium">{card.title}</p>
                <p className={`text-4xl font-bold ${card.textColor} mt-2`}>{card.value}</p>
              </div>
              <span className="text-3xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-8">
        <h3 className="text-2xl font-bold mb-2">Welcome to LibTrack</h3>
        <p className="text-blue-100">
          Efficiently manage your library's books, members, and issue records with our modern management system.
        </p>
      </div>

      {/* Quick Stats Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h4 className="font-bold text-gray-900">Library Status</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Books Available:</span>
              <span className="font-semibold text-green-600">{stats.availableBooks}/{stats.totalBooks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{
                  width: `${stats.totalBooks > 0 ? (stats.availableBooks / stats.totalBooks) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {stats.totalBooks > 0
                ? ((stats.availableBooks / stats.totalBooks) * 100).toFixed(1)
                : 0}% availability rate
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h4 className="font-bold text-gray-900">Active Circulation</h4>
          </div>
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600">{stats.activeIssues}</p>
              <p className="text-sm text-gray-600 mt-2">Books currently issued</p>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Manage book issues and returns from the Issues section.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 bg-gray-50 p-8 rounded-xl">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Key Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold text-gray-900">📖 Books Management</p>
            <p className="text-sm text-gray-600 mt-2">Add, search, and track book availability with ease.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold text-gray-900">👥 Member Registry</p>
            <p className="text-sm text-gray-600 mt-2">Manage member profiles and borrow privileges.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold text-gray-900">📋 Issue Tracking</p>
            <p className="text-sm text-gray-600 mt-2">Track book issues and returns efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
