# Transaction Dashboard - Next.js

A modern, responsive transaction dashboard built with Next.js that displays account balance, transaction lists with search and filtering capabilities, and detailed transaction views.

## 🚀 Features

### ✅ **Dashboard**
- **Account Balance Display** - Real-time calculation from transaction data
- **Transaction List** - Beautiful card-based layout with visual indicators
- **Responsive Design** - Optimized for mobile and desktop
- **Loading States** - Elegant loading spinners and error handling

### ✅ **Search & Filtering**
- **Real-time Search** - Search transactions by description or category
- **Status Filtering** - Filter by Completed, Pending, Failed, or All
- **Dynamic Results** - Instant updates with smooth transitions
- **Results Counter** - Shows number of filtered transactions

### ✅ **Transaction Details**
- **Detailed View** - Click any transaction to view full details
- **Rich Information** - ID, amount, date, status, type, category
- **Visual Status Indicators** - Color-coded status with icons
- **Navigation** - Easy back-to-dashboard functionality

### ✅ **API Integration**
- **RESTful APIs** - Full CRUD operations for transactions
- **JSON Data Storage** - Local JSON file storage in `/data` folder
- **Error Handling** - Comprehensive error responses
- **Search API** - Server-side filtering and search

### ✅ **Modern UI/UX**
- **Tailwind CSS** - Modern styling with gradient themes
- **Smooth Animations** - Hover effects and transitions
- **Accessibility** - Keyboard navigation and ARIA labels
- **Visual Feedback** - Color-coded transaction types and statuses

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Data Storage**: JSON files
- **API**: Next.js API Routes
- **Icons**: Emoji-based icons
- **Typography**: Geist font family

## 📁 Project Structure

```
bloxley-web-interview-task/
├── src/
│   └── app/
│       ├── api/
│       │   └── transactions/
│       │       ├── route.js          # GET/POST transactions
│       │       └── [id]/
│       │           └── route.js      # GET/PUT/DELETE specific transaction
│       ├── [id]/
│       │   └── page.js              # Transaction detail page
│       ├── page.js                  # Dashboard (main page)
│       ├── layout.js                # Root layout
│       └── globals.css              # Global styles
├── data/
│   └── transactions.json            # Transaction data storage
├── public/                          # Static assets
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### 1. Clone the Repository
```bash
git clone <repository-url>
cd bloxley-web-interview-task
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Sample Data

The application comes with 8 sample transactions including:
- Various transaction types (credit/debit)
- Different statuses (Completed, Pending, Failed)
- Multiple categories (Business, Income, Food & Dining, etc.)
- Recent dates for realistic testing

## 🔧 API Endpoints

### GET `/api/transactions`
Fetch all transactions with optional search and filtering
- Query params: `search`, `status`
- Example: `/api/transactions?search=coffee&status=completed`

### GET `/api/transactions/[id]`
Fetch specific transaction by ID
- Returns: Single transaction object

### POST `/api/transactions`
Create new transaction
- Body: `{ amount, description, date?, status?, type?, category? }`

### PUT `/api/transactions/[id]`
Update existing transaction
- Body: Updated transaction fields

### DELETE `/api/transactions/[id]`
Delete transaction by ID

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#075386 to #419AD6)
- **Success/Credit**: Green (#075386, blue tones)
- **Warning/Debit**: Orange/Red (#FF7C44, red tones)
- **Background**: Light gray (#f9fafb)

### Visual Elements
- **Gradient text** for account balance
- **Card-based layout** with rounded corners
- **Color-coded borders** for transaction types
- **Status badges** with appropriate colors
- **Smooth hover effects** and transitions

## 🔍 Usage Examples

### Searching Transactions
1. Use the search bar to find transactions by description
2. Results update in real-time as you type
3. Search works across description and category fields

### Filtering by Status
1. Click status filter buttons (All, Completed, Pending, Failed)
2. Transactions list updates to show only matching statuses
3. Active filter is highlighted with gradient background

### Viewing Transaction Details
1. Click any transaction card in the dashboard
2. Navigate to detailed view with all transaction information
3. Use "Back to Dashboard" button to return

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS, Google Cloud, Azure

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is created for interview purposes and demonstration.

---

**Built with ❤️ using Next.js and Tailwind CSS**
