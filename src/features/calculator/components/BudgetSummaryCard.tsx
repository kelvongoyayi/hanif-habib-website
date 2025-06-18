import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart4, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../../shared/utils/formatters';

interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  netCashflow: number;
  savingsRate: number;
}

interface BudgetSummaryCardProps {
  summary: BudgetSummary;
  budgetPeriod: 'monthly' | 'quarterly' | 'annually';
  showAnalysis?: boolean;
  className?: string;
}

const BudgetSummaryCard: React.FC<BudgetSummaryCardProps> = ({
  summary,
  budgetPeriod,
  showAnalysis = true,
  className = ''
}) => {
  const isPositiveCashflow = summary.netCashflow >= 0;
  const cashflowPercentage = summary.totalIncome > 0 ? (summary.netCashflow / summary.totalIncome) * 100 : 0;

  const getFinancialHealthStatus = () => {
    if (summary.savingsRate >= 20) return { status: 'excellent', color: 'text-green-600', icon: CheckCircle };
    if (summary.savingsRate >= 10) return { status: 'good', color: 'text-blue-600', icon: TrendingUp };
    if (summary.savingsRate >= 0) return { status: 'fair', color: 'text-yellow-600', icon: BarChart4 };
    return { status: 'poor', color: 'text-red-600', icon: AlertTriangle };
  };

  const healthStatus = getFinancialHealthStatus();
  const HealthIcon = healthStatus.icon;

  const getPeriodLabel = () => {
    switch (budgetPeriod) {
      case 'monthly': return 'per month';
      case 'quarterly': return 'per quarter';
      case 'annually': return 'per year';
      default: return '';
    }
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (summary.savingsRate < 10) {
      recommendations.push("Consider reducing expenses or increasing income to improve your savings rate.");
    }
    
    if (summary.netCashflow < 0) {
      recommendations.push("Your expenses exceed income. Review and cut non-essential expenses.");
    }
    
    if (summary.savingsRate > 30) {
      recommendations.push("Excellent savings rate! Consider investment opportunities for growth.");
    }
    
    if (summary.totalExpenses > summary.totalIncome * 0.8) {
      recommendations.push("High expense ratio. Look for cost optimization opportunities.");
    }

    return recommendations;
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Budget Summary</h3>
          <div className="flex items-center space-x-2">
            <HealthIcon className={`h-5 w-5 ${healthStatus.color}`} />
            <span className={`text-sm font-medium capitalize ${healthStatus.color}`}>
              {healthStatus.status}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Financial overview {getPeriodLabel()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Income */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Total Income</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(summary.totalIncome)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Total Expenses</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(summary.totalExpenses)}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </div>

          {/* Net Cashflow */}
          <div className={`${isPositiveCashflow ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} border rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isPositiveCashflow ? 'text-blue-800' : 'text-orange-800'}`}>
                  Net Cashflow
                </p>
                <p className={`text-2xl font-bold ${isPositiveCashflow ? 'text-blue-900' : 'text-orange-900'}`}>
                  {formatCurrency(summary.netCashflow)}
                </p>
              </div>
              <DollarSign className={`h-8 w-8 ${isPositiveCashflow ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Savings Rate</h4>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {summary.savingsRate.toFixed(1)}%
              </span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    summary.savingsRate >= 20 ? 'bg-green-500' :
                    summary.savingsRate >= 10 ? 'bg-blue-500' :
                    summary.savingsRate >= 0 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(Math.max(summary.savingsRate, 0), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Expense Ratio</h4>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {summary.totalIncome > 0 ? ((summary.totalExpenses / summary.totalIncome) * 100).toFixed(1) : 0}%
              </span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gray-500"
                  style={{ 
                    width: `${Math.min(summary.totalIncome > 0 ? (summary.totalExpenses / summary.totalIncome) * 100 : 0, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis and Recommendations */}
        {showAnalysis && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Analysis</h4>
            
            {/* Status Message */}
            <div className={`p-4 rounded-lg mb-4 ${
              isPositiveCashflow ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm ${isPositiveCashflow ? 'text-green-800' : 'text-red-800'}`}>
                {isPositiveCashflow 
                  ? `Your budget shows a positive cashflow of ${formatCurrency(summary.netCashflow)}. This represents ${cashflowPercentage.toFixed(1)}% of your total income.`
                  : `Your budget shows a deficit of ${formatCurrency(Math.abs(summary.netCashflow))}. You need to reduce expenses or increase income by ${Math.abs(cashflowPercentage).toFixed(1)}%.`
                }
              </p>
            </div>

            {/* Recommendations */}
            {getRecommendations().length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h5>
                <ul className="space-y-2">
                  {getRecommendations().map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetSummaryCard; 