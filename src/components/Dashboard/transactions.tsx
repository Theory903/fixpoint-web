'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, LayoutGrid, Receipt, ArrowLeftRight, CreditCard, Wallet } from 'lucide-react';

const TransactionDashboard = () => {
  // Time period state
  const [selectedPeriod, setSelectedPeriod] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Week');
  interface Transaction {
    id: number;
    amount: number;
    date: Date;
    type: string;
    category: string;
    icon: React.JSX.Element;
  }
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalSpending, setTotalSpending] = useState(0);
  interface ChartData {
    day: string;
    amount: number;
  }

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');

  // Sample data generator (replace with actual API calls)
  const generateData = (period: 'Day' | 'Week' | 'Month' | 'Year') => {
    const multiplier = {
      'Day': 1,
      'Week': 7,
      'Month': 30,
      'Year': 365
    };

    const types = [
      { type: 'Salary', category: 'Payment', icon: <CreditCard className="w-6 h-6 text-blue-500" /> },
      { type: 'Inventory', category: 'Deposit', icon: <Package className="w-6 h-6 text-green-500" /> },
      { type: 'Shipping', category: 'Deposit', icon: <Truck className="w-6 h-6 text-orange-500" /> }
    ];

    const newTransactions = Array.from({ length: multiplier[period] }, (_, i) => ({
      id: i + 1,
      ...types[Math.floor(Math.random() * types.length)],
      amount: Math.floor(Math.random() * 1000) + 500,
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000))
    }));

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const newChartData = days.map(day => ({
      day,
      amount: Math.floor(Math.random() * 1000) + 500
    }));

    return {
      transactions: newTransactions,
      chartData: newChartData,
      total: newTransactions.reduce((sum, t) => sum + t.amount, 0)
    };
  };

  // Handle period change
  const handlePeriodChange = (period: 'Day' | 'Week' | 'Month' | 'Year') => {
    setIsLoading(true);
    setSelectedPeriod(period);
    
    setTimeout(() => {
      const newData = generateData(period);
      setTransactions(newData.transactions);
      setChartData(newData.chartData);
      setTotalSpending(newData.total);
      setIsLoading(false);
    }, 500);
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(t => 
    filterType === 'All' || t.type === filterType
  );

  // Initialize data
  useEffect(() => handlePeriodChange(selectedPeriod), []);

  const maxValue = Math.max(...chartData.map(d => d.amount));
  const transactionTypes = ['All', ...Array.from(new Set(transactions.map(t => t.type)))];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Spending Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Total Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4 dark:text-white">
            {isLoading ? '...' : `Rs.${totalSpending.toLocaleString()}`}
          </div>

          {/* Time Period Selector */}
          <div className="flex space-x-2 mb-6">
            {(['Day', 'Week', 'Month', 'Year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 
                  ${period === selectedPeriod 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-40 relative">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-between">
                  {chartData.map((data, index) => (
                    <div key={index} className="w-8 relative group">
                      <div 
                        className="w-full bg-primary/20 rounded-t-lg transition-all duration-300 hover:bg-primary/30"
                        style={{ 
                          height: `${(data.amount / maxValue) * 100}%`,
                        }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        Rs.{data.amount}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 text-sm text-gray-500">
                  {chartData.map((data, index) => (
                    <div key={index} className="w-8 text-center">{data.day}</div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Transactions</span>
              <span className="font-semibold">{transactions.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Average Amount</span>
              <span className="font-semibold">
                Rs.{transactions.length ? Math.round(totalSpending / transactions.length).toLocaleString() : 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-sm bg-transparent border-none cursor-pointer"
          >
            {transactionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                      {transaction.icon}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold dark:text-white">{transaction.type}</p>
                      <p className="text-sm text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <span className="font-semibold dark:text-white">
                    Rs.{transaction.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionDashboard;