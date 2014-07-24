package com.gary.operation.controller.website.freemarkerExt;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import com.gary.operation.service.SystemDictionaryService;

import freemarker.template.TemplateMethodModelEx; 
import freemarker.template.TemplateModelException;

public class TopLevelCategoryTreeMethod implements TemplateMethodModelEx {
	
	@Autowired
	private SystemDictionaryService service;
	
	@Override
	public Object exec(List args) throws TemplateModelException {
		if (args.size() < 1) {
			throw new TemplateModelException("参数个数不对劲哇！");
		}
		  
		String  superid =  service.selectTopLevelCategoryID(args.get(0).toString()); //返回给定孙子的祖宗的整个树杈
		//List<SystemDictionary> listline = service.selectSuperInLine(args.get(0).toString());  //给定节点一直找到顶的这个
		if (superid==null) return null;
		return service.selectCategorysDeepTree(superid);
	}
}
