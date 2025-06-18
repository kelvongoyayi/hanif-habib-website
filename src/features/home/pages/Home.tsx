import React from 'react';
import Layout from '../../../shared/components/layout/Layout';
import Hero from '../components/Hero';
import ServiceHighlights from '../components/ServiceHighlights';
import AboutSnippet from '../components/AboutSnippet';
import ClientSectors from '../components/ClientSectors';
import Testimonials from '../components/Testimonials';
import Awards from '../components/Awards';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <AboutSnippet />
      <ServiceHighlights />
      <ClientSectors />
      <Testimonials />
      <Awards />
      <CallToAction />
    </Layout>
  );
};

export default Home;