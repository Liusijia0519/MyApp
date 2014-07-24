package com.gary.operation.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.gary.base.system.SystemResource;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.base.web.PageModel;
import com.gary.base.web.WebPage;
import com.gary.operation.domain.Article;
import com.gary.operation.mapper.ArticleMapper;

@Service
public class ArticleService {

	@Autowired
	private ArticleMapper articleMapper;
	
	public DataAndTotal selectNews(Map<String, Object> searchParam, GridParameter param) {
		Object list = articleMapper.selectNews(searchParam, param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}
	
	@CacheEvict(value="SimplePageCachingFilter", beforeInvocation=false, allEntries=true)
	public void insertOrUpdateArticle(Article article) {
		if(!StringUtils.isNotEmpty(article.getId())) {
			article.setId(UUID.randomUUID().toString());
		    article.setCreateuser(SystemResource.getSystemUser().getId());
			article.setCreatetime(new Date());
			articleMapper.insert(article);
		} else {
			article.setModifytime(new Date());
			article.setModifyuser(SystemResource.getSystemUser().getId());
			articleMapper.updateByPrimaryKeySelective(article);
		}
	}

	
	public Article getArticleById(String id) {
		return articleMapper.selectByPrimaryKey(id);
	}

	
	@CacheEvict(value="SimplePageCachingFilter", beforeInvocation=false, allEntries=true)
	public void deleteByPrimaryKey(String articleId) {
		articleMapper.deleteByPrimaryKey(articleId);
	}
	
	//给定某分类 ID，检索的条数，返回指定条数的 文章 lyh
	public List<Article> selectTopNArticles(Map<String, Object> parms ) {
		List<Article> list = articleMapper.selectTopNArticles( parms );
		return list;
	}
	
	//给定某分类 ID，检索的条数，返回指定条数的 文章 lyh
	public PageModel selectArticles(Map<String, Object> params, WebPage page) {
		List<Article> list = articleMapper.selectArticles(params, page.getPageBounds());
		PageModel model = new PageModel(list, page);
		return model;
	}
}
