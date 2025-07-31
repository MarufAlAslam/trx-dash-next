'use client'
import React, { useEffect, useState, use } from 'react';

const TrxDetails = ({ params }) => {
    const resolvedParams = use(params);
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with your actual API endpoint
        fetch(`/api/transactions/${resolvedParams.id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch transaction');
                return res.json();
            })
            .then(data => {
                setTransaction(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [resolvedParams.id]);

    if (loading) return (
        <div className="bg-gray-50 flex justify-center items-center min-h-screen p-20 h-screen font-sans">
            <div className="max-w-2xl w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419AD6] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading transaction details...</p>
                </div>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="bg-gray-50 flex justify-center items-center min-h-screen p-20 h-screen font-sans">
            <div className="max-w-2xl w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
                <div className="text-center">
                    <div className="text-4xl mb-4">❌</div>
                    <p className="text-red-500 font-semibold">Error: {error}</p>
                </div>
            </div>
        </div>
    );
    
    if (!transaction) return (
        <div className="bg-gray-50 flex justify-center items-center min-h-screen p-20 h-screen font-sans">
            <div className="max-w-2xl w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
                <div className="text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-gray-600 font-semibold">No transaction found.</p>
                </div>
            </div>
        </div>
    );

    // Determine if transaction amount is positive or negative
    const amount = parseFloat(transaction.amount.replace(/[$,]/g, ''));
    const isCredit = amount > 0;
    const statusColor = transaction.status === 'Completed' ? 'text-green-600' : 
                       transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600';
    const statusIcon = transaction.status === 'Completed' ? '✅' : 
                      transaction.status === 'Pending' ? '⏳' : '❌';

    return (
        <div className="bg-gray-50 flex justify-center items-center min-h-screen p-20 h-screen font-sans">
            <div className="max-w-2xl w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="mb-2 font-extrabold tracking-wide text-lg flex items-center justify-center gap-2" style={{ color: '#419AD6' }}>
                        💳 Transaction Details
                    </h2>
                    <div
                        className="text-4xl font-black mb-4 bg-clip-text text-transparent select-text"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #075386, #419AD6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {isCredit ? '+' : '−'}{transaction.amount}
                    </div>
                </div>

                {/* Gradient divider */}
                <div className="h-1 bg-gradient-to-r from-[#075386] to-[#419AD6] mb-8 rounded-full"></div>

                {/* Transaction Info */}
                <div className="space-y-4">
                    <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-[#075386] bg-blue-50' : 'border-[#FF7C44] bg-red-50'}`}>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Transaction ID</span>
                            <span className="font-bold text-gray-900">#{transaction.id}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-[#075386] bg-blue-50' : 'border-[#FF7C44] bg-red-50'}`}>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Description</span>
                            <span className="font-bold text-gray-900">{transaction.description}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-[#075386] bg-blue-50' : 'border-[#FF7C44] bg-red-50'}`}>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Date</span>
                            <span className="font-bold text-gray-900">{transaction.date}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-[#075386] bg-blue-50' : 'border-[#FF7C44] bg-red-50'}`}>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Status</span>
                            <span className={`font-bold flex items-center gap-2 ${statusColor}`}>
                                {statusIcon} {transaction.status}
                            </span>
                        </div>
                    </div>

                    {transaction.type && (
                        <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-[#075386] bg-blue-50' : 'border-[#FF7C44] bg-red-50'}`}>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Type</span>
                                <span className="font-bold text-gray-900 capitalize">{transaction.type}</span>
                            </div>
                        </div>
                    )}

                    {transaction.category && (
                        <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-[#075386] bg-blue-50' : 'border-[#FF7C44] bg-red-50'}`}>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Category</span>
                                <span className="font-bold text-gray-900">{transaction.category}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => window.history.back()}
                        className="px-6 cursor-pointer py-3 bg-gradient-to-r from-[#075386] to-[#419AD6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrxDetails;