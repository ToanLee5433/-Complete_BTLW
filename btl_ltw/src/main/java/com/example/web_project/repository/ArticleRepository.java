package com.example.web_project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.web_project.common.Category;
import com.example.web_project.entity.Article;
import com.example.web_project.entity.User;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByCategory(Category category);
    
    // Phân trang theo category
    Page<Article> findByCategory(Category category, Pageable pageable);
    
    // Phân trang theo user
    Page<Article> findByUser(User user, Pageable pageable);
    
    // Đếm bài viết theo user
    long countByUser(User user);
    
    // Đếm bài viết theo user và category
    long countByUserAndCategory(User user, Category category);
    
    // Tìm bài viết theo user
    List<Article> findByUser(User user);
    
    // Tìm kiếm bài viết theo từ khóa trong title hoặc content
    @Query("SELECT a FROM Article a WHERE " +
           "LOWER(a.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "a.content LIKE CONCAT('%', :keyword, '%')")
    Page<Article> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}

