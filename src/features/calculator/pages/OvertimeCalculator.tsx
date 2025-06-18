import React, { useState } from 'react';
import { Clock, Info, AlertCircle, CheckCircle } from 'lucide-react';
import CalculatorLayout from '../components/CalculatorLayout';
import { CardContainer } from '../../../shared/components/ui/CardContainer';
import { formatCurrency } from '../../../shared/utils/formatters';

interface OvertimeFormData {
  basicSalary: number;
  regularHours: number;
  overtimeHours: number;
  dayType: 'weekday' | 'weekend' | 'holiday';
  overtimeRate: number;
}

const OvertimeCalculator = () => {
  // Initialize state
  const [formData, setFormData] = useState<OvertimeFormData>({
    basicSalary: 800000, // Default salary in TZS
    regularHours: 8,
    overtimeHours: 2,
    dayType: 'weekday',
    overtimeRate: 1.5, // Default overtime rate for weekdays (1.5x)
  });
  
  const [results, setResults] = useState({
    hourlyRate: 0,
    overtimeRate: 0,
    overtimePay: 0,
    totalPay: 0,
  });
  
  const [showResults, setShowResults] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // For number inputs, convert to numbers
    if (name === 'basicSalary' || name === 'regularHours' || name === 'overtimeHours') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else if (name === 'dayType') {
      // Update overtime rate based on day type
      let newRate = 1.5; // Weekday default
      
      if (value === 'weekend') {
        newRate = 2.0; // Weekend rate
      } else if (value === 'holiday') {
        newRate = 2.5; // Public holiday rate
      }
      
      setFormData({
        ...formData,
        dayType: value as 'weekday' | 'weekend' | 'holiday',
        overtimeRate: newRate
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Calculate overtime pay
  const calculateOvertime = () => {
    // Calculate monthly hourly rate (based on 22 working days, 8 hours per day)
    const workingHoursPerMonth = 22 * formData.regularHours;
    const hourlyRate = formData.basicSalary / workingHoursPerMonth;
    
    // Calculate overtime rate
    const overtimeRateAmount = hourlyRate * formData.overtimeRate;
    
    // Calculate overtime pay
    const overtimePay = overtimeRateAmount * formData.overtimeHours;
    
    // Calculate total pay (basic salary + overtime)
    const totalPay = formData.basicSalary + overtimePay;
    
    // Set results
    setResults({
      hourlyRate: hourlyRate,
      overtimeRate: overtimeRateAmount,
      overtimePay: overtimePay,
      totalPay: totalPay
    });
    
    setShowResults(true);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateOvertime();
  };

  return (
    <CalculatorLayout
      title="Overtime Calculator"
      description="Calculate overtime pay based on Tanzanian labor regulations"
      icon={Clock}
      activeCalculator="overtime"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div>
          <CardContainer shadow="md" padding="lg" className="mb-6">
            <h2 className="text-xl font-heading font-bold mb-6">Employee Overtime Calculator</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Salary */}
              <div>
                <label htmlFor="basicSalary" className="block text-sm font-medium text-gray-700 mb-1">
                  Basic Monthly Salary (TZS)
                </label>
                <input
                  type="number"
                  id="basicSalary"
                  name="basicSalary"
                  min="0"
                  value={formData.basicSalary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              {/* Regular Hours */}
              <div>
                <label htmlFor="regularHours" className="block text-sm font-medium text-gray-700 mb-1">
                  Regular Working Hours Per Day
                </label>
                <input
                  type="number"
                  id="regularHours"
                  name="regularHours"
                  min="1"
                  max="24"
                  step="0.5"
                  value={formData.regularHours}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              {/* Overtime Hours */}
              <div>
                <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700 mb-1">
                  Overtime Hours
                </label>
                <input
                  type="number"
                  id="overtimeHours"
                  name="overtimeHours"
                  min="0"
                  max="24"
                  step="0.5"
                  value={formData.overtimeHours}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              {/* Day Type */}
              <div>
                <label htmlFor="dayType" className="block text-sm font-medium text-gray-700 mb-1">
                  Day Type
                </label>
                <select
                  id="dayType"
                  name="dayType"
                  value={formData.dayType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="weekday">Weekday (Mon-Fri)</option>
                  <option value="weekend">Weekend (Sat-Sun)</option>
                  <option value="holiday">Public Holiday</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Rate: {formData.dayType === 'weekday' ? '1.5x' : formData.dayType === 'weekend' ? '2.0x' : '2.5x'}
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors duration-300 font-medium"
              >
                Calculate Overtime Pay
              </button>
            </form>
          </CardContainer>
          
          <div className="bg-primary/5 p-6 rounded-lg">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">About This Calculator</h3>
                <p className="text-sm text-gray-600">
                  This calculator uses overtime rates based on Tanzanian labor regulations:
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Weekdays: 1.5x regular hourly rate</li>
                  <li>• Weekends: 2.0x regular hourly rate</li>
                  <li>• Public holidays: 2.5x regular hourly rate</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  The hourly rate is calculated based on a standard 22-day work month.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div>
          {showResults ? (
            <CardContainer shadow="md" padding="lg">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <h2 className="text-xl font-heading font-bold">Calculation Results</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Hourly Rate</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(results.hourlyRate)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Overtime Rate</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(results.overtimeRate)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Overtime Pay</p>
                    <p className="text-xl font-bold text-accent-orange">{formatCurrency(results.overtimePay)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Regular Monthly Salary</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(formData.basicSalary)}</p>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-6 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="font-heading font-bold text-primary text-lg">Total Monthly Pay</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(results.totalPay)}</p>
                  </div>
                </div>
                
                <div className="bg-accent-orange/10 p-4 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-accent-orange mr-3" />
                  <p className="text-sm text-gray-700">
                    This calculation is an estimate based on standard overtime rates in Tanzania. 
                    For specific industry regulations or collective agreements, please consult with our HR experts.
                  </p>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-primary font-medium hover:text-primary-dark transition-colors duration-300"
                  >
                    Adjust Calculation
                  </button>
                </div>
              </div>
            </CardContainer>
          ) : (
            <CardContainer shadow="md" padding="lg" className="h-full">
              <h2 className="text-xl font-heading font-bold mb-6">How to Use This Calculator</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Enter Basic Salary</h3>
                    <p className="text-gray-600 text-sm">
                      Enter the employee's basic monthly salary in Tanzanian Shillings (TZS).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Specify Working Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Enter the employee's regular working hours per day and the number of overtime hours.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Select Day Type</h3>
                    <p className="text-gray-600 text-sm">
                      Choose whether the overtime is performed on a weekday, weekend, or public holiday to apply the appropriate rate.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Calculate Results</h3>
                    <p className="text-gray-600 text-sm">
                      Click the Calculate button to see the hourly rate, overtime rate, overtime pay, and total monthly compensation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-sm">
                  This calculator uses the standard overtime calculation formula based on Tanzanian employment regulations. Results are estimates and may vary based on specific employment contracts and collective agreements.
                </p>
              </div>
            </CardContainer>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default OvertimeCalculator;