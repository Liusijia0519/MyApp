package com.gary.base.web;

import java.util.List;

import com.gary.base.core.PageBounds;

/**
 * 封装Extjs Grid表格请求参数
 * 
 * @author 葛新
 */
public class GridParameter {

	//当前页
	private int page;
	
	//起始记录位置
	private int start;
	
	//每页显示的行数
	private int limit;
	
	//排序
	private List<Sort> sorts;
	
	public void setSorts(List<Sort> sorts) {
		this.sorts = sorts;
	}

	//mybaits分页参数
	private PageBounds pageBounds;

	public void setPage(int page) {
		this.page = page;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	public PageBounds getPageBounds() {
		if(pageBounds == null) {
			pageBounds = new PageBounds(start, limit);
		}
		return pageBounds;
	}
	
	public String getOrder() {
		StringBuilder builder = new StringBuilder();
		if(sorts != null) {
			for (int i = 0; i < sorts.size(); i++) {
				Sort s = sorts.get(i);
				builder.append(s.getProperty()).append(" ").append(s.getDirection());
				if((i+1) < sorts.size()) {
					builder.append(", ");
				}
			}
		}
		return builder.toString();
	}
}
