import React from 'react';
import { Footer } from '../../components/common/Footer';
import CourseCard from './CourseCard';
import './CSS/Mycourses.css';
const Mycourses: React.FC = () =>{
    const courses = [
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'MRCGP (AKT)', completion: 0 },
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'MRCP Part 1', completion: 10 },
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'MRCP Part 2 (Written)', completion: 0 },
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'Medical Student Finals', completion: 0 },
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'MRCOG Part 1', completion: 10 },
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'MRCOG Part 2', completion: 0 },
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'Primary FRCA', completion: 0 },
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'Dentistry', completion: 10 },
        { imageUrl: 'https://storage.googleapis.com/a1aa/image/g0N1CqOhzxLfOaak9ep65oN8fMPNMkySbWI1RC84O9qiXhxnA.jpg', title: 'USML Step 1', completion: 0 },
      ];
    return(
        <div className='Mycourses'>
            <div className="hero-Mycourses">
                <h1>
                <span>My</span> courses
                </h1>
            </div>
            <div className="courses">
                {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
                ))}
            </div>
            <Footer/>
        </div>
    );
};
export default Mycourses;
