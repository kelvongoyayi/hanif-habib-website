import React, { useState, useEffect } from 'react';
import { CreditCard, Info, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import CalculatorLayout from '../components/CalculatorLayout';
import Button from '../../../shared/components/ui/Button';
import { formatCurrency } from '../../../shared/utils/formatters';
import { ErrorHandler, validateNumber } from '../../../shared/utils/errorHandling';

interface TaxFormData {
  grossIncome: number;
  employeeType: 'resident' | 'non-resident';
  hasSDL: boolean;
  hasWCF: boolean;
  dependents: number;
  deductions: number;
  otherIncome: number;
}

interface TaxResults {
  taxableIncome: number;
  incomeTax: number;
  payeTax: number;
  sdl: number;
  wcf: number;
  netIncome: number;
  effectiveTaxRate: number;
  taxBreakdown: {
    label: string;
    amount: number;
    rate: string;
    color: string;
  }[];
}

const TaxPlanningTools = () => {
  // Initialize form state
  const [formData, setFormData] = useState<TaxFormData>({
    grossIncome: 1000000, // Default monthly income in TZS
    employeeType: 'resident',
    hasSDL: true,
    hasWCF: true,
    dependents: 0,
    deductions: 0,
    otherIncome: 0,
  });

  const [results, setResults] = useState<TaxResults | null>(null);
  const [calculationMode, setCalculationMode] = useState<'monthly' | 'annually'>('monthly');
  const [showHelp, setShowHelp] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    try {
      const { name, value, type } = e.target;
      
      // For checkbox inputs
      if (type === 'checkbox') {
        const checkbox = e.target as HTMLInputElement;
        setFormData({
          ...formData,
          [name]: checkbox.checked
        });
        return;
      }
      
      // For number inputs
      if (name === 'grossIncome' || name === 'dependents' || name === 'deductions' || name === 'otherIncome') {
        const numericValue = parseFloat(value) || 0;
        validateNumber(numericValue, name, 0);
        setFormData({
          ...formData,
          [name]: numericValue
        });
      } else {
        // For other inputs
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } catch (error) {
      ErrorHandler.logError(error as Error, 'TaxPlanningTools.handleInputChange');
    }
  };
  
  // Calculate tax
  const calculateTax = () => {
    // Get annual values based on calculation mode
    const annualFactor = calculationMode === 'monthly' ? 12 : 1;
    const annualGrossIncome = formData.grossIncome * annualFactor;
    const annualOtherIncome = formData.otherIncome * annualFactor;
    const annualDeductions = formData.deductions * annualFactor;
    
    // Skills and Development Levy (SDL) - 4.5% of gross pay
    const sdl = formData.hasSDL ? annualGrossIncome * 0.045 : 0;
    
    // Workers Compensation Fund (WCF) - 1% of gross pay
    const wcf = formData.hasWCF ? annualGrossIncome * 0.01 : 0;
    
    // Taxable income
    const taxableIncome = annualGrossIncome + annualOtherIncome - annualDeductions;
    
    // Calculate income tax based on Tanzania progressive tax rates (2023/2024)
    let incomeTax = 0;
    let taxBreakdown = [];
    
    if (formData.employeeType === 'resident') {
      // Tax brackets for residents
      if (taxableIncome <= 3240000) { // 270,000 * 12 months
        incomeTax = 0;
        taxBreakdown.push({
          label: '0-3,240,000',
          amount: taxableIncome,
          rate: '0%',
          color: '#38bdf8' // Light blue
        });
      } else if (taxableIncome <= 6240000) { // 520,000 * 12 months
        const firstBracket = 3240000;
        const secondBracketAmount = taxableIncome - firstBracket;
        incomeTax = secondBracketAmount * 0.09;
        
        taxBreakdown.push({
          label: '0-3,240,000',
          amount: firstBracket,
          rate: '0%',
          color: '#38bdf8' // Light blue
        });
        taxBreakdown.push({
          label: '3,240,001-6,240,000',
          amount: secondBracketAmount,
          rate: '9%',
          color: '#60a5fa' // Blue
        });
      } else if (taxableIncome <= 9240000) { // 770,000 * 12 months
        const firstBracket = 3240000;
        const secondBracket = 3000000;
        const thirdBracketAmount = taxableIncome - firstBracket - secondBracket;
        
        incomeTax = (secondBracket * 0.09) + (thirdBracketAmount * 0.2);
        
        taxBreakdown.push({
          label: '0-3,240,000',
          amount: firstBracket,
          rate: '0%',
          color: '#38bdf8' // Light blue
        });
        taxBreakdown.push({
          label: '3,240,001-6,240,000',
          amount: secondBracket,
          rate: '9%',
          color: '#60a5fa' // Blue
        });
        taxBreakdown.push({
          label: '6,240,001-9,240,000',
          amount: thirdBracketAmount,
          rate: '20%',
          color: '#3b82f6' // Medium blue
        });
      } else if (taxableIncome <= 12240000) { // 1,020,000 * 12 months
        const firstBracket = 3240000;
        const secondBracket = 3000000;
        const thirdBracket = 3000000;
        const fourthBracketAmount = taxableIncome - firstBracket - secondBracket - thirdBracket;
        
        incomeTax = (secondBracket * 0.09) + (thirdBracket * 0.2) + (fourthBracketAmount * 0.25);
        
        taxBreakdown.push({
          label: '0-3,240,000',
          amount: firstBracket,
          rate: '0%',
          color: '#38bdf8' // Light blue
        });
        taxBreakdown.push({
          label: '3,240,001-6,240,000',
          amount: secondBracket,
          rate: '9%',
          color: '#60a5fa' // Blue
        });
        taxBreakdown.push({
          label: '6,240,001-9,240,000',
          amount: thirdBracket,
          rate: '20%',
          color: '#3b82f6' // Medium blue
        });
        taxBreakdown.push({
          label: '9,240,001-12,240,000',
          amount: fourthBracketAmount,
          rate: '25%',
          color: '#2563eb' // Dark blue
        });
      } else {
        const firstBracket = 3240000;
        const secondBracket = 3000000;
        const thirdBracket = 3000000;
        const fourthBracket = 3000000;
        const fifthBracketAmount = taxableIncome - firstBracket - secondBracket - thirdBracket - fourthBracket;
        
        incomeTax = (secondBracket * 0.09) + (thirdBracket * 0.2) + (fourthBracket * 0.25) + (fifthBracketAmount * 0.3);
        
        taxBreakdown.push({
          label: '0-3,240,000',
          amount: firstBracket,
          rate: '0%',
          color: '#38bdf8' // Light blue
        });
        taxBreakdown.push({
          label: '3,240,001-6,240,000',
          amount: secondBracket,
          rate: '9%',
          color: '#60a5fa' // Blue
        });
        taxBreakdown.push({
          label: '6,240,001-9,240,000',
          amount: thirdBracket,
          rate: '20%',
          color: '#3b82f6' // Medium blue
        });
        taxBreakdown.push({
          label: '9,240,001-12,240,000',
          amount: fourthBracket,
          rate: '25%',
          color: '#2563eb' // Dark blue
        });
        taxBreakdown.push({
          label: 'Above 12,240,000',
          amount: fifthBracketAmount,
          rate: '30%',
          color: '#1e40af' // Darker blue
        });
      }
    } else {
      // For non-residents, flat 15% tax rate
      incomeTax = taxableIncome * 0.15;
      taxBreakdown.push({
        label: 'Non-resident Income',
        amount: taxableIncome,
        rate: '15%',
        color: '#3b82f6' // Medium blue
      });
    }
    
    // Dependents tax relief - 45,000 TZS per dependent
    const dependentRelief = Math.min(formData.dependents, 4) * 45000;
    
    // Final PAYE calculation
    const payeTax = Math.max(0, incomeTax - dependentRelief);
    
    // Net income
    const netIncome = taxableIncome - payeTax - sdl - wcf;
    
    // Effective tax rate
    const effectiveTaxRate = (payeTax / taxableIncome) * 100;
    
    setResults({
      taxableIncome,
      incomeTax,
      payeTax,
      sdl,
      wcf,
      netIncome,
      effectiveTaxRate,
      taxBreakdown,
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTax();
  };
  
  // Using shared formatCurrency utility
  
  // Reset results when calculation mode changes
  useEffect(() => {
    if (results) {
      calculateTax();
    }
  }, [calculationMode]);

  return (
    <CalculatorLayout
      title="Tax Planning Tools"
      description="Estimate and plan your tax obligations based on Tanzanian tax regulations"
      icon={CreditCard}
      activeCalculator="tax-planning"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div>
          <div className="bg-white shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-bold">Income Tax Calculator</h2>
              
              {/* Mode Switch */}
              <div className="bg-gray-100 p-1 rounded-lg">
                <button
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    calculationMode === 'monthly'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setCalculationMode('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    calculationMode === 'annually'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setCalculationMode('annually')}
                >
                  Annually
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Gross Income */}
              <div>
                <label htmlFor="grossIncome" className="block text-sm font-medium text-gray-700 mb-1">
                  Gross {calculationMode === 'monthly' ? 'Monthly' : 'Annual'} Income (TZS)
                </label>
                <input
                  type="number"
                  id="grossIncome"
                  name="grossIncome"
                  value={formData.grossIncome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              {/* Employee Type */}
              <div>
                <label htmlFor="employeeType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Residency Status
                </label>
                <select
                  id="employeeType"
                  name="employeeType"
                  value={formData.employeeType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="resident">Tanzanian Resident</option>
                  <option value="non-resident">Non-Resident</option>
                </select>
              </div>
              
              {/* Levies */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Applicable Levies</label>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasSDL"
                    name="hasSDL"
                    checked={formData.hasSDL}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="hasSDL" className="ml-2 text-sm text-gray-700">
                    Skills and Development Levy (SDL) - 4.5%
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasWCF"
                    name="hasWCF"
                    checked={formData.hasWCF}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="hasWCF" className="ml-2 text-sm text-gray-700">
                    Workers Compensation Fund (WCF) - 1%
                  </label>
                </div>
              </div>
              
              {/* Dependents */}
              <div>
                <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Dependents (Max 4)
                </label>
                <input
                  type="number"
                  id="dependents"
                  name="dependents"
                  min="0"
                  max="4"
                  value={formData.dependents}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Tax relief: TZS 45,000 per dependent (annually)</p>
              </div>
              
              {/* Other Deductions */}
              <div>
                <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 mb-1">
                  Total {calculationMode === 'monthly' ? 'Monthly' : 'Annual'} Deductions (TZS)
                </label>
                <input
                  type="number"
                  id="deductions"
                  name="deductions"
                  min="0"
                  value={formData.deductions}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Include pension contributions, approved charitable donations, etc.</p>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300 font-medium"
                >
                  Calculate Tax
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center text-primary hover:text-primary-dark text-sm font-medium"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              {showHelp ? 'Hide Help' : 'Show Calculation Help'}
            </button>
            
            {showHelp && (
              <div className="mt-4 bg-gray-50 p-6 rounded-lg text-sm text-gray-700">
                <h3 className="font-medium text-gray-900 mb-3">Tax Calculation Method</h3>
                <p className="mb-2">
                  This calculator uses the 2023/2024 Tanzania income tax rates for individuals:
                </p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Annual Taxable Income (TZS)</th>
                      <th className="p-2 text-right">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-2">0 - 3,240,000</td>
                      <td className="p-2 text-right">0%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2">3,240,001 - 6,240,000</td>
                      <td className="p-2 text-right">9%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2">6,240,001 - 9,240,000</td>
                      <td className="p-2 text-right">20%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2">9,240,001 - 12,240,000</td>
                      <td className="p-2 text-right">25%</td>
                    </tr>
                    <tr>
                      <td className="p-2">Above 12,240,000</td>
                      <td className="p-2 text-right">30%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4">
                  Non-residents are taxed at a flat rate of 15% of their taxable income.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Results */}
        <div>
          {results ? (
            <div className="bg-white shadow-md p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <h2 className="text-xl font-heading font-bold">Tax Calculation Summary</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Taxable Income</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(results.taxableIncome)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {calculationMode === 'monthly' 
                        ? `(${formatCurrency(results.taxableIncome / 12)} monthly)` 
                        : `(${formatCurrency(results.taxableIncome * 1)} annually)`}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Income Tax (PAYE)</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(results.payeTax)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {calculationMode === 'monthly' 
                        ? `(${formatCurrency(results.payeTax / 12)} monthly)` 
                        : `(${formatCurrency(results.payeTax * 1)} annually)`}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">SDL (4.5%)</p>
                    <p className="text-xl font-bold text-accent-orange">
                      {formData.hasSDL ? formatCurrency(results.sdl) : 'N/A'}
                    </p>
                    {formData.hasSDL && (
                      <p className="text-xs text-gray-500 mt-1">
                        {calculationMode === 'monthly' 
                          ? `(${formatCurrency(results.sdl / 12)} monthly)` 
                          : `(${formatCurrency(results.sdl * 1)} annually)`}
                      </p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">WCF (1%)</p>
                    <p className="text-xl font-bold text-accent-orange">
                      {formData.hasWCF ? formatCurrency(results.wcf) : 'N/A'}
                    </p>
                    {formData.hasWCF && (
                      <p className="text-xs text-gray-500 mt-1">
                        {calculationMode === 'monthly' 
                          ? `(${formatCurrency(results.wcf / 12)} monthly)` 
                          : `(${formatCurrency(results.wcf * 1)} annually)`}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="bg-primary/10 p-6 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-heading font-bold text-primary text-lg">Net Income</p>
                      <p className="text-sm text-gray-600">After tax and levies</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{formatCurrency(results.netIncome)}</p>
                      <p className="text-sm text-gray-600">
                        {calculationMode === 'monthly' 
                          ? `(${formatCurrency(results.netIncome / 12)} monthly)` 
                          : `(${formatCurrency(results.netIncome * 1)} annually)`}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Effective Tax Rate */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Effective Tax Rate</p>
                  <p className="text-xl font-bold text-primary">
                    {results.effectiveTaxRate.toFixed(2)}%
                  </p>
                </div>
                
                {/* Tax Breakdown */}
                <div>
                  <h3 className="font-heading font-bold mb-3">Tax Breakdown</h3>
                  <div className="space-y-2">
                    {results.taxBreakdown.map((bracket, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span 
                            className="w-4 h-4 rounded-sm mr-2" 
                            style={{ backgroundColor: bracket.color }}
                          ></span>
                          <span className="text-sm text-gray-600">{bracket.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{formatCurrency(bracket.amount)}</span>
                          <span className="ml-2 text-xs text-gray-500">({bracket.rate})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-accent-orange/10 p-4 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-accent-orange mr-3" />
                  <p className="text-sm text-gray-700">
                    This calculation is an estimate based on Tanzania's tax regulations for 2023/2024.
                    For personalized tax planning advice, please consult with our tax experts.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md p-8">
              <h2 className="text-xl font-heading font-bold mb-6">Tanzania Tax Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Personal Income Tax</h3>
                    <p className="text-sm text-gray-600">
                      Tanzania uses a progressive tax system for residents with rates ranging from 0% to 30%.
                      Non-residents are taxed at a flat rate of 15% of their total income.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Skills and Development Levy (SDL)</h3>
                    <p className="text-sm text-gray-600">
                      Employers are required to pay SDL at 4.5% of gross monthly emoluments. 
                      This is an employer's obligation and not deducted from employees' salaries.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Workers Compensation Fund (WCF)</h3>
                    <p className="text-sm text-gray-600">
                      Employers contribute 1% of the monthly wage bill to the Workers Compensation Fund.
                      Like SDL, this is an employer's expense, not a deduction from employee salaries.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Tax Relief for Dependents</h3>
                    <p className="text-sm text-gray-600">
                      Taxpayers can claim a tax relief of TZS 45,000 per year for up to 4 dependents.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-4">
                  Use this calculator to estimate your income tax liability based on Tanzania's current tax regulations.
                  Complete the form on the left to see a breakdown of your tax obligations.
                </p>
                
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    // Demo calculation with default values
                    calculateTax();
                  }}
                >
                  Generate Sample Calculation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default TaxPlanningTools;