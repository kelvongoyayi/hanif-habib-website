import React, { useState } from 'react';
import { TrendingUp, TrendingDown, RotateCcw, Play, Info } from 'lucide-react';
import { formatCurrency } from '../../../shared/utils/formatters';
import { ErrorHandler, validateNumber } from '../../../shared/utils/errorHandling';

interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  netCashflow: number;
  savingsRate: number;
}

interface ScenarioData {
  salesGrowth: number;
  costReduction: number;
  newRevenue: number;
  additionalExpenses: number;
}

interface BudgetScenarioAnalysisProps {
  currentSummary: BudgetSummary;
  onApplyScenario: (scenario: ScenarioData) => void;
  onResetScenario: () => void;
  isScenarioActive: boolean;
  className?: string;
}

const BudgetScenarioAnalysis: React.FC<BudgetScenarioAnalysisProps> = ({
  currentSummary,
  onApplyScenario,
  onResetScenario,
  isScenarioActive,
  className = ''
}) => {
  const [scenario, setScenario] = useState<ScenarioData>({
    salesGrowth: 10,
    costReduction: 5,
    newRevenue: 0,
    additionalExpenses: 0
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleScenarioChange = (field: keyof ScenarioData, value: string) => {
    try {
      const numericValue = parseFloat(value) || 0;
      
      // Validate based on field type
      if (field === 'salesGrowth' || field === 'costReduction') {
        validateNumber(numericValue, field, -100, 1000); // Allow negative growth, cap at 1000%
      } else {
        validateNumber(numericValue, field, 0); // Revenue and expenses must be positive
      }

      setScenario(prev => ({
        ...prev,
        [field]: numericValue
      }));
    } catch (error) {
      ErrorHandler.logError(error as Error, 'BudgetScenarioAnalysis.handleScenarioChange');
    }
  };

  const calculateScenarioImpact = () => {
    // Calculate projected income with growth
    const projectedIncome = currentSummary.totalIncome * (1 + scenario.salesGrowth / 100) + scenario.newRevenue;
    
    // Calculate projected expenses with reduction
    const projectedExpenses = currentSummary.totalExpenses * (1 - scenario.costReduction / 100) + scenario.additionalExpenses;
    
    // Calculate new metrics
    const projectedCashflow = projectedIncome - projectedExpenses;
    const projectedSavingsRate = projectedIncome > 0 ? (projectedCashflow / projectedIncome) * 100 : 0;

    return {
      totalIncome: projectedIncome,
      totalExpenses: projectedExpenses,
      netCashflow: projectedCashflow,
      savingsRate: projectedSavingsRate
    };
  };

  const scenarioImpact = calculateScenarioImpact();
  
  // Calculate differences
  const incomeDiff = scenarioImpact.totalIncome - currentSummary.totalIncome;
  const expensesDiff = scenarioImpact.totalExpenses - currentSummary.totalExpenses;
  const cashflowDiff = scenarioImpact.netCashflow - currentSummary.netCashflow;

  const handleApplyScenario = () => {
    onApplyScenario(scenario);
  };

  const handleResetScenario = () => {
    onResetScenario();
    setScenario({
      salesGrowth: 10,
      costReduction: 5,
      newRevenue: 0,
      additionalExpenses: 0
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Scenario Analysis</h3>
            <p className="text-sm text-gray-600 mt-1">
              Explore "what-if" scenarios to optimize your budget
            </p>
          </div>
          {isScenarioActive && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Scenario Active
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Scenario Controls */}
        <div className="space-y-6">
          {/* Basic Scenarios */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Adjustments</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sales Growth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Growth (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={scenario.salesGrowth}
                    onChange={(e) => handleScenarioChange('salesGrowth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter percentage"
                    step="0.1"
                  />
                  <TrendingUp className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Positive values increase revenue, negative values decrease it
                </p>
              </div>

              {/* Cost Reduction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Reduction (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={scenario.costReduction}
                    onChange={(e) => handleScenarioChange('costReduction', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter percentage"
                    step="0.1"
                  />
                  <TrendingDown className="absolute right-3 top-2.5 h-4 w-4 text-red-500" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Positive values reduce costs, negative values increase them
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Scenarios */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
            >
              <span>Advanced Scenarios</span>
              <Info className="h-4 w-4" />
            </button>

            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* New Revenue Stream */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Revenue Stream
                  </label>
                  <input
                    type="number"
                    value={scenario.newRevenue}
                    onChange={(e) => handleScenarioChange('newRevenue', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter amount"
                    min="0"
                    step="10000"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Additional revenue from new products/services
                  </p>
                </div>

                {/* Additional Expenses */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Expenses
                  </label>
                  <input
                    type="number"
                    value={scenario.additionalExpenses}
                    onChange={(e) => handleScenarioChange('additionalExpenses', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter amount"
                    min="0"
                    step="10000"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    New expenses for expansion or investments
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Scenario Impact Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Projected Impact</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Income Impact */}
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Total Income</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(scenarioImpact.totalIncome)}
                </p>
                <p className={`text-xs ${incomeDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {incomeDiff >= 0 ? '+' : ''}{formatCurrency(incomeDiff)}
                </p>
              </div>

              {/* Expenses Impact */}
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Total Expenses</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(scenarioImpact.totalExpenses)}
                </p>
                <p className={`text-xs ${expensesDiff <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {expensesDiff >= 0 ? '+' : ''}{formatCurrency(expensesDiff)}
                </p>
              </div>

              {/* Cashflow Impact */}
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Net Cashflow</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(scenarioImpact.netCashflow)}
                </p>
                <p className={`text-xs ${cashflowDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {cashflowDiff >= 0 ? '+' : ''}{formatCurrency(cashflowDiff)}
                </p>
              </div>
            </div>

            {/* Savings Rate */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Projected Savings Rate:</span>
                <span className={`text-lg font-bold ${
                  scenarioImpact.savingsRate >= 20 ? 'text-green-600' :
                  scenarioImpact.savingsRate >= 10 ? 'text-blue-600' :
                  scenarioImpact.savingsRate >= 0 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {scenarioImpact.savingsRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleApplyScenario}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              <Play className="h-4 w-4 mr-2" />
              Apply Scenario
            </button>
            
            {isScenarioActive && (
              <button
                onClick={handleResetScenario}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Original
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetScenarioAnalysis; 