import { useState } from 'react';
import { Menu, X, BookOpen, Users, FileText, Home } from 'lucide-react';
import BooksList from './components/BooksList';
import MembersList from './components/MembersList';
import IssuesList from './components/IssuesList';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'issues', label: 'Issues', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'books':
        return <BooksList />;
      case 'members':
        return <MembersList />;
      case 'issues':
        return <IssuesList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">LibTrack</h1>
              <span className="text-sm text-gray-500 ml-2">Library Management System</span>
            </div>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <nav className={`bg-white shadow-md rounded-lg m-4 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-col md:flex-row">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 md:border-b-0 md:border-r ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-blue-50 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">© 2026 LibTrack - Library Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
