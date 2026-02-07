// src/data/transactions.js
let d = new Date();
export const transactions = [
  // --- NOVEMBER (Last Month) ---

  {
      id: "tr_001",
      date: d.getMonth() - 1,
      description: "Main Salary",
      categoryId: "cat_1",
      amount: 3500,
  },
  {
    id: "tr_002",
    date: d.getMonth() - 1,
    description: "Apartment Rent",
    categoryId: "cat_3",
    amount: 1200,
  },
  {
    id: "tr_003",
    date: d.getMonth() - 1,
    description: "Weekly Shop",
    categoryId: "cat_4",
    amount: 200,
  },
  {
    id: "tr_004",
    date: d.getMonth() - 1,
    description: "Movie Night",
    categoryId: "cat_6",
    amount: 40,
  },

  // --- DECEMBER (Current Month) ---
  {
    id: "tr_005",
    date: d.getMonth(),
    description: "Main Salary",
    categoryId: "cat_1",
    amount: 3500,
  },
  {
    id: "tr_006",
    date: d.getMonth(),
    description: "Apartment Rent",
    categoryId: "cat_3",
    amount: 1200,
  },
  {
    id: "tr_007",
    date: d.getMonth(),
    description: "Grocery Haul",
    categoryId: "cat_4",
    amount: 280,
  },
  {
    id: "tr_008",
    date: d.getMonth(),
    description: "Upwork Project",
    categoryId: "cat_2",
    amount: 650,
  },
];

//GET THE TOTAL INCOME 