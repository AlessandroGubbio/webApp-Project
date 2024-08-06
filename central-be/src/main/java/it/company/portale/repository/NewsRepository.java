package it.valueson.portale.repository;

import it.valueson.portale.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
   List<News> findByTitle(String title);

   List<News>  findAllByOrderByDateDesc();
}