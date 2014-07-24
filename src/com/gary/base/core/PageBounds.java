package com.gary.base.core;

import org.apache.ibatis.session.RowBounds;

public class PageBounds extends RowBounds {
	
	//总记录数
	private int total;
	
	//查询的起始位置
	private int offset;
	
	//查询多少行记录
	private int limit;
	
	public PageBounds(int offset, int limit) {
	    this.offset = offset;
	    this.limit = limit;
	}
	
	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}
	
	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}


	public int getLimit() {
		return limit;
	}


	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	/**
	 * 将offset,limit设置为初始状态
	 * 这样myBatis就不会对我们的查询操作进行分页了
	 */
	public void setMeToDefault() {
		this.limit = RowBounds.NO_ROW_LIMIT;
		this.offset = RowBounds.NO_ROW_OFFSET;
	}
	
	public int getSelectCount() {
		return limit + offset;
	}
}
