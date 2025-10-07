# SpendWise

SpendWise is a personal finance tracker built with React and Firebase. It helps users manage their income and expenses, visualize transactions, and maintain financial health.

🔗 **Live Demo:** [SpendWise](https://66eb312f1f336d8db28a09e8--glistening-bavarois-d04429.netlify.app)

![SpendWise Screenshot](https://github.com/user-attachments/assets/37f7a961-73f4-4616-be7e-f1100b1cc550)

---

## Features

- **User Authentication:** Sign up/sign in with email/password or Google.
- **Dashboard:** View current balance, income, expenses, and transaction history.
- **Add Transactions:** Log income and expenses with details.
- **Charts & Visualization:** Interactive charts for financial insights.
- **Search & Filter:** Quickly find transactions.
- **Responsive UI:** Built with Ant Design and custom styles.

---

## Tech Stack

- **Frontend:** React, Ant Design, react-toastify
- **Backend:** Firebase (Firestore, Auth)
- **Other:** PapaParse (CSV export), Moment.js

---

## Getting Started

### Prerequisites

- Node.js & npm

### Installation

```sh
git clone https://github.com/your-username/spendwise.git
cd spendwise
npm install
```

### Running Locally

```sh
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```sh
npm run build
```

---

## Project Structure

```
SpendWise/
├── public/           # Static assets and HTML template
├── src/              # Source code
│   ├── assets/       # Images and SVGs
│   ├── components/   # React components
│   ├── firebase.js   # Firebase config
│   ├── App.js        # Main app component
│   └── index.js      # Entry point
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

---

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Replace the config in [`src/firebase.js`](src/firebase.js) with your credentials.

---

## Scripts

- `npm start` — Run development server
- `npm test` — Run tests
- `npm run build` — Build for production
- `npm run eject` — Eject configuration

---

## License

This project is licensed under the MIT License.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## Contact

For questions or feedback, open an issue or contact [your-email@example.com](atishay4969@gmail.com).
