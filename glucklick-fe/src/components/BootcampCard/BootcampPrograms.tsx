import React, { useState } from 'react';
import BootcampCard, { BootcampCardProps } from './BootcampCard';
import './css/BootcampPrograms.css'; // Đường dẫn tới CSS

const BootcampPrograms: React.FC = () => {
    const bootcampData: BootcampCardProps[] = [
        {
            image: 'https://storage.googleapis.com/a1aa/image/RkFTlAF66lr1F91jVOQTBkaDWMhHUox4Hy60taPyvrfvqO9JA.jpg',
            title: 'LẬP TRÌNH',
            name: 'BOOTCAMP FULLTIME',
            format: 'ONLINE, OFFLINE',
            alt: 'Person coding on multiple laptops',
            link: '/Recomandcourse',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/V1rKKIz0yxolGpvwb423ANieby0bTZeB5fHUqAD7m086q60nA.jpg',
            title: 'LẬP TRÌNH',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE, OFFLINE',
            alt: 'Person coding on a laptop',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/GWfsQJdub0QdfUY5go4MNEv9qCZOGlD2OdyeLvx5K9hAr60nA.jpg',
            title: 'PHÂN TÍCH DỮ LIỆU',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE',
            alt: 'Person analyzing data on a laptop',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/rDOOBfXl0DW9DyD9tybGVwVkyWSPRbwR4a9RMLenXn1aVd6TA.jpg',
            title: 'LẬP TRÌNH GAME',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE',
            alt: 'Game development illustration',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/YlIFWaeS3EwOWi7FR7zHqfgo2E8hdfkmmGHO58alXmn3q60nA.jpg',
            title: 'LUYỆN THI CHỨNG CHỈ',
            name: 'PARTTIME',
            format: 'ONLINE',
            alt: 'Person writing on a notebook',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/jocGmLBZexxHOCasiKCRWISZ26D6lTDeLFX0cy8FBIhcVd6TA.jpg',
            title: 'CHƯƠNG TRÌNH THÀNH VIÊN',
            name: 'CODEGYM SUBSCRIPTION',
            format: 'ONLINE',
            alt: 'Subscription program illustration',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/RkFTlAF66lr1F91jVOQTBkaDWMhHUox4Hy60taPyvrfvqO9JA.jpg',
            title: 'LẬP TRÌNH',
            name: 'BOOTCAMP FULLTIME',
            format: 'ONLINE, OFFLINE',
            alt: 'Person coding on multiple laptops',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/V1rKKIz0yxolGpvwb423ANieby0bTZeB5fHUqAD7m086q60nA.jpg',
            title: 'LẬP TRÌNH',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE, OFFLINE',
            alt: 'Person coding on a laptop',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/GWfsQJdub0QdfUY5go4MNEv9qCZOGlD2OdyeLvx5K9hAr60nA.jpg',
            title: 'PHÂN TÍCH DỮ LIỆU',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE',
            alt: 'Person analyzing data on a laptop',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/rDOOBfXl0DW9DyD9tybGVwVkyWSPRbwR4a9RMLenXn1aVd6TA.jpg',
            title: 'LẬP TRÌNH GAME',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE',
            alt: 'Game development illustration',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/YlIFWaeS3EwOWi7FR7zHqfgo2E8hdfkmmGHO58alXmn3q60nA.jpg',
            title: 'LUYỆN THI CHỨNG CHỈ',
            name: 'PARTTIME',
            format: 'ONLINE',
            alt: 'Person writing on a notebook',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/jocGmLBZexxHOCasiKCRWISZ26D6lTDeLFX0cy8FBIhcVd6TA.jpg',
            title: 'CHƯƠNG TRÌNH THÀNH VIÊN',
            name: 'CODEGYM SUBSCRIPTION',
            format: 'ONLINE',
            alt: 'Subscription program illustration',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/RkFTlAF66lr1F91jVOQTBkaDWMhHUox4Hy60taPyvrfvqO9JA.jpg',
            title: 'LẬP TRÌNH',
            name: 'BOOTCAMP FULLTIME',
            format: 'ONLINE, OFFLINE',
            alt: 'Person coding on multiple laptops',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/V1rKKIz0yxolGpvwb423ANieby0bTZeB5fHUqAD7m086q60nA.jpg',
            title: 'LẬP TRÌNH',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE, OFFLINE',
            alt: 'Person coding on a laptop',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/GWfsQJdub0QdfUY5go4MNEv9qCZOGlD2OdyeLvx5K9hAr60nA.jpg',
            title: 'PHÂN TÍCH DỮ LIỆU',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE',
            alt: 'Person analyzing data on a laptop',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/rDOOBfXl0DW9DyD9tybGVwVkyWSPRbwR4a9RMLenXn1aVd6TA.jpg',
            title: 'LẬP TRÌNH GAME',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE',
            alt: 'Game development illustration',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/YlIFWaeS3EwOWi7FR7zHqfgo2E8hdfkmmGHO58alXmn3q60nA.jpg',
            title: 'LUYỆN THI CHỨNG CHỈ',
            name: 'PARTTIME',
            format: 'ONLINE',
            alt: 'Person writing on a notebook',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/jocGmLBZexxHOCasiKCRWISZ26D6lTDeLFX0cy8FBIhcVd6TA.jpg',
            title: 'CHƯƠNG TRÌNH THÀNH VIÊN',
            name: 'CODEGYM SUBSCRIPTION',
            format: 'ONLINE',
            alt: 'Subscription program illustration',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/RkFTlAF66lr1F91jVOQTBkaDWMhHUox4Hy60taPyvrfvqO9JA.jpg',
            title: 'LẬP TRÌNH',
            name: 'BOOTCAMP FULLTIME',
            format: 'ONLINE, OFFLINE',
            alt: 'Person coding on multiple laptops',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/V1rKKIz0yxolGpvwb423ANieby0bTZeB5fHUqAD7m086q60nA.jpg',
            title: 'LẬP TRÌNH',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE, OFFLINE',
            alt: 'Person coding on a laptop',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/GWfsQJdub0QdfUY5go4MNEv9qCZOGlD2OdyeLvx5K9hAr60nA.jpg',
            title: 'PHÂN TÍCH DỮ LIỆU',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE',
            alt: 'Person analyzing data on a laptop',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/rDOOBfXl0DW9DyD9tybGVwVkyWSPRbwR4a9RMLenXn1aVd6TA.jpg',
            title: 'LẬP TRÌNH GAME',
            name: 'BOOTCAMP PARTTIME',
            format: 'ONLINE',
            alt: 'Game development illustration',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/YlIFWaeS3EwOWi7FR7zHqfgo2E8hdfkmmGHO58alXmn3q60nA.jpg',
            title: 'LUYỆN THI CHỨNG CHỈ',
            name: 'PARTTIME',
            format: 'ONLINE',
            alt: 'Person writing on a notebook',
            link: 'https://codelearn.io/',
          },
          {
            image: 'https://storage.googleapis.com/a1aa/image/jocGmLBZexxHOCasiKCRWISZ26D6lTDeLFX0cy8FBIhcVd6TA.jpg',
            title: 'CHƯƠNG TRÌNH THÀNH VIÊN',
            name: 'CODEGYM SUBSCRIPTION',
            format: 'ONLINE',
            alt: 'Subscription program illustration',
            link: 'https://codelearn.io/',
          },
        // ... (các phần tử còn lại)
      ];

  const [visibleCount, setVisibleCount] = useState(6); // Số lượng khóa học hiển thị ban đầu

  // Xử lý hiển thị thêm khóa học
  const showMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 6, bootcampData.length)); // Hiển thị thêm 6 khóa học mỗi lần
  };

  // Xử lý thu gọn danh sách khóa học
  const collapse = () => {
    setVisibleCount(6); // Trở về trạng thái hiển thị ban đầu
  };

  return (
    <div className="bootcamp-container">
      <div className="bootcamp-card-container">
        {bootcampData.slice(0, visibleCount).map((data, index) => (
          <BootcampCard key={index} {...data} />
        ))}
      </div>
      <div className="show-more-container">
        {visibleCount < bootcampData.length ? (
            <button className="learn-more-button" onClick={showMore}>
                <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                </span>
                <span className="button-text">Show More</span>
            </button>
        ) : (
          <button className="learn-more-button" onClick={collapse}>
            <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                </span>
                <span className="button-text">Show Less</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BootcampPrograms;
