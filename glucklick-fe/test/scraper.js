import puppeteer from 'puppeteer';

const scrapeCourseDetails = async (url) => {
  try {
    // Mở trình duyệt Puppeteer
    const browser = await puppeteer.launch({ headless: true }); // Chế độ headless để không hiện giao diện người dùng
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Đợi một chút để chắc chắn nội dung được tải đầy đủ (có thể tùy chỉnh thời gian đợi)
    await page.waitForSelector('h1.lead-title');  // Đợi h1 có class font-semibold được hiển thị

    // Lấy thông tin khóa học
    const courseDetails = await page.evaluate(() => {
      // Lấy tên khóa học
      const name = document.querySelector('h1.lead-title')?.innerText.trim() || 'No title';
      
      // Lấy mô tả khóa học
      const description = document.querySelector('.course-description')?.innerText.trim() || 'No description';
      
      // Lấy giá khóa học
      const priceText = document.querySelector('.course-price')?.innerText.trim() || 'Free';
      const price = parseFloat(priceText.replace(/[^0-9]/g, '') || '0');
      
      // Lấy rating khóa học
      const ratingText = document.querySelector('.course-rating')?.innerText.trim() || '0';
      const rating = parseFloat(ratingText);
      
      // Lấy số lượng học viên
      const totalStudents = document.querySelector('.students-enrolled')?.innerText.trim() || 'Unknown';
      
      // Lấy tên giảng viên
      const instructor = document.querySelector('.instructor-name')?.innerText.trim() || 'No instructor';
      
      // Lấy danh sách bài học
      const contentList = Array.from(document.querySelectorAll('.lesson-title'))
        .map((el) => el.innerText.trim());
      
      return {
        name,
        description,
        price,
        rating,
        totalStudents,
        instructor,
        contentList,
      };
    });

    // Đóng trình duyệt
    await browser.close();

    return courseDetails;
  } catch (err) {
    console.error('Error scraping data:', err);
    return null;
  }
};

export default scrapeCourseDetails;
