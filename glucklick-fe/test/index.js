import scrapeCourseDetails from './scraper.js';

const main = async () => {
  const url = 'https://www.udemy.com/course/aws-cloud-for-beginner-vietnamese/?couponCode=ST12MT122624'; // Đường dẫn đến khóa học

  try {
    const courseDetails = await scrapeCourseDetails(url);
    console.log(JSON.stringify(courseDetails, null, 2)); // In ra dữ liệu dưới dạng JSON
  } catch (err) {
    console.error('Error:', err);
  }
};

main();

