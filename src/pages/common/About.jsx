// About.js
import React from 'react';

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgePZ7NuVuRImfYeaiIyNd79dAbF4QKqPDA&s',
      bio: 'Former Oxford admissions tutor with over 15 years of experience in higher education.'
    },
    {
      name: 'David Chen',
      role: 'Head of Tutoring',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgePZ7NuVuRImfYeaiIyNd79dAbF4QKqPDA&s',
      bio: 'Cambridge graduate with expertise in interview preparation and academic counseling.'
    },
    {
      name: 'Emma Williams',
      role: 'Lead Essay Reviewer',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgePZ7NuVuRImfYeaiIyNd79dAbF4QKqPDA&s',
      bio: 'Professional writer and editor with a focus on academic and admission essays.'
    }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We are committed to maintaining the highest standards in education and support.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: 'Innovation',
      description: 'We continuously improve our platform to provide the best learning experience.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our interactions.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About StudyNINJAA
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Empowering students to achieve their academic dreams through expert guidance and support.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Founded in 2023, StudyNINJAA began with a simple mission: to make quality academic guidance accessible to students worldwide. Our platform connects ambitious students with experienced tutors who have walked the same path.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Today, we've helped thousands of students achieve their academic goals through personalized essay reviews, mock interviews, and expert guidance.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <img
                className="rounded-lg shadow-lg"
                src="https://s39613.pcdn.co/wp-content/uploads/2018/04/student-led-study-group-library-id842920176.jpg"
                alt="Team meeting"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            These core principles guide everything we do at StudyNINJAA.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-red-600 rounded-md shadow-lg text-white">
                        {value.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Dedicated professionals committed to your success.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="space-y-4">
                  <img
                    className="mx-auto h-40 w-40 rounded-full lg:w-44 lg:h-44"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                      <h3 className="text-gray-900">{member.name}</h3>
                      <p className="text-red-600">{member.role}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>{member.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;