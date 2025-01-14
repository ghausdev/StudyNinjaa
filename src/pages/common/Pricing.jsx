// Pricing.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
   
  ];

  const frequentlyAskedQuestions = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Is there a refund policy?',
      answer: 'Yes, we offer a 14-day money-back guarantee if youre not satisfied with our services.'
    },
    {
      question: 'Can I share my account?',
      answer: 'No, our subscriptions are for individual use only and cannot be shared between multiple users.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Choose the perfect plan for your university application journey
          </p>
        </div>

        {/* Billing Toggle */}
        

        {/* Pricing Cards */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.highlighted
                  ? 'border-2 border-red-500 relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-red-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </p>
                <Link
                  to="/register"
                  className={`mt-8 block w-full rounded-md py-2 px-4 text-sm font-semibold text-center text-white ${
                    plan.highlighted
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
              
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            {frequentlyAskedQuestions.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-base text-gray-500">
            Need help choosing the right plan?{' '}
            <Link
              to="/contact"
              className="font-medium text-red-600 hover:text-red-500"
            >
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;