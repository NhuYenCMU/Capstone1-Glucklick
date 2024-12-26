import React from 'react';
import './ResultsPage.css';
import { Footer } from '../common/Footer';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsPage: React.FC = () => {
  const data = {
    labels: ['Backend', 'Frontend', 'Fullstack', 'DevOps', 'Data Science'],
    datasets: [
      {
        label: 'Skills Distribution',
        data: [65, 15, 10, 5, 5],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  return (
    <div>
      <main className="mainContentStyle">
        <div className="headerStyle">
          <div className="textStyle">
            <h1>The results indicate that you are suited for backend programming.</h1>
            <p>Review how to check this result and learn more about this personality type and its key traits.</p>
            </div>
          <div className="pieChartStyle">
              <Pie data={data} />
            </div>
          <div className="imageContainerStyle">
            <img
              src="https://storage.googleapis.com/a1aa/image/DPsKw891KOpVNJfM1GmLBa2fGdOZL6hlVVWEuF7zCUfFlt6nA.jpg"
              alt="Illustration of backend programming"
              className="imageStyle"
            />
            </div>
          </div>
        
      </main>
      <section className="roadmapStyle">
        <h2>ROADMAP</h2>
        <img
          src="https://storage.googleapis.com/a1aa/image/1GEMkCqYtCo2O1U6K66hvW6VEzZfwfgSfIe5gaA050GeT2qfE.jpg"
          alt="Roadmap illustration"
          className="roadmapImageStyle"
        />
      </section>
      <section className="coursesStyle">
        <h2>SUGGESTED COURSES</h2>
        <div className="courseListStyle">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="courseStyle">
              <img
                src="https://storage.googleapis.com/a1aa/image/e0DQZXpk5YSxPC9xDHltcrngQgKZgtA3uYPVeHW2h3DkyW9TA.jpg"
                alt="Course Image"
                className="courseImageStyle"
              />
              <h3>AWS Certified solutions Architect</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
              <div className="priceStyle">$80</div>
            </div>
          ))}
        </div>
      </section>
     <Footer />
    </div>
  );
};

export default ResultsPage;
