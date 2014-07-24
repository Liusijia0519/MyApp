package com.gary.operation.controller.website.freemarkerExt;

import java.util.HashMap;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import com.gary.operation.service.ArticleService;

import freemarker.template.TemplateMethodModelEx; 
import freemarker.template.TemplateModelException;

public class TopNAticleMethod implements TemplateMethodModelEx {
	
	@Autowired
	private ArticleService service;
	
	@Override
	public Object exec(List args) throws TemplateModelException {
//		if (args.size() < 2) {
//			throw new TemplateModelException("参数个数不对劲哇！");
//		}
		

		
		HashMap<String,Object> ht = new HashMap<String,Object> ();
		ht.put("topN", args.get(0)==null?null:args.get(0).toString());
		ht.put("categoryID", args.get(1)==null?null:args.get(1).toString());
		if (args.size() == 3) {
			ht.put("isPic", args.get(2)==null?null:args.get(2).toString());
     	}
		return service.selectTopNArticles(ht);
		 
	}
}
