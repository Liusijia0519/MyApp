package com.gary.operation.controller.website.freemarkerExt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.gary.operation.domain.SystemDictionary;
import com.gary.operation.service.SystemDictionaryService;

import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;

public class LeafCategoryMethod implements TemplateMethodModelEx{
	@Autowired
	private SystemDictionaryService service;
	@Override
	public Object exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("参数个数不对劲哇！");
		}
		SystemDictionary result = service.getFirstLeafCategoryID(args.get(0).toString());
		return  result;
		
	}

	
	
	
	
	
}
