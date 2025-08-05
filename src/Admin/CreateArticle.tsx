import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Admin.css';

export function CreateArticle() {
  const [article, setArticle] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    imageUrl: '',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    { value: '', label: 'Chọn danh mục' },
    { value: 'HOAT_DONG_BO_CONG_AN', label: 'Hoạt động của Bộ Công an' },
    { value: 'HOAT_DONG_CONG_AN_DIA_PHUONG', label: 'Hoạt động của Công an địa phương' },
    { value: 'DOI_NGOAI', label: 'Đối ngoại' },
    { value: 'AN_NINH_TRAT_TU', label: 'An ninh, trật tự' },
    { value: 'PHO_BIEN_GIAO_DUC_PHAP_LUAT', label: 'Phổ biến giáo dục pháp luật' },
    { value: 'CHI_DAO_DIEU_HANH', label: 'Chỉ đạo điều hành' },
    { value: 'NGUOI_TOT_VIEC_TOT', label: 'Người tốt, việc tốt' },
    { value: 'HOAT_DONG_XA_HOI', label: 'Hoạt động xã hội' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!article.title.trim() || !article.content.trim() || !article.category) {
      setMessage('Vui lòng điền đầy đủ thông tin bài viết');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const formData = new FormData();
      
      // Append dữ liệu trực tiếp như @RequestParam expect
      formData.append('title', article.title);
      formData.append('content', article.content);
      formData.append('category', article.category);
      if (article.summary) {
        formData.append('summary', article.summary);
      }
      if (article.image) {
        formData.append('image', article.image);
      }

      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8080/api/admin/articles/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Không set Content-Type, để browser tự động set multipart boundary
        },
        body: formData
      });

      if (response.ok) {
        setMessage('Tạo bài viết thành công!');
        
        // Dispatch event to notify CategorySection about the new article
        window.dispatchEvent(new CustomEvent('articleUpdated'));
        
        setArticle({
          title: '',
          summary: '',
          content: '',
          category: '',
          imageUrl: '',
          image: null
        });
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const errorData = await response.text();
        setMessage(`Không thể tạo bài viết: ${errorData}`);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      setMessage('Có lỗi xảy ra khi tạo bài viết');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage('Vui lòng chọn file hình ảnh');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File ảnh không được vượt quá 5MB');
        return;
      }
      setArticle({...article, image: file});
      setMessage('');
    }
  };

  return (
    <div className="create-article">
      <div className="create-article-header">
        <h2>Tạo bài viết mới</h2>
        <p>Soạn thảo và xuất bản bài viết chính thức của Bộ Công An</p>
      </div>
      
      <div className="article-form-container">
        <form onSubmit={handleSubmit} className="article-form">
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="title">Tiêu đề bài viết *</label>
              <input
                id="title"
                value={article.title}
                onChange={(e) => setArticle({...article, title: e.target.value})}
                required
                placeholder="Nhập tiêu đề bài viết chính thức..."
                className="form-input-title"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="category">Danh mục *</label>
              <select
                id="category"
                value={article.category}
                onChange={(e) => setArticle({...article, category: e.target.value})}
                required
                className="form-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group half-width">
              <label htmlFor="image">Hình ảnh đại diện</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input-file"
              />
              <small className="form-hint">Chọn file ảnh (tối đa 5MB)</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="summary">Tóm tắt</label>
              <textarea
                id="summary"
                value={article.summary}
                onChange={(e) => setArticle({...article, summary: e.target.value})}
                placeholder="Nhập tóm tắt ngắn gọn về nội dung bài viết..."
                rows={3}
                className="form-textarea"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Nội dung bài viết *</label>
              <div className="editor-container">
                <Editor
                  apiKey="n3kxhrveca1is968o5bxlw315g5060dra8v1a7wofh0jla3n"
                  value={article.content}
                  onEditorChange={(content: string) => setArticle({...article, content})}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: 'link lists',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link',
                    content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
                    branding: false
                  }}
                />
              </div>
            </div>
          </div>
        
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'Đang tạo...' : 'Tạo bài viết'}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setArticle({title: '', summary: '', content: '', category: '', imageUrl: '', image: null});
                const fileInput = document.getElementById('image') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
                setMessage('');
              }}
              className="btn-secondary"
            >
              Làm mới
            </button>
          </div>
        </form>
        
        {message && (
          <div className={`admin-message ${message.includes('thành công') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
