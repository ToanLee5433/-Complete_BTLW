import React, { useState, useEffect } from 'react';
import './Dashboard.css';

interface DashboardStats {
  totalArticles: number;
  totalFeedbacks: number;
  pendingFeedbacks: number;
  resolvedFeedbacks: number;
  todayArticles: number;
  todayFeedbacks: number;
  articlesByCategory: { [key: string]: number };
  feedbacksByStatus: { [key: string]: number };
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: number;
  type: 'article' | 'feedback';
  action: string;
  description: string;
  timestamp: string;
  title?: string;
}

interface DashboardProps {
  onNavigateToTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigateToTab }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    totalFeedbacks: 0,
    pendingFeedbacks: 0,
    resolvedFeedbacks: 0,
    todayArticles: 0,
    todayFeedbacks: 0,
    articlesByCategory: {},
    feedbacksByStatus: {},
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [categoryView, setCategoryView] = useState<'first' | 'second'>('first');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      // Fetch all articles to get correct statistics
      const allArticlesResponse = await fetch('http://localhost:8080/api/admin/articles?page=0&size=1000', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const allArticlesData = await allArticlesResponse.json();
      const allArticles = allArticlesData.articles || [];
      
      // Fetch recent articles for activity
      const recentArticlesResponse = await fetch('http://localhost:8080/api/admin/articles?page=0&size=10', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const recentArticlesData = await recentArticlesResponse.json();
      const recentArticles = recentArticlesData.articles || [];

      // Fetch feedback statistics
      const feedbacksResponse = await fetch('http://localhost:8080/api/admin/feedbacks/statistics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const feedbackStats = await feedbacksResponse.json();

      // Calculate article statistics by category
      const articlesByCategory: { [key: string]: number } = {};
      allArticles.forEach((article: any) => {
        const category = article.category;
        articlesByCategory[category] = (articlesByCategory[category] || 0) + 1;
      });

      // Generate recent activity from real data
      const recentActivity: ActivityItem[] = recentArticles.slice(0, 5).map((article: any) => ({
        id: article.id,
        type: 'article' as const,
        action: article.updatedAt ? 'updated' : 'created',
        description: article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title,
        title: article.title,
        timestamp: article.updatedAt || article.createdAt
      }));

      // Calculate today's articles
      const today = new Date().toDateString();
      const todayArticles = allArticles.filter((article: any) => 
        new Date(article.createdAt).toDateString() === today
      ).length;

      setStats({
        totalArticles: allArticlesData.totalItems || allArticles.length,
        totalFeedbacks: feedbackStats.total || 0,
        pendingFeedbacks: feedbackStats.pending || 0,
        resolvedFeedbacks: feedbackStats.resolved || 0,
        todayArticles,
        todayFeedbacks: feedbackStats.todayFeedbacks || 0,
        articlesByCategory,
        feedbacksByStatus: {
          pending: feedbackStats.pending || 0,
          inProgress: feedbackStats.inProgress || 0,
          resolved: feedbackStats.resolved || 0,
          rejected: feedbackStats.rejected || 0
        },
        recentActivity
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      'CHI_DAO_DIEU_HANH': 'Chỉ đạo điều hành',
      'HOAT_DONG_BO_CONG_AN': 'Hoạt động Bộ Công an',
      'HOAT_DONG_CONG_AN_DIA_PHUONG': 'Hoạt động Công an địa phương',
      'AN_NINH_TRAT_TU': 'An ninh trật tự',
      'DOI_NGOAI': 'Đối ngoại',
      'HOAT_DONG_XA_HOI': 'Hoạt động xã hội',
      'NGUOI_TOT_VIEC_TOT': 'Người tốt việc tốt',
      'PHO_BIEN_GIAO_DUC_PHAP_LUAT': 'Phổ biến giáo dục pháp luật'
    };
    return categoryNames[category] || category;
  };

  const getStatusDisplayName = (status: string) => {
    const statusNames: { [key: string]: string } = {
      'pending': 'Chờ xử lý',
      'inProgress': 'Đang xử lý',
      'resolved': 'Đã xử lý',
      'rejected': 'Từ chối'
    };
    return statusNames[status] || status;
  };

  if (loading) {
    return <div className="loading">Đang tải thống kê...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Tổng quan hệ thống</h2>
        <div className="dashboard-subtitle">
          Thống kê và hoạt động gần đây của hệ thống quản lý
        </div>
      </div>

      {/* Main Statistics */}
      <div className="stats-overview">
        <div className="stats-row">
          <div className="stat-card primary">
            <div className="stat-content">
              <h3>Tổng số bài viết</h3>
              <div className="stat-number">{stats.totalArticles}</div>
              <div className="stat-change">+{stats.todayArticles} hôm nay</div>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-content">
              <h3>Tổng phản hồi</h3>
              <div className="stat-number">{stats.totalFeedbacks}</div>
              <div className="stat-change">+{stats.todayFeedbacks} hôm nay</div>
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-content">
              <h3>Chờ xử lý</h3>
              <div className="stat-number">{stats.pendingFeedbacks}</div>
              <div className="stat-change">Cần chú ý</div>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Đã xử lý</h3>
              <div className="stat-number">{stats.resolvedFeedbacks}</div>
              <div className="stat-change">Hoàn thành</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-card">
            <div className="category-header">
              <h3>Bài viết theo danh mục</h3>
              <div className="category-navigation">
                <button 
                  className="nav-arrow"
                  onClick={() => setCategoryView(categoryView === 'first' ? 'second' : 'first')}
                  disabled={Object.keys(stats.articlesByCategory).length <= 4}
                >
                  {categoryView === 'first' ? '→' : '←'}
                </button>
              </div>
            </div>
            <div className="chart-content">
              {(() => {
                const categories = Object.entries(stats.articlesByCategory);
                const displayCategories = categoryView === 'first' 
                  ? categories.slice(0, 4) 
                  : categories.slice(4, 8);
                
                return displayCategories.map(([category, count]) => (
                  <div key={category} className="status-item">
                    <div className="status-info">
                      <span className={`status-indicator category`}></span>
                      <span className="status-name">{getCategoryDisplayName(category)}</span>
                    </div>
                    <span className="status-count">{count}</span>
                  </div>
                ));
              })()}
            </div>
          </div>

          <div className="chart-card">
            <h3>Phản hồi theo trạng thái</h3>
            <div className="chart-content">
              {Object.entries(stats.feedbacksByStatus).map(([status, count]) => (
                <div key={status} className="status-item">
                  <div className="status-info">
                    <span className={`status-indicator ${status}`}></span>
                    <span className="status-name">{getStatusDisplayName(status)}</span>
                  </div>
                  <span className="status-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h3>Hoạt động gần đây</h3>
          <div className="activity-list">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-content ${activity.type}`}>
                  <div className="activity-description">{activity.description}</div>
                  <div className="activity-time">{formatTime(activity.timestamp)}</div>
                </div>
                <div className={`activity-action ${activity.action}`}>
                  {activity.action === 'created' && 'Tạo mới'}
                  {activity.action === 'updated' && 'Cập nhật'}
                  {activity.action === 'resolved' && 'Xử lý'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Thao tác nhanh</h3>
        <div className="actions-grid">
          <button 
            className="action-btn create"
            onClick={() => onNavigateToTab('create-article')}
          >
            <span className="action-text">Tạo bài viết mới</span>
          </button>
          <button 
            className="action-btn review"
            onClick={() => onNavigateToTab('feedback')}
          >
            <span className="action-text">Xem phản hồi chờ xử lý</span>
          </button>
          <button 
            className="action-btn report"
            onClick={() => onNavigateToTab('articles')}
          >
            <span className="action-text">Quản lý bài viết</span>
          </button>
          <button 
            className="action-btn settings"
            onClick={() => onNavigateToTab('dashboard')}
          >
            <span className="action-text">Tổng quan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
