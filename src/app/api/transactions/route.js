import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to read transactions from JSON file
function readTransactions() {
    const filePath = path.join(process.cwd(), 'data', 'transactions.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

// Helper function to write transactions to JSON file
function writeTransactions(transactions) {
    const filePath = path.join(process.cwd(), 'data', 'transactions.json');
    fs.writeFileSync(filePath, JSON.stringify(transactions, null, 4));
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const status = searchParams.get('status');
        
        let transactions = readTransactions();
        
        // Apply search filter
        if (search) {
            transactions = transactions.filter(tx => 
                tx.description.toLowerCase().includes(search.toLowerCase()) ||
                tx.category.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        // Apply status filter
        if (status && status !== 'all') {
            transactions = transactions.filter(tx => 
                tx.status.toLowerCase() === status.toLowerCase()
            );
        }
        
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        // Validate required fields
        if (!body.amount || !body.description) {
            return NextResponse.json(
                { error: 'Amount and description are required' },
                { status: 400 }
            );
        }

        const transactions = readTransactions();
        
        // Create new transaction
        const newTransaction = {
            id: (transactions.length + 1).toString(),
            amount: body.amount,
            date: body.date || new Date().toISOString().split('T')[0],
            status: body.status || 'Pending',
            description: body.description,
            type: body.type || 'debit',
            category: body.category || 'Other'
        };

        transactions.push(newTransaction);
        writeTransactions(transactions);

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create transaction' },
            { status: 500 }
        );
    }
}
