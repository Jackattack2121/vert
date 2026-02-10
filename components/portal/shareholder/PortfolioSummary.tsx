'use client';

import { useEffect, useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPieChart } from 'react-icons/fi';
import Link from 'next/link';

interface PortfolioData {
  shares: number;
  costBasis: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

interface PortfolioSummaryProps {
  userId?: string;
}

export default function PortfolioSummary({ userId }: PortfolioSummaryProps) {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, [userId]);

  const fetchPortfolio = async () => {
    try {
      // TODO: Fetch from API
      // const response = await fetch(`/api/portal/portfolio?userId=${userId}`);
      // const data = await response.json();
      
      // Mock data for now
      const mockData: PortfolioData = {
        shares: 10000,
        costBasis: 0.25,
        currentPrice: 0.32,
        totalValue: 3200,
        gainLoss: 700,
        gainLossPercent: 28,
      };
      
      setPortfolio(mockData);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No portfolio data available</p>
      </div>
    );
  }

  const isPositive = portfolio.gainLoss >= 0;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Portfolio Summary</h2>
          <Link
            href="/portal/investor/portfolio"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Value */}
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FiDollarSign className="w-4 h-4 mr-1" />
              Total Value
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${portfolio.totalValue.toLocaleString()}
            </div>
          </div>

          {/* Gain/Loss */}
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              {isPositive ? (
                <FiTrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <FiTrendingDown className="w-4 h-4 mr-1" />
              )}
              Gain/Loss
            </div>
            <div className={`text-3xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}${portfolio.gainLoss.toLocaleString()}
            </div>
            <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{portfolio.gainLossPercent.toFixed(2)}%
            </div>
          </div>

          {/* Holdings */}
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FiPieChart className="w-4 h-4 mr-1" />
              Total Shares
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {portfolio.shares.toLocaleString()}
            </div>
          </div>

          {/* Average Cost */}
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FiDollarSign className="w-4 h-4 mr-1" />
              Average Cost
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${portfolio.costBasis.toFixed(3)}
            </div>
            <div className="text-sm text-gray-600">
              Current: ${portfolio.currentPrice.toFixed(3)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
