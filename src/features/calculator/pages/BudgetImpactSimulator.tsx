import React, { useState, useEffect } from 'react';
import { BarChart4, Save } from 'lucide-react';
import CalculatorLayout from '../components/CalculatorLayout';
import BudgetCategoryForm from '../components/BudgetCategoryForm';
import BudgetSummaryCard from '../components/BudgetSummaryCard';
import BudgetScenarioAnalysis from '../components/BudgetScenarioAnalysis';
import { ErrorHandler, validateRequired } from '../../../shared/utils/errorHandling';

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  isExpanded?: boolean;
  items?: {
    id: string;
    name: string;
    amount: number;
  }[];
}

interface BudgetFormData {
  budgetName: string;
  budgetPeriod: 'monthly' | 'quarterly' | 'annually';
  incomeCategories: BudgetCategory[];
  expenseCategories: BudgetCategory[];
}

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

const BudgetImpactSimulator = () => {
  // Default data
  const defaultIncomeCategories: BudgetCategory[] = [
    {
      id: 'sales',
      name: 'Sales Revenue',
      amount: 5000000,
      isExpanded: false,
      items: [
        { id: 'product-a', name: 'Product A', amount: 3000000 },
        { id: 'product-b', name: 'Product B', amount: 2000000 }
      ]
    },
    {
      id: 'services',
      name: 'Service Revenue',
      amount: 3000000,
      isExpanded: false,
      items: [
        { id: 'consulting', name: 'Consulting', amount: 2000000 },
        { id: 'maintenance', name: 'Maintenance', amount: 1000000 }
      ]
    },
    {
      id: 'other-income',
      name: 'Other Income',
      amount: 500000,
      isExpanded: false,
      items: [
        { id: 'interest', name: 'Interest Income', amount: 300000 },
        { id: 'rental', name: 'Rental Income', amount: 200000 }
      ]
    }
  ];

  const defaultExpenseCategories: BudgetCategory[] = [
    {
      id: 'cogs',
      name: 'Cost of Goods Sold',
      amount: 2500000,
      isExpanded: false,
      items: [
        { id: 'materials', name: 'Raw Materials', amount: 1500000 },
        { id: 'labor', name: 'Direct Labor', amount: 1000000 }
      ]
    },
    {
      id: 'operating',
      name: 'Operating Expenses',
      amount: 3000000,
      isExpanded: false,
      items: [
        { id: 'rent', name: 'Rent & Utilities', amount: 1000000 },
        { id: 'salaries', name: 'Salaries', amount: 1500000 },
        { id: 'marketing', name: 'Marketing', amount: 500000 }
      ]
    },
    {
      id: 'taxes',
      name: 'Taxes & Compliance',
      amount: 800000,
      isExpanded: false,
      items: [
        { id: 'corporate-tax', name: 'Corporate Tax', amount: 500000 },
        { id: 'vat', name: 'VAT', amount: 300000 }
      ]
    }
  ];

  // State
  const [formData, setFormData] = useState<BudgetFormData>({
    budgetName: 'Business Budget 2024',
    budgetPeriod: 'monthly',
    incomeCategories: defaultIncomeCategories,
    expenseCategories: defaultExpenseCategories
  });
  
  const [summary, setSummary] = useState<BudgetSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    netCashflow: 0,
    savingsRate: 0
  });
  
  const [originalData, setOriginalData] = useState<BudgetFormData | null>(null);
  const [scenarioMode, setScenarioMode] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Calculate budget summary
  const calculateSummary = (income = formData.incomeCategories, expenses = formData.expenseCategories) => {
    const totalIncome = income.reduce((acc, category) => acc + category.amount, 0);
    const totalExpenses = expenses.reduce((acc, category) => acc + category.amount, 0);
    const netCashflow = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netCashflow / totalIncome) * 100 : 0;
    
    return {
      totalIncome,
      totalExpenses,
      netCashflow,
      savingsRate
    };
  };

  // Update summary when data changes
  useEffect(() => {
    const newSummary = calculateSummary();
    setSummary(newSummary);
  }, [formData.incomeCategories, formData.expenseCategories]);

  // Handle basic form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle category changes
  const handleCategoryChange = (id: string, value: number, isIncome: boolean) => {
    try {
      const categories = isIncome ? [...formData.incomeCategories] : [...formData.expenseCategories];
      const categoryIndex = categories.findIndex(cat => cat.id === id);
      
      if (categoryIndex !== -1) {
        categories[categoryIndex] = {
          ...categories[categoryIndex],
          amount: value
        };
        
        setFormData({
          ...formData,
          [isIncome ? 'incomeCategories' : 'expenseCategories']: categories
        });
      }
    } catch (error) {
      ErrorHandler.logError(error as Error, 'BudgetImpactSimulator.handleCategoryChange');
    }
  };

  // Handle subcategory changes
  const handleSubcategoryChange = (categoryId: string, itemId: string, value: number, isIncome: boolean) => {
    const categories = isIncome ? [...formData.incomeCategories] : [...formData.expenseCategories];
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    
    if (categoryIndex !== -1 && categories[categoryIndex].items) {
      const items = [...categories[categoryIndex].items!];
      const itemIndex = items.findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        items[itemIndex] = {
          ...items[itemIndex],
          amount: value
        };
        
        const newTotal = items.reduce((acc, item) => acc + item.amount, 0);
        categories[categoryIndex] = {
          ...categories[categoryIndex],
          amount: newTotal,
          items: items
        };
        
        setFormData({
          ...formData,
          [isIncome ? 'incomeCategories' : 'expenseCategories']: categories
        });
      }
    }
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (id: string, isIncome: boolean) => {
    const categories = isIncome ? [...formData.incomeCategories] : [...formData.expenseCategories];
    const categoryIndex = categories.findIndex(cat => cat.id === id);
    
    if (categoryIndex !== -1) {
      categories[categoryIndex] = {
        ...categories[categoryIndex],
        isExpanded: !categories[categoryIndex].isExpanded
      };
      
      setFormData({
        ...formData,
        [isIncome ? 'incomeCategories' : 'expenseCategories']: categories
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      validateRequired(formData.budgetName, 'Budget Name');
      setShowResults(true);
    } catch (error) {
      ErrorHandler.logError(error as Error, 'BudgetImpactSimulator.handleSubmit');
    }
  };

  // Apply scenario
  const applyScenario = (scenario: ScenarioData) => {
    if (!originalData) {
      setOriginalData({ ...formData });
    }

    const adjustedIncome = formData.incomeCategories.map(category => ({
      ...category,
      amount: category.amount * (1 + scenario.salesGrowth / 100)
    }));

    const adjustedExpenses = formData.expenseCategories.map(category => ({
      ...category,
      amount: category.amount * (1 - scenario.costReduction / 100)
    }));

    // Add new revenue and expenses if specified
    if (scenario.newRevenue > 0) {
      adjustedIncome.push({
        id: 'new-revenue',
        name: 'New Revenue Stream',
        amount: scenario.newRevenue,
        isExpanded: false
      });
    }

    if (scenario.additionalExpenses > 0) {
      adjustedExpenses.push({
        id: 'additional-expenses',
        name: 'Additional Expenses',
        amount: scenario.additionalExpenses,
        isExpanded: false
      });
    }

    setFormData({
      ...formData,
      incomeCategories: adjustedIncome,
      expenseCategories: adjustedExpenses
    });

    setScenarioMode(true);
    setShowResults(true);
  };

  // Reset scenario
  const resetScenario = () => {
    if (originalData) {
      setFormData(originalData);
      setOriginalData(null);
    }
    setScenarioMode(false);
  };

  return (
    <CalculatorLayout
      title="Budget Impact Simulator"
      description="Create comprehensive budgets and analyze financial scenarios to optimize your business performance."
      icon={BarChart4}
      activeCalculator="budget-impact"
    >
      <div className="space-y-8">
        {/* Budget Configuration */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Budget Configuration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Name
                </label>
                <input
                  type="text"
                  name="budgetName"
                  value={formData.budgetName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter budget name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Period
                </label>
                <select
                  name="budgetPeriod"
                  value={formData.budgetPeriod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Calculate Budget
              </button>
            </div>
          </form>
        </div>

        {/* Budget Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Categories */}
          <BudgetCategoryForm
            categories={formData.incomeCategories}
            isIncome={true}
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={handleSubcategoryChange}
            onToggleExpansion={toggleCategoryExpansion}
          />

          {/* Expense Categories */}
          <BudgetCategoryForm
            categories={formData.expenseCategories}
            isIncome={false}
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={handleSubcategoryChange}
            onToggleExpansion={toggleCategoryExpansion}
          />
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-8">
            {/* Budget Summary */}
            <BudgetSummaryCard
              summary={summary}
              budgetPeriod={formData.budgetPeriod}
              showAnalysis={true}
            />

            {/* Scenario Analysis */}
            <BudgetScenarioAnalysis
              currentSummary={summary}
              onApplyScenario={applyScenario}
              onResetScenario={resetScenario}
              isScenarioActive={scenarioMode}
            />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BudgetImpactSimulator;