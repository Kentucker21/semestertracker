export default function JsonMock() {
  return {
   
  version: 1,

  
  // ACTIVE SEMESTER (one only)
  
  semester: {
    id: "sem_2025_spring",
    createdAt: 1730000000000,
    endsAt: 1740400000000,   // createdAt + monthsToDepletion
    data: {
      semesterBudget: 12000,
      monthsToDepletion: 4,
      savingsGoal:0
    }
  },

  
  // WEEKLY BUDGETS
  
  week: {
    active: {
      id: "wk_2025_01",
      semid:"sem_2025_spring",
      createdAt: 1730600000000,
      expiresAt: 1731200000000,
       weeklyBudget: 1800, 
       savingsTarget: 150,
      // Money carried over from last week
      carryover: 250,

      // Planned weekly category limits
      categories: [
        { id: "cat_groceries", name: "Groceries", limit: 1000 },
        { id: "cat_rent", name: "Rent", limit: 800 }
      ],

      // Actual purchases for the week
      purchases: [
        {
          id: "pur_001",
          name: "Grapes",
          semid:"sem_2025_spring",
          categoryId: "cat_groceries",
          amount: 100,
          purchasedAt: 1730610000000
        },
         
         {
          id: "pur_003",
          name: "Raisons",
          semid:"sem_2025_spring",
          categoryId: "cat_groceries",
          amount: 500,
          purchasedAt: 1730610000000
        },
         {
          id: "pur_004",
          name: "Grapes",
          semid:"sem_2025_winter",
          categoryId: "cat_groceries",
          amount: 600,
          purchasedAt: 1730610000000
        }

      ]
    },

  
    // ARCHIVED WEEKS
    
    history: [
      {
        id: "wk_2025_51",
        semid:'sem_2024_spring',
        createdAt: 1730000000000,
        endedAt: 1730600000000,
        weeklyBudget:1800,
        savingsTarget: 300,
        endReason: "expired", // or "manual_new_week"

        snapshot: {
          // categoryTotal: 1800,
          carryover: 0,
          totalAvailable: 1800,
          totalSpent: 4000,
          totalRemaining: 250,
          spentByCategory: {
            groceries: 750,
            rent: 800
          }
        },

        // Freeze what the plan was that week
        categories: [
          { id: "cat_groceries", name: "Groceries", limit: 1000 },
          { id: "cat_rent", name: "Rent", limit: 800 }
        ],

        // Optional but recommended (for PDFs & audits)
        purchases: [
          {
            id: "pur_prev",
            semid:'sem_2025_spring',
            name: "Rent payment",
            categoryId: "cat_rent", 
            amount: 800,
            purchasedAt: 1730020000000
          }
        ]
      },
      {
        id: "wk_2025_52",
        semid:'sem_2025_spring',
        createdAt: 1730000000000,
        endedAt: 1730600000000,
        weeklyBudget:1800,
        savingsTarget: 300,
        endReason: "expired", // or "manual_new_week"

        snapshot: {
          // categoryTotal: 1800,
          carryover: 0,
          totalAvailable: 1800,
          totalSpent: 1550,
          totalRemaining: 250,
          spentByCategory: {
            cat_groceries: 750,
            cat_rent: 800
          }
        },

        // Freeze what the plan was that week
        categories: [
          { id: "cat_groceries", name: "Groceries", limit: 1000 },
          { id: "cat_rent", name: "Rent", limit: 800 }
        ],

        // Optional but recommended (for PDFs & audits)
        purchases: [
          {
            id: "pur_prev",
            semid:'sem_2025_spring',
            name: "Rent payment",
            categoryId: "cat_rent", 
            amount: 800,
            purchasedAt: 1730020000000
          }
        ]
      },
      {
        id: "wk_2025_53",
        semid:'sem_2024_spring',
        createdAt: 1730000000000,
        endedAt: 1730600000000,
        weeklyBudget:1800,
        savingsTarget: 300,
        endReason: "expired", // or "manual_new_week"

        snapshot: {
          // categoryTotal: 1800,
          carryover: 0,
          totalAvailable: 1800,
          totalSpent: 1550,
          totalRemaining: 250,
          spentByCategory: {
            cat_groceries: 750,
            cat_rent: 800
          }
        },

        // Freeze what the plan was that week
        categories: [
          { id: "cat_groceries", name: "Groceries", limit: 1000 },
          { id: "cat_rent", name: "Rent", limit: 800 }
        ],

        // Optional but recommended (for PDFs & audits)
        purchases: [
          {
            id: "pur_prev",
            semid:'sem_2025_spring',
            name: "Rent payment",
            categoryId: "cat_rent", 
            amount: 800,
            purchasedAt: 1730020000000
          }
        ]
      }
    ]
  },



  // COMPLETED SEMESTERS
  
  semesterHistory: [
    {
      id: "sem_2024_fall",
      createdAt: 1720000000000,
      endedAt: 1730000000000,
      endReason: "expired", // or "manual_new_semester"

      summary: {
        semesterBudget: 12000,
        savingsGoal:0,
        totalSpent: 8300,
        totalRemaining: 3700
      }
    }
  ]
}

  }

