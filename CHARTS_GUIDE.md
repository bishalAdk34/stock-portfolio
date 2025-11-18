# 📊 Charts Explanation Guide

## What Are These Charts?

The Stock Portfolio App displays **two interactive charts** on the Dashboard to help visualize your portfolio's performance.

---

## Chart 1: Stock Price Trends (Line Chart - Left Side)

### What It Shows:
- **How your portfolio's average stock price changes over 30 days**
- Blue line = Average price of all your stocks
- X-axis = Dates (last 30 days)
- Y-axis = Price in dollars ($)

### Example:
If you own:
- Apple (AAPL): $150
- Google (GOOGL): $140
- Tesla (TSLA): $250

**Average = (150 + 140 + 250) / 3 = $180**

The chart will show a line fluctuating around $180 with slight variations.

### Real-Time Updates:
✅ **YES - Updates instantly when you add/edit/delete stocks**

When you add a new stock:
1. The chart recalculates the average price
2. The line position adjusts upward or downward
3. You see the change immediately (no page refresh needed)

---

## Chart 2: Volume Analysis (Column Chart - Right Side)

### What It Shows:
Two things combined in one chart:

**Purple Columns = Trading Volume**
- How many shares were traded across your portfolio
- Based on your stock quantities
- Simulates daily trading activity

**Orange Line = Daily Gain/Loss %**
- How much you're gaining or losing
- Calculated from: (Current Price - Purchase Price) / Purchase Price × 100
- Shows profit/loss percentage

### Example:
If you buy 100 shares of AAPL at $150 and current price is $160:
- Gain/Loss = (160 - 150) / 150 × 100 = **6.67%**

The orange line shows +6.67% on that day.

### Real-Time Updates:
✅ **YES - Updates instantly when you add/edit stocks**

When you update current price:
1. The gain/loss % recalculates
2. The orange line moves up/down
3. You see the change immediately

---

## How Charts Update in Real-Time

### Before You Add Stocks:
```
❌ Charts show "Add stocks to see price trends"
❌ Charts show "Add stocks to see volume data"
```

### After You Add Your First Stock:
```
✅ Charts display with your actual portfolio data
✅ Line chart shows your average stock price
✅ Column chart shows your trading volume & gain/loss
```

### When You Add Another Stock:
```
✅ Charts INSTANTLY recalculate
✅ Charts INSTANTLY display new data
✅ No need to refresh page
```

### When You Edit a Stock's Current Price:
```
✅ Charts update immediately
✅ Gain/Loss % changes
✅ You see your profit/loss in real-time
```

### When You Delete a Stock:
```
✅ Charts recalculate without that stock
✅ Average price adjusts
✅ Charts update instantly
```

---

## Example Scenario

### Step 1: Start (No Stocks)
```
Portfolio Dashboard
├── Stats: 0 stocks, $0 value
├── Line Chart: "Add stocks to see price trends"
└── Column Chart: "Add stocks to see volume data"
```

### Step 2: Add Apple Stock
```
✅ Add: 10 shares of AAPL at $150 each
❌ Current price: $160

Portfolio Dashboard
├── Stats: 1 stock, $1,600 value, $100 gain (6.67% 📈)
├── Line Chart: Shows a line at ~$160
└── Column Chart: Shows ~1,600 volume, +6.67% gain
```

### Step 3: Add Google Stock
```
✅ Add: 5 shares of GOOGL at $140 each
❌ Current price: $145

Portfolio Dashboard
├── Stats: 2 stocks, $3,325 total value, $225 gain
├── Line Chart: Shows line at ~$152.5 (average of 160 & 145)
└── Column Chart: Shows combined volume, average gain/loss
```

### Step 4: Sell Apple (Update Price to $170)
```
✅ Edit AAPL current price: $160 → $170

Portfolio Dashboard
├── Stats: 2 stocks, $3,575 total value, $475 gain
├── Line Chart: Shows line at ~$157.5 (average updated)
└── Column Chart: Shows updated gain/loss percentage
```

---

## Key Features

### 🔄 Real-Time Synchronization
- Changes in Portfolio page → Instantly appear in Dashboard charts
- No API calls, no loading delays
- Uses Zustand state management for instant updates

### 📱 Responsive Design
- Works on desktop (full-size charts)
- Works on tablet (stacked layout)
- Works on mobile (one chart per row)

### 🎨 Visual Design
- **Line Chart**: Blue smooth line with hover tooltips
- **Column Chart**: Purple columns with orange line overlay
- **Interactive**: Hover over any point to see exact values

---

## What the Charts DON'T Do

### ❌ Don't Update from External APIs
The charts use your **portfolio data**, not real stock market data.

### ❌ Don't Show Real Market Prices
When you add a stock, you manually enter the current price.
The chart uses YOUR entered prices, not actual market prices.

### ❌ Don't Use Mock Data (After You Add Stocks)
Once you add stocks, they use REAL portfolio data.
If portfolio is empty, they show mock placeholder data.

---

## Chart Math Explained

### Line Chart Calculation:
```
Average Price = Sum of all current prices / Number of stocks

Example:
- AAPL: $160
- GOOGL: $145
- TSLA: $250

Average = (160 + 145 + 250) / 3 = $185
```

### Column Chart Calculation:
```
Daily Volume = Sum of (stock quantity × random percentage)

Daily Gain/Loss % = Average of all stocks' gain/loss percentages

Gain/Loss % per stock = (Current Price - Purchase Price) / Purchase Price × 100

Example:
- AAPL: (160 - 150) / 150 × 100 = +6.67%
- GOOGL: (145 - 140) / 140 × 100 = +3.57%
- TSLA: (250 - 245) / 245 × 100 = +2.04%

Average Gain/Loss = (6.67 + 3.57 + 2.04) / 3 = +4.09%
```

---

## Troubleshooting

### Charts Show "Add stocks to see..."
**Problem:** You haven't added any stocks yet
**Solution:** Go to Portfolio page and add at least 1 stock

### Charts Don't Update After Adding Stock
**Problem:** Page cache issue
**Solution:** Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

### Charts Show Wrong Data
**Problem:** Incorrect prices entered
**Solution:** Edit the stock and fix the current price

---

## Summary

| Feature | Status |
|---------|--------|
| Real-time updates | ✅ Yes |
| Updates when adding stock | ✅ Yes |
| Updates when editing stock | ✅ Yes |
| Updates when deleting stock | ✅ Yes |
| Updates when changing price | ✅ Yes |
| Uses your portfolio data | ✅ Yes |
| Mobile responsive | ✅ Yes |
| Interactive tooltips | ✅ Yes |

**The charts are fully connected to your portfolio and update instantly!** 🚀
