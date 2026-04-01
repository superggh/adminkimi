package com.cgiscp.admin.repository;

import com.cgiscp.admin.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    @Query("SELECT n FROM News n WHERE " +
           "(:keyword IS NULL OR n.title LIKE %:keyword%) AND " +
           "(:category IS NULL OR n.category = :category)")
    Page<News> findByConditions(@Param("keyword") String keyword,
                                 @Param("category") String category,
                                 Pageable pageable);
}
