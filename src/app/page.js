'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchTransactions = async (search = '', status = 'all') => {
    try {
      let url = '/api/transactions';
      const params = new URLSearchParams();
      
      if (search) params.append('search', search);
      if (status !== 'all') params.append('status', status);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch transactions');
      
      const data = await res.json();
      
      // Convert API data to match dashboard format
      const formattedTransactions = data.map(tx => ({
        id: parseInt(tx.id),
        date: tx.date,
        description: tx.description,
        amount: parseFloat(tx.amount.replace(/[$,]/g, '')) * (tx.type === 'debit' ? -1 : 1),
        status: tx.status
      }));
      
      setTransactions(formattedTransactions);
      setFilteredTransactions(formattedTransactions);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchTransactions(term, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    fetchTransactions(searchTerm, status);
  };

  const accountBalance = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  const handleClick = (id) => {
    router.push(`/${id}`);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 flex justify-center items-center min-h-screen p-20 h-screen font-sans">
        <div className="max-w-2xl w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419AD6] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 flex justify-center items-center min-h-screen p-20 h-screen font-sans">
        <div className="max-w-2xl w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-red-500 font-semibold">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-[#075386] to-[#419AD6] text-white font-bold rounded-xl"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen p-20 h-screen font-sans">
      <div className="max-w-2xl w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h2 className="mb-2 font-extrabold tracking-wide text-lg flex items-center gap-2" style={{ color: '#419AD6' }}>
          💰 Account Balance
        </h2>
        <div
          className="text-5xl font-black mb-7 bg-clip-text text-transparent select-text"
          style={{
            backgroundImage: 'linear-gradient(to right, #075386, #419AD6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ${accountBalance.toFixed(2)}
        </div>

        {/* gradient divider */}
        <div className="h-1 bg-gradient-to-r from-[#075386] to-[#419AD6] mb-8 rounded-full"></div>

        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#419AD6] focus:border-transparent"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              🔍
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'Completed', 'Pending', 'Failed'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-4 cursor-pointer py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-gradient-to-r from-[#075386] to-[#419AD6] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <h3 className="text-gray-900 font-bold mb-4 text-lg flex items-center gap-2">
          🧾 Transactions ({filteredTransactions.length})
        </h3>
        
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>No transactions found</p>
          </div>
        ) : (
          <ul className="list-none transition-all duration-100 p-0 m-0 max-h-96 overflow-y-auto">
            {filteredTransactions.map(tx => (
              <li
                key={tx.id}
                onClick={() => handleClick(tx.id)}
                className={`flex justify-between items-center mb-4 py-3 px-4 rounded-xl shadow-sm border-l-8 cursor-pointer transition hover:bg-gray-100 ${tx.amount < 0 ? 'border-[#FF7C44] bg-red-50' : ' border-[#075386] bg-blue-50'
                  }`}
                style={tx.amount >= 0 ? { borderLeftColor: '#075386' } : {}}
                tabIndex={0}
                role="button"
                onKeyPress={e => {
                  if (e.key === 'Enter' || e.key === ' ') handleClick(tx.id);
                }}
              >
                <span>
                  <strong className="text-base">{tx.description}</strong>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span>{tx.date}</span>
                    {tx.status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tx.status}
                      </span>
                    )}
                  </div>
                </span>
                <span
                  className={`font-bold text-base tracking-wide ${tx.amount < 0 ? 'text-red-400' : ''
                    }`}
                  style={tx.amount >= 0 ? { color: '#075386' } : {}}
                >
                  {tx.amount < 0 ? '−' : '+'}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
