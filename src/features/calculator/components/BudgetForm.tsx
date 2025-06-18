import React from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../shared/utils/formatters';
import { validateNumber } from '../../../shared/utils/errorHandling';

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  isIncome?: boolean;
  isExpanded?: boolean;
  items?: {
    id: string;
    name: string;
    amount: number;
  }[];
}

interface BudgetFormProps {
  categories: BudgetCategory[];
  onCategoryChange: (id: string, amount: number, isIncome: boolean) => void;
  onSubcategoryChange: (categoryId: string, itemId: string, amount: number, isIncome: boolean) => void;
  onToggleExpansion: (id: string, isIncome: boolean) => void;
  onAddCategory: (isIncome: boolean) => void;
  onRemoveCategory: (id: string, isIncome: boolean) => void;
  isIncome: boolean;
  title: string;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  categories,
  onCategoryChange,
  onSubcategoryChange,
  onToggleExpansion,
  onAddCategory,
  onRemoveCategory,
  isIncome,
  title
}) => {
  const handleCategoryAmountChange = (categoryId: string, value: string) => {
    try {
      const numericValue = parseFloat(value) || 0;
      validateNumber(numericValue, 'Amount', 0);
      onCategoryChange(categoryId, numericValue, isIncome);
    } catch (error) {
      console.error('Invalid category amount:', error);
    }
  };

  const handleSubcategoryAmountChange = (categoryId: string, itemId: string, value: string) => {
    try {
      const numericValue = parseFloat(value) || 0;
      validateNumber(numericValue, 'Subcategory Amount', 0);
      onSubcategoryChange(categoryId, itemId, numericValue, isIncome);
    } catch (error) {
      console.error('Invalid subcategory amount:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <button
          onClick={() => onAddCategory(isIncome)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-lg">
            {/* Main Category Row */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => onToggleExpansion(category.id, isIncome)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={category.isExpanded ? 'Collapse' : 'Expand'}
                >
                  {category.isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
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
                    placeholder="0"
                    min="0"
                    step="1000"
                  />
                </div>
                
                <div className="text-right min-w-[120px]">
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(category.amount)}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveCategory(category.id, isIncome)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  aria-label="Remove category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Subcategories */}
            {category.isExpanded && category.items && category.items.length > 0 && (
              <div className="border-t border-gray-200 bg-gray-50">
                {category.items.map((item) => (
                  <div key={item.id} className="p-4 pl-12 flex items-center justify-between">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">
                        {item.name}
                      </label>
                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleSubcategoryAmountChange(category.id, item.id, e.target.value)}
                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="0"
                        min="0"
                        step="100"
                      />
                    </div>
                    
                    <div className="text-right min-w-[120px] ml-4">
                      <div className="text-sm font-medium text-gray-700">
                        {formatCurrency(item.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Category Total */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">
            Total {title}
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

export default BudgetForm; 