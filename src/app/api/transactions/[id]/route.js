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

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const transactions = readTransactions();
        
        // Find transaction by ID
        const transaction = transactions.find(t => t.id === id);
        
        if (!transaction) {
            return NextResponse.json(
                { error: 'Transaction not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch transaction' },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        
        const transactions = readTransactions();
        
        // Find transaction index
        const transactionIndex = transactions.findIndex(t => t.id === id);
        
        if (transactionIndex === -1) {
            return NextResponse.json(
                { error: 'Transaction not found' },
                { status: 404 }
            );
        }
        
        // Update transaction
        transactions[transactionIndex] = {
            ...transactions[transactionIndex],
            ...body,
            id // Preserve the ID
        };
        
        writeTransactions(transactions);
        
        return NextResponse.json(transactions[transactionIndex], { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update transaction' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        
        const transactions = readTransactions();
        
        // Find transaction index
        const transactionIndex = transactions.findIndex(t => t.id === id);
        
        if (transactionIndex === -1) {
            return NextResponse.json(
                { error: 'Transaction not found' },
                { status: 404 }
            );
        }
        
        // Remove transaction
        const deletedTransaction = transactions.splice(transactionIndex, 1)[0];
        
        writeTransactions(transactions);
        
        return NextResponse.json(
            { message: 'Transaction deleted successfully', transaction: deletedTransaction },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete transaction' },
            { status: 500 }
        );
    }
}
