import "./MainNews.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  createdBy: string;
}

export default function MainNews() {
  const navigate = useNavigate();
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestArticle();
    
    // Listen for article updates
    const handleArticleUpdate = () => {
      fetchLatestArticle();
    };
    
    window.addEventListener('articleUpdated', handleArticleUpdate);
    
    return () => {
      window.removeEventListener('articleUpdated', handleArticleUpdate);
    };
  }, []);

  const fetchLatestArticle = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/public/articles?page=0&size=1');
      if (response.ok) {
        const data = await response.json();
        if (data.content && data.content.length > 0) {
          setLatestArticle(data.content[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching latest article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (latestArticle) {
      navigate(`/tin-tuc-su-kien/bai-viet/${latestArticle.id}`);
    }
  };

  if (loading) {
    return (
      <div className="main-news">
        <img 
          src="/images/botrong_4sao1.jpg" 
          alt="Ảnh tin nổi bật"
        />
        <div className="news-content">
          <h2>Đang tải tin tức mới nhất...</h2>
          <p>Vui lòng chờ trong giây lát...</p>
        </div>
      </div>
    );
  }

  // Nếu không có bài viết từ API, hiển thị bài viết mặc định
  if (!latestArticle) {
    return (
      <div className="main-news" onClick={() => navigate('/tin-tuc-su-kien/bai-viet/cong-an-tinh-nghe-an-khan-truong-tich-cuc-giup-nhan-dan-khac-phuc-hau-qua-con-bao-so-3')} style={{ cursor: "pointer" }}>
        <img 
          src="https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/gen-h-xa%20anh%20son1.jpg?RenditionID=7" 
          alt="Ảnh tin nổi bật"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/botrong_4sao1.jpg";
          }}
        />
        <div className="news-content">
          <h2>Công an tỉnh Nghệ An khẩn trương, tích cực giúp Nhân dân khắc phục hậu quả cơn bão số 3</h2>
          <p>Trước diễn biến phức tạp của mưa lũ do ảnh hưởng hoàn lưu bão số 3 (bão Wipha), Công an tỉnh Nghệ An đã và đang cảnh minh hỗ trợ Nhân dân khắc phục hậu quả, sớm ổn định cuộc sống.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-news" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={latestArticle.imageUrl ? `http://localhost:8080${latestArticle.imageUrl}` : "/images/botrong_4sao1.jpg"}
        alt="Ảnh tin nổi bật"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/botrong_4sao1.jpg";
        }}
      />
      <div className="news-content">
        <h2>{latestArticle.title}</h2>
        <p>{latestArticle.summary || latestArticle.content.substring(0, 200) + '...'}</p>
      </div>
    </div>
  );
}
