import "./Header.css";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Kiểm tra xem đang ở trang admin hay không
  const isOnAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập admin qua localStorage hoặc JWT token
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
  }, [location]);

  // Thêm listener cho storage event và custom event để cập nhật khi đăng nhập thành công
  useEffect(() => {
    const handleStorageChange = () => {
      const adminToken = localStorage.getItem('adminToken');
      setIsAdmin(!!adminToken);
    };

    const handleAdminLogin = () => {
      const adminToken = localStorage.getItem('adminToken');
      setIsAdmin(!!adminToken);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('adminLogin', handleAdminLogin);
    
    // Cũng check định kỳ để catch các thay đổi trong cùng tab
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminLogin', handleAdminLogin);
      clearInterval(interval);
    };
  }, []);

  const handleLogin = () => {
    navigate("/admin");
  };

  const handleAdminPage = () => {
    navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    
    // Trigger custom event để cập nhật
    window.dispatchEvent(new Event('adminLogout'));
    
    setIsAdmin(false);
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchKeyword.trim())}&page=0`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-section">
          <img src="/images/logo.png" alt="Logo" className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        </div>
        <div className="search-section">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Tìm kiếm tin tức..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button 
              onClick={handleSearch}
              className="search-btn"
              type="button"
            >
              Tìm kiếm
            </button>
          </div>
          {!isAdmin && (
            <button className="login-btn" onClick={handleLogin}>Đăng nhập</button>
          )}
          {isAdmin && !isOnAdminPage && (
            <button className="login-btn admin-btn" onClick={handleAdminPage}>Trang Admin</button>
          )}
          {isAdmin && isOnAdminPage && (
            <button className="login-btn logout-btn" onClick={handleLogout}>Đăng xuất</button>
          )}
        </div>
      </div>
    </header>
  );
}
