// FAQ.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categories = [
    { id: 'general', name: 'General Questions' },
    { id: 'essays', name: 'Essay Reviews' },
    { id: 'interviews', name: 'Mock Interviews' },
    { id: 'pricing', name: 'Pricing & Plans' }
  ];

  const faqItems = {
    general: [
      {
        id: 'what-is',
        question: 'What is StudyNINJAA?',
        answer: 'StudyNINJAA is an online platform that connects students with expert tutors for university application support, including essay reviews and mock interviews.'
      },
      {
        id: 'who-for',
        question: 'Who is StudyNINJAA for?',
        answer: 'Our platform is designed for students applying to universities, particularly those targeting top institutions. We also support postgraduate applicants and those seeking specialized program admissions.'
      }
    ],
    essays: [
      {
        id: 'essay-time',
        question: 'How long does an essay review take?',
        answer: 'Typically, essay reviews are completed within 48-72 hours. For urgent reviews, we offer expedited services with 24-hour turnaround times.'
      },
      {
        id: 'essay-revisions',
        question: 'Can I get revisions on my essay feedback?',
        answer: 'Yes, you can request revisions or clarifications on your essay feedback within 7 days of receiving the initial review.'
      }
    ],
    interviews: [
      {
        id: 'interview-format',
        question: 'How do mock interviews work?',
        answer: 'Mock interviews are conducted online via video call. Each session includes the interview, immediate feedback, and a detailed written evaluation.'
      },
      {
        id: 'interview-prep',
        question: 'How should I prepare for my mock interview?',
        answer: 'We provide preparation materials beforehand, including common questions and topics. Ensure you have a stable internet connection and a quiet environment.'
      }
    ],
    pricing: [
      {
        id: 'pricing-plans',
        question: 'What are your pricing plans?',
        answer: 'We offer flexible pricing plans starting from basic per-service options to comprehensive packages. All plans include access to our resource library.'
      },
      {
        id: 'refunds',
        question: 'What is your refund policy?',
        answer: 'We offer full refunds if requested within 24 hours of purchase, provided the service hasnot been used. Partial refunds are available case-by-case.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Find answers to common questions about our services.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-red-100 text-red-700'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {faqItems[activeCategory].map((item) => (
              <div key={item.id} className="p-4">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {item.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className={`w-6 h-6 transform ${
                        openItems.has(item.id) ? 'rotate-180' : ''
                      } text-gray-500`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {openItems.has(item.id) && (
                  <div className="mt-2">
                    <p className="text-gray-500">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            Can't find what you're looking for?{' '}
            <Link to="/contact" className="text-red-600 font-medium hover:text-red-500">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;