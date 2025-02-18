// Terms.js
import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  const sections = [
    {
      title: "TERMS OF SERVICE",
      content: `Welcome to StudyNinjaa Ltd, an online platform designed to provide high-quality educational services, including essay feedback, marking, and one-on-one tutoring. By accessing or using our platform, you agree to comply with and be bound by these Terms of Service, as well as our Privacy Policy, which governs the use of our services. If you do not agree to these terms, you should not use our platform.`,
    },
    {
      title: "Services Provided",
      content: `StudyNinjaa Ltd offers a range of educational services aimed at supporting students in their academic journey. The primary services provided on our platform include essay feedback and marking as well as one-on-one tutoring. These services are designed to help students improve their academic skills, enhance their understanding of various subjects, and achieve their educational goals.

Our essay feedback and marking service allows students to submit essays or written assignments for review. Tutors will provide constructive feedback, highlight areas for improvement, and guide students on how to enhance their work. The price for this service is determined by the word count of the essay, which is calculated using AI.

The tutoring service is offered through one-on-one sessions conducted via video calls on Zoom. These sessions can cover a wide range of subjects, providing personalized, interactive support to students.`,
    },
    {
      title: "Pricing and Payment",
      content: `All payments for services are processed securely through our platform. We use trusted payment systems to ensure a smooth transaction experience for both students and tutors. Payment is typically made upfront for services, with the total amount being agreed upon by both parties before any work begins.

StudyNinjaa Ltd shall be entitled to a commission of 17% on all fees received from students for tuition and essay marking services provided by the Tutors.`,
    },
    {
      title: "1. Agreement to Terms",
      content: `By accessing and using StudyNINJAA's services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.`,
    },
    {
      title: "2. Services Description",
      content: `StudyNINJAA provides educational support services including essay reviews, mock interviews, and academic guidance. Our services are intended to support and enhance your academic journey, not to guarantee specific outcomes or results.`,
    },
    {
      title: "3. User Accounts",
      content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.`,
    },
    {
      title: "4. Payment Terms",
      content: `Payments for services are processed securely through our platform. All fees are non-refundable except as specified in our refund policy. We reserve the right to modify our pricing with appropriate notice.`,
    },
    {
      title: "5. Intellectual Property",
      content: `All content provided through our services, including feedback, suggestions, and educational materials, remains the intellectual property of StudyNINJAA. Users retain ownership of their submitted materials.`,
    },
    {
      title: "6. User Conduct",
      content: `Users must not engage in any activity that interferes with or disrupts our services. This includes attempting to gain unauthorized access to our systems or other users' accounts.`,
    },
    {
      title: "7. Privacy Policy",
      content: `Your use of StudyNINJAA is also governed by our Privacy Policy. By using our services, you consent to our collection and use of information as detailed in our Privacy Policy.`,
    },
    {
      title: "8. Limitation of Liability",
      content: `StudyNINJAA is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or any content provided through our platform.`,
    },
    {
      title: "9. Termination",
      content: `We may terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.`,
    },
    {
      title: "10. Changes to Terms",
      content: `We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.`,
    },
    {
      title: "Contact Us",
      content: `If you have any questions, concerns, or feedback regarding these Terms of Service, our Privacy Policy, or any other aspect of your experience on StudyNinjaa Ltd, please feel free to contact us at support@studyninjaa.com`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: March 19, 2024
          </p>
        </div>

        {/* Terms Content */}
        <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="prose max-w-none">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-600 whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            For any questions about these Terms, please{" "}
            <Link to="/contact" className="text-red-600 hover:text-red-500">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
