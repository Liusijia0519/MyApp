package com.gary.base.web;

import com.gary.base.core.PageBounds;

public class WebPageImpl implements WebPage {

	public int page;
	
	public int limit;
	
	public PageBounds bounds;
	
	public WebPageImpl(int page, int limit) {
		this.page = page;
		this.limit = limit;
		this.bounds = new PageBounds((page-1)*limit, limit);
	}
	
	@Override
	public PageBounds getPageBounds() {
		return bounds;
	}

}
