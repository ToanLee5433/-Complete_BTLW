import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './SearchResults.css';

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

interface SearchResultsResponse {
  articles: Article[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  keyword: string;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResultsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const keyword = searchParams.get('keyword') || '';
  const page = parseInt(searchParams.get('page') || '0');

  useEffect(() => {
    if (keyword.trim()) {
      searchArticles(keyword, page);
    } else {
      setLoading(false);
      setError('Vui lòng nhập từ khóa tìm kiếm');
    }
  }, [keyword, page]);

  const searchArticles = async (keyword: string, page: number) => {
    try {
      setLoading(true);
      setError(null);

      const url = `http://localhost:8080/api/public/articles/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=10`;
      console.log('Searching with URL:', url);

      const response = await fetch(url);
      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Search results:', data);
        setSearchResults(data);
      } else {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        setError('Có lỗi xảy ra khi tìm kiếm');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Không thể kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (articleId: number) => {
    navigate(`/tin-tuc-su-kien/bai-viet/${articleId}`);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}&page=${newPage}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'AN_NINH_TRAT_TU': 'An ninh trật tự',
      'CHI_DAO_DIEU_HANH': 'Chỉ đạo điều hành',
      'DOI_NGOAI': 'Đối ngoại',
      'HOAT_DONG_BO_CONG_AN': 'Hoạt động Bộ Công an',
      'HOAT_DONG_CONG_AN_DIA_PHUONG': 'Hoạt động Công an địa phương',
      'HOAT_DONG_XA_HOI': 'Hoạt động xã hội',
      'NGUOI_TOT_VIEC_TOT': 'Người tốt việc tốt',
      'PHO_BIEN_GIAO_DUC_PHAP_LUAT': 'Phổ biến giáo dục pháp luật'
    };
    return categoryMap[category] || category;
  };

  if (loading) {
    return (
      <div className="search-results">
        <div className="container">
          <div className="loading">
            <h2>Đang tìm kiếm...</h2>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results">
        <div className="container">
          <div className="error">
            <h2>Có lỗi xảy ra</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="back-btn">
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <h1>Kết quả tìm kiếm</h1>
          <p className="search-info">
            Tìm thấy <strong>{searchResults?.totalItems || 0}</strong> kết quả cho từ khóa: 
            <strong> "{keyword}"</strong>
          </p>
        </div>

        {searchResults && searchResults.articles.length > 0 ? (
          <>
            <div className="search-results-list">
              {searchResults.articles.map((article) => (
                <div 
                  key={article.id} 
                  className="search-result-item"
                  onClick={() => handleArticleClick(article.id)}
                >
                  {article.imageUrl && (
                    <div className="result-image">
                      <img 
                        src={article.imageUrl.startsWith('http') ? article.imageUrl : `http://localhost:8080${article.imageUrl}`}
                        alt={article.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/botrong_4sao1.jpg';
                        }}
                      />
                    </div>
                  )}
                  <div className="result-content">
                    <div className="result-meta">
                      <span className="result-category">
                        {getCategoryDisplayName(article.category)}
                      </span>
                      <span className="result-date">
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                    <h3 className="result-title">{article.title}</h3>
                    <p className="result-summary">
                      {article.summary || stripHtml(article.content).substring(0, 200) + '...'}
                    </p>
                    <div className="result-author">
                      Tác giả: {article.createdBy || 'Admin'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {searchResults.totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={searchResults.currentPage === 0}
                  onClick={() => handlePageChange(searchResults.currentPage - 1)}
                  className="pagination-btn"
                >
                  « Trước
                </button>
                
                {[...Array(searchResults.totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`pagination-btn ${index === searchResults.currentPage ? 'active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  disabled={searchResults.currentPage >= searchResults.totalPages - 1}
                  onClick={() => handlePageChange(searchResults.currentPage + 1)}
                  className="pagination-btn"
                >
                  Sau »
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <h2>Không tìm thấy kết quả</h2>
            <p>Không có bài viết nào phù hợp với từ khóa "{keyword}"</p>
            <div className="search-suggestions">
              <h3>Gợi ý:</h3>
              <ul>
                <li>Kiểm tra lại cách viết từ khóa</li>
                <li>Thử sử dụng từ khóa khác</li>
                <li>Sử dụng từ khóa ngắn gọn hơn</li>
                <li>Thử tìm theo chủ đề chung</li>
              </ul>
            </div>
            <button onClick={() => navigate('/')} className="back-btn">
              Về trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
