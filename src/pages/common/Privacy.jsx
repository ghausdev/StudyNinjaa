// Privacy.js
import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        'Personal Information: Name, email address, contact details, and academic information provided during registration.',
        'Usage Data: Information about how you use our services, including login times and features accessed.',
        'Content: Essays, documents, and other materials you submit for review.',
        'Communication: Records of your interactions with our tutors and support team.'
      ]
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'To provide and personalize our services',
        'To communicate with you about your account and services',
        'To improve our platform and user experience',
        'To ensure the security of our services',
        'To comply with legal obligations'
      ]
    },
    {
      title: '3. Information Sharing',
      content: [
        'With tutors who provide services to you',
        'With third-party service providers who assist in operating our platform',
        'When required by law or to protect our rights',
        'With your consent or at your direction'
      ]
    },
    {
      title: '4. Data Security',
      content: [
        'We implement appropriate security measures to protect your information',
        'Regular security assessments and updates',
        'Encryption of sensitive data',
        'Access controls and monitoring'
      ]
    },
    {
      title: '5. Your Rights',
      content: [
        'Access your personal information',
        'Correct inaccurate data',
        'Request deletion of your data',
        'Object to certain data processing',
        'Export your data'
      ]
    },
    {
      title: '6. Cookies and Tracking',
      content: [
        'We use cookies and similar technologies to improve user experience',
        'You can control cookie settings through your browser',
        'Essential cookies cannot be disabled as they are required for platform functionality'
      ]
    },
    {
      title: '7. Childrens Privacy',
      content: [
        'Our services are not intended for users under 16 years of age',
        'We do not knowingly collect information from children',
        'Parents or guardians should contact us if they believe we have inadvertently collected such information'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: December 22, 2024
          </p>
        </div>

        {/* Privacy Content */}
        <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="prose max-w-none">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                // Privacy.js (continued)
                  {section.content.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-gray-500">
            For questions about our privacy practices or to exercise your privacy rights, please{' '}
            <Link to="/contact" className="text-red-600 hover:text-red-500">
              contact us
            </Link>
            .
          </p>
          <p className="text-sm text-gray-500">
            You can also review our{' '}
            <Link to="/terms" className="text-red-600 hover:text-red-500">
              Terms of Service
            </Link>
            {' '}for additional information about using our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;