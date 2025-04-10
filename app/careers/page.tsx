import React from 'react';

const CareersPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Careers</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
        <p className="mb-4">
          We're a team of passionate individuals who are driven to make a
          difference. We value creativity, collaboration, and continuous learning.
          Here's what you can expect when you join us:
        </p>
        <ul className="list-disc list-inside">
          <li>A supportive and inclusive work environment</li>
          <li>Opportunities for professional growth and development</li>
          <li>Competitive compensation and benefits</li>
          <li>The chance to work on exciting and impactful projects</li>
          <li>Flexible work arrangements</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
        <p className="mb-4">
          We're always looking for talented individuals to join our team. Check
          out our current open positions:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Software Engineer
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              UX/UI Designer
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Marketing Specialist
            </a>
          </li>
          <li>
             <a href="#" className="text-blue-500 hover:underline">
              Project Manager
            </a>
          </li>
          
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
        <p className="mb-4">
          If you're interested in applying for one of our open positions,
          please follow these steps:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            Review the job description for the position you're interested in.
          </li>
          <li>
            Prepare your resume and a cover letter that highlights your
            relevant skills and experience.
          </li>
          <li>
            Submit your application through our online application portal, which you can find <a href="#" className="text-blue-500 hover:underline">here.</a>
          </li>
          <li>
            A member of our HR team will be in touch to let you know the next steps.
          </li>
        </ol>
        <p className='mt-4'>
            For any general inquiries, please contact our HR department at <a href="mailto:hr@example.com" className="text-blue-500 hover:underline">hr@example.com</a>
        </p>
      </section>
    </div>
  );
};

export default CareersPage;