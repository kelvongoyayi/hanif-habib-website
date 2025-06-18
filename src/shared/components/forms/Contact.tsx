import React, { useState } from 'react';
import Layout from '../layout/Layout';
import PageHeader from '../ui/PageHeader';
import ContentSection from '../ui/ContentSection';
import Button from '../ui/Button';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { ErrorHandler, validateEmail, validateRequired } from '../../utils/errorHandling';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate form fields
      validateRequired(formState.name, 'Name');
      validateRequired(formState.email, 'Email');
      validateEmail(formState.email);
      validateRequired(formState.message, 'Message');
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formState);
      setIsSuccess(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while submitting the form. Please try again.';
      setError(errorMessage);
      ErrorHandler.logError(err as Error, 'Contact.handleSubmit');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Page Header */}
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team of experts for any inquiries or assistance"
        backgroundImage="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      {/* Contact Information & Form */}
      <ContentSection bgColor="bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-md h-full">
              <h2 className="text-2xl font-heading font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900">Phone</h3>
                    <p className="text-gray-700 mt-1">
                      <a href="tel:+255785020404" className="hover:text-primary transition-colors">
                        +255 785 020404
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-accent-orange/10 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-accent-orange" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900">Email</h3>
                    <p className="text-gray-700 mt-1">
                      <a href="mailto:hhabib@habibadvisory.co.tz" className="hover:text-primary transition-colors">
                        hhabib@habibadvisory.co.tz
                      </a>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="bg-accent-red/10 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900">Our Location</h3>
                    <p className="text-gray-700 mt-1">
                      P. O. Box 21885, GAK Patel Building (opposite CMC Auto Select)<br />
                      Kisutu Street, 1st Floor, <br />
                      City Centre, Dar es Salaam, Tanzania
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900">Office Hours</h3>
                    <p className="text-gray-700 mt-1">
                      Monday - Friday: 8:30 AM - 5:30 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-md">
              <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 mb-6">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSuccess(false)} 
                    variant="primary"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-primary focus:border-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-primary focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-primary focus:border-primary"
                        placeholder="+255 123 456 789"
                      />
                    </div>
                    
                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-primary focus:border-primary"
                        placeholder="Your Company Ltd."
                      />
                    </div>
                  </div>
                  
                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service of Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select a service</option>
                      <option value="audit">Audit Services</option>
                      <option value="investigations">Special Reviews & Investigations</option>
                      <option value="accounting">Book Keeping & Accounting</option>
                      <option value="secretarial">Company Secretarial</option>
                      <option value="cfo">Virtual CFO</option>
                      <option value="transactions">Transaction Services</option>
                      <option value="taxation">Taxation</option>
                      <option value="tax-litigation">Tax Litigation</option>
                      <option value="business-plans">Business Plans</option>
                      <option value="training">Corporate Training</option>
                      <option value="company-setup">Company Setup</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-primary focus:border-primary"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      className="mt-2"
                      icon={isSubmitting ? undefined : Send}
                      iconPosition="right"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Map Section */}
      <ContentSection bgColor="bg-white" className="pt-8 pb-0">
        <h2 className="text-2xl font-heading font-bold mb-8 text-center">Find Us</h2>
        <div className="w-full h-[450px] bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.0125767603133!2d39.28136827586733!3d-6.819125093191691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b04a6721bfb%3A0x6238e27f3c5b5fd6!2sKisutu%20St%2C%20Dar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2suk!4v1713907544872!5m2!1sen!2suk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hanif Habib & Cco Location"
          ></iframe>
        </div>
      </ContentSection>

      {/* CTA Section */}
      <ContentSection bgColor="bg-primary" className="text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a consultation with our expert team to discuss your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="tel:+255785020404" 
              variant="white"
              size="lg"
              icon={Phone}
            >
              Call Us Now
            </Button>
            <Button 
              href="mailto:hhabib@habibadvisory.co.tz" 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              icon={Mail}
            >
              Email Us
            </Button>
          </div>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Contact;