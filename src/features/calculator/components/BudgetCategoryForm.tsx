import React from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../shared/utils/formatters';
import { ErrorHandler, validateNumber } from '../../../shared/utils/errorHandling';

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
}

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  isExpanded?: boolean;
  items?: BudgetItem[];
}

interface BudgetCategoryFormProps {
  categories: BudgetCategory[];
  isIncome: boolean;
  onCategoryChange: (id: string, value: number, isIncome: boolean) => void;
  onSubcategoryChange: (categoryId: string, itemId: string, value: number, isIncome: boolean) => void;
  onToggleExpansion: (id: string, isIncome: boolean) => void;
  onAddCategory?: () => void;
  onRemoveCategory?: (id: string) => void;
}

const BudgetCategoryForm: React.FC<BudgetCategoryFormProps> = ({
  categories,
  isIncome,
  onCategoryChange,
  onSubcategoryChange,
  onToggleExpansion,
  onAddCategory,
  onRemoveCategory
}) => {
  const handleCategoryAmountChange = (categoryId: string, value: string) => {
    try {
      const numericValue = parseFloat(value) || 0;
      validateNumber(numericValue, 'Amount', 0);
      onCategoryChange(categoryId, numericValue, isIncome);
    } catch (error) {
      ErrorHandler.logError(error as Error, 'BudgetCategoryForm.handleCategoryAmountChange');
    }
  };

  const handleSubcategoryAmountChange = (categoryId: string, itemId: string, value: string) => {
    try {
      const numericValue = parseFloat(value) || 0;
      validateNumber(numericValue, 'Amount', 0);
      onSubcategoryChange(categoryId, itemId, numericValue, isIncome);
    } catch (error) {
      ErrorHandler.logError(error as Error, 'BudgetCategoryForm.handleSubcategoryAmountChange');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {isIncome ? 'Income Categories' : 'Expense Categories'}
        </h3>
        {onAddCategory && (
          <button
            onClick={onAddCategory}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Category
          </button>
        )}
      </div>

      {categories.map((category) => (
        <div key={category.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Main Category */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <button
                  onClick={() => onToggleExpansion(category.id, isIncome)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                  aria-label={`${category.isExpanded ? 'Collapse' : 'Expand'} ${category.name}`}
                >
                  {category.isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  )}
                </button>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {category.name}
                  </label>
                  <input
                    type="number"
                    value={category.amount}
                    onChange={(e) => handleCategoryAmountChange(category.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter amount"
                    min="0"
                    step="1000"
                  />
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(category.amount)}
                  </div>
                  {category.items && category.items.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {category.items.length} item{category.items.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
              
              {onRemoveCategory && (
                <button
                  onClick={() => onRemoveCategory(category.id)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors duration-200"
                  aria-label={`Remove ${category.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Subcategories */}
          {category.isExpanded && category.items && category.items.length > 0 && (
            <div className="p-4 space-y-3">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Breakdown:</h4>
              {category.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 pl-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">
                      {item.name}
                    </label>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleSubcategoryAmountChange(category.id, item.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="Enter amount"
                      min="0"
                      step="1000"
                    />
                  </div>
                  
                  <div className="text-right min-w-[120px]">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Subcategory Total */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(category.items.reduce((sum, item) => sum + item.amount, 0))}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Category Total */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">
            Total {isIncome ? 'Income' : 'Expenses'}:
          </span>
          <span className={`text-xl font-bold ${
            isIncome ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatCurrency(categories.reduce((sum, cat) => sum + cat.amount, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCategoryForm; 