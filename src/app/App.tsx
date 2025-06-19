import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/styles.css';
import { HomePage } from '../features/home';
import { AboutPage, AwardsPage } from '../features/about';
import { ServicesPage } from '../features/services';
import { Contact } from '../shared/components';
import { ResourcesPage } from '../features/resources';
import { MediaPage } from '../features/media';
import { Team } from '../features/team';
import ServiceTemplate from '../features/services/pages/ServiceTemplate';
import { CalculatorPage } from '../features/calculator';
import OvertimeCalculator from '../features/calculator/pages/OvertimeCalculator';
import TaxPlanningTools from '../features/calculator/pages/TaxPlanningTools';
import BudgetImpactSimulator from '../features/calculator/pages/BudgetImpactSimulator';
import ScrollToTop from '../shared/components/utils/ScrollToTop';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceTemplate />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/calculator/overtime" element={<OvertimeCalculator />} />
        <Route path="/calculator/tax-planning" element={<TaxPlanningTools />} />
        <Route path="/calculator/budget-impact" element={<BudgetImpactSimulator />} />
      </Routes>
    </Router>
  );
}

export default App;