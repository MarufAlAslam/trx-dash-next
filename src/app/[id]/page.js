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
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8 lg:p-20 font-sans">
            <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419AD6] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading transaction details...</p>
                </div>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8 lg:p-20 font-sans">
            <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                <div className="text-center">
                    <div className="text-4xl mb-4">❌</div>
                    <p className="text-red-500 font-semibold">Error: {error}</p>
                </div>
            </div>
        </div>
    );
    
    if (!transaction) return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8 lg:p-20 font-sans">
            <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                <div className="text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-gray-600 font-semibold">No transaction found.</p>
                </div>
            </div>
        </div>
    );

    // Determine if transaction is credit or debit based on type from API
    const amount = parseFloat(transaction.amount.replace(/[$,]/g, ''));
    const isCredit = transaction.type === 'credit';
    const statusColor = transaction.status === 'Completed' ? 'text-green-600' : 
                       transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600';
    const statusIcon = transaction.status === 'Completed' ? '✅' : 
                      transaction.status === 'Pending' ? '⏳' : '❌';

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8 lg:p-20 font-sans">
            <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="mb-2 font-extrabold tracking-wide text-lg sm:text-xl flex items-center justify-center gap-2" style={{ color: '#419AD6' }}>
                        💳 Transaction Details
                    </h2>
                    <div
                        className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 bg-clip-text text-transparent select-text break-words"
                        style={{
                            backgroundImage: isCredit 
                                ? 'linear-gradient(to right, #10b981, #059669)' // Green gradient for credit
                                : 'linear-gradient(to right, #ef4444, #dc2626)', // Red gradient for debit
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {isCredit ? '+' : '−'}${amount.toFixed(2)}
                    </div>
                </div>

                {/* Gradient divider */}
                <div className="h-1 bg-gradient-to-r from-[#075386] to-[#419AD6] mb-8 rounded-full"></div>

                {/* Transaction Info */}
                <div className="space-y-4">
                    <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <span className="text-gray-600 font-medium text-sm sm:text-base">Transaction ID</span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">#{transaction.id}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <span className="text-gray-600 font-medium text-sm sm:text-base">Description</span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base text-right break-words">{transaction.description}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <span className="text-gray-600 font-medium text-sm sm:text-base">Date</span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">{transaction.date}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <span className="text-gray-600 font-medium text-sm sm:text-base">Status</span>
                            <span className={`font-bold flex items-center gap-2 text-sm sm:text-base ${statusColor}`}>
                                {statusIcon} {transaction.status}
                            </span>
                        </div>
                    </div>

                    {transaction.type && (
                        <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <span className="text-gray-600 font-medium text-sm sm:text-base">Type</span>
                                <span className={`font-bold capitalize text-sm sm:text-base ${isCredit ? 'text-green-700' : 'text-red-700'}`}>
                                    {transaction.type}
                                </span>
                            </div>
                        </div>
                    )}

                    {transaction.category && (
                        <div className={`p-4 rounded-xl border-l-8 ${isCredit ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <span className="text-gray-600 font-medium text-sm sm:text-base">Category</span>
                                <span className="font-bold text-gray-900 text-sm sm:text-base text-right">{transaction.category}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-6 cursor-pointer py-3 bg-gradient-to-r from-[#075386] to-[#419AD6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrxDetails;