export const mockEssays = [
  {
      id: 'essay_1',
      title: 'Why Oxford University?',
      studentId: 'student_1',
      tutorId: null,
    subject: 'Personal Statement',
    qualification: null,
      wordCount: 750,
    status: 'pending',
      submittedAt: '2024-03-15T10:30:00Z',
      reviewedAt: '2024-03-17T14:20:00Z',
      content: `My passion for biochemistry began in my grandfather's garden, where I first learned about the intricate processes that enable plants to convert sunlight into energy. This early fascination led me to pursue advanced chemistry and biology courses, where I excelled particularly in laboratory work. Oxford's renowned biochemistry department, with its cutting-edge research facilities and distinguished faculty, represents the perfect environment for me to deepen my understanding of life's fundamental processes.

During my internship at the local research hospital, I had the opportunity to work alongside scientists studying protein folding mechanisms. This experience not only enhanced my practical skills but also showed me the real-world applications of biochemical research in developing new therapeutic approaches. Oxford's emphasis on combining theoretical knowledge with practical research aligns perfectly with my learning style and career aspirations.

The tutorial system at Oxford particularly appeals to me, as it offers the opportunity for in-depth discussions and personalized guidance. I am excited about the prospect of defending my ideas and receiving direct feedback from experts in the field. The college system also provides a unique environment for interdisciplinary exchange, which I believe is crucial for developing innovative approaches in biochemistry.`,
    feedback: {
        overallScore: 8.5,
        comments: [
            {
                id: 'comment_1',
                paragraph: 1,
                text: 'Strong opening statement, effectively captures attention.'
            },
            {
                id: 'comment_2',
                paragraph: 3,
                text: 'Consider elaborating on your research experience.'
            }
        ],
        suggestedImprovements: [
            'Add more specific examples of academic achievements',
            'Strengthen the conclusion with future aspirations'
        ]
    }
  },
    {
        id: 'essay_2',
        title: 'The Impact of Artificial Intelligence',
        studentId: 'student_2',
        tutorId: 'tutor_1',
        subject: 'technology_and_society',
        qualification: 'alevel',
      wordCount: 1000,
      status: 'reviewed',
      submittedAt: '2024-03-16T09:15:00Z',
        reviewedAt: null,
        content: `The integration of artificial intelligence in healthcare represents one of the most significant technological advances of our time. From diagnostic assistance to personalized treatment plans, AI is revolutionizing how we approach medical care. This essay explores the current applications, potential benefits, and ethical considerations of AI in healthcare settings.

Machine learning algorithms have demonstrated remarkable accuracy in analyzing medical imaging, often surpassing human capabilities in detecting early signs of diseases such as cancer. In radiology departments worldwide, AI-powered systems are already working alongside healthcare professionals, serving as a powerful second opinion and helping to reduce diagnostic errors. However, this raises important questions about the role of human judgment and the potential over-reliance on automated systems.

The potential for AI to analyze vast amounts of medical data and identify patterns invisible to human observers is particularly exciting. By processing millions of patient records, AI systems can help predict disease outbreaks, identify at-risk populations, and suggest preventive measures. This capability could transform public health initiatives and enable more proactive healthcare interventions.`,
        feedback: {
            overallScore: null,
            comments: [],
            suggestedImprovements: []
        }
    },
    {
        id: 'essay_3',
        title: 'Environmental Sustainability in Urban Architecture',
        studentId: 'student_3',
        tutorId: null,
        subject: 'architecture',
        qualification: 'gcse',
        wordCount: 850,
        status: 'pending',
        submittedAt: '2024-03-14T16:45:00Z',
      reviewedAt: '2024-03-16T11:30:00Z',
        content: `Modern cities face unprecedented challenges in balancing urban development with environmental sustainability. As an aspiring architect, I am particularly interested in how innovative design solutions can help create more sustainable urban environments. This essay examines successful examples of green architecture and proposes strategies for implementing sustainable practices in future urban development.

The incorporation of living walls and rooftop gardens in modern buildings exemplifies how architecture can actively contribute to environmental health. These features not only reduce a building's carbon footprint but also provide natural insulation, improve air quality, and create valuable green spaces in urban areas. The Bosco Verticale in Milan serves as a prime example of how vertical forests can be integrated into residential architecture, demonstrating the feasibility of combining luxury living with environmental responsibility.

Sustainable architecture must also consider energy efficiency and renewable energy integration. The use of smart materials, solar panels, and advanced HVAC systems can significantly reduce a building's environmental impact. However, these technologies must be balanced with aesthetic considerations and practical functionality to create buildings that are both sustainable and desirable living spaces.`,
        feedback: {
            overallScore: 9.0,
            comments: [
                {
                    id: 'comment_3',
                    paragraph: 1,
                    text: 'Excellent introduction that sets up the scope of the discussion clearly.'
                },
                {
                    id: 'comment_4',
                    paragraph: 2,
                    text: 'Good use of specific example with Bosco Verticale.'
                },
                {
                    id: 'comment_5',
                    paragraph: 3,
                    text: 'Well-balanced consideration of technical and practical aspects.'
                }
            ],
            suggestedImprovements: [
                'Include more quantitative data on environmental benefits',
                'Discuss economic feasibility of proposed solutions'
            ]
        }
    },
    {
        id: 'essay_4',
        title: 'The Role of Music in Social Movements',
        studentId: 'student_4',
        tutorId: null,
        subject: 'social_studies',
        qualification: 'masters',
      wordCount: 925,
        status: 'pending',
      submittedAt: '2024-03-17T13:20:00Z',
        reviewedAt: null,
        content: `Throughout history, music has served as a powerful catalyst for social change, providing both inspiration and unity to movements fighting for justice and equality. From civil rights anthems to protest songs against war, music has consistently played a crucial role in expressing collective grievances and aspirations. This essay examines the historical significance of music in social movements and its continuing relevance in contemporary activism.

The civil rights movement of the 1960s demonstrates the transformative power of music in social activism. Songs like 'We Shall Overcome' became more than just musical pieces; they evolved into symbolic representations of the struggle for equality. These songs provided courage during peaceful protests, unity in the face of opposition, and hope for a better future. The tradition of freedom songs created a shared cultural experience that strengthened the movement's resolve and attracted wider support.

In the modern era, social media and digital platforms have transformed how protest music reaches audiences, but its fundamental role remains unchanged. Contemporary artists continue to use their platforms to address social issues, from climate change to racial justice. The immediate global reach of today's protest songs amplifies their impact, allowing movements to mobilize supporters across geographical boundaries more effectively than ever before.`,
        feedback: {
            overallScore: null,
            comments: [],
            suggestedImprovements: []
        }
    },
    {
      id: 'essay_5',
      title: 'Exploring the Themes of Power in Macbeth',
      studentId: 'student_1',
      tutorId: null,
      subject: 'english_literature',
      qualification: 'gcse',
      wordCount: 1800,
      submittedAt: new Date('2024-03-15T09:00:00Z').toISOString(),
      postedAt: new Date('2024-03-15T09:00:00Z').toISOString(),
      status: 'pending'
    },
     {
        id: 'essay_6',
        title: 'The French Revolution: Causes and Consequences',
        studentId: 'student_1',
        tutorId: null,
        subject: 'history',
      qualification: 'masters',
        wordCount: 1500,
        submittedAt: new Date('2024-03-22T10:00:00Z').toISOString(),
        postedAt: new Date('2024-03-22T10:00:00Z').toISOString(),
        status: 'pending'
      },
    {
      id: 'essay_7',
      studentId: 'student_2',
      tutorId: null,
      title: 'The English Language',
        subject: 'english_literature',
        qualification: 'alevel',
      wordCount: 1000,
        submittedAt: new Date('2024-03-27T10:00:00Z').toISOString(),
      postedAt: new Date('2024-03-27T10:00:00Z').toISOString(),
        status: 'in_negotiation'
    }

];

export const getEssayById = (id) => {
  return mockEssays.find(essay => essay.id === id);
};

export const getEssaysByStudent = (studentId) => {
  return mockEssays.filter(essay => essay.studentId === studentId);
};

export const getEssaysByTutor = (tutorId) => {
  return mockEssays.filter(essay => essay.tutorId === tutorId);
};

export const getEssaysByStatus = (status) => {
  return mockEssays.filter(essay => essay.status === status);
};

export const getEssaysBySubject = (subject) => {
  return mockEssays.filter(essay => essay.subject === subject);
};