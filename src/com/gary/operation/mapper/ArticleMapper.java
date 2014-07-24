package com.gary.operation.mapper;

import java.util.List;
import java.util.Map;


import com.gary.base.core.PageBounds;
import com.gary.operation.domain.Article;

public interface ArticleMapper {
	
    int deleteByPrimaryKey(String id);
    
    List<Article>  selectNews(Map<String, Object> parms, PageBounds bounds);
    
    int insert(Article record);

    int insertSelective(Article record);

    Article selectByPrimaryKey(String id);
   
    int updateByPrimaryKeySelective(Article record);

    int updateByPrimaryKey(Article record);
    
    //检索头N条数据，topN参数：检索几条 categoryID参数：文章直属类别ID  lyh
    //List<Article> selectTopNArticles(@Param("topN")int topN, @Param("categoryID")String categoryID, @Param("isPic")String isPic); 
    List<Article> selectTopNArticles(Map<String, Object> parms);
    
    List<Article> selectArticles(Map<String, Object> params, PageBounds bound);
    
    
}