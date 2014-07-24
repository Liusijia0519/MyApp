package com.gary.base.web;

public class PageModel {

	private int totalRecords;

	private int pageNo;

	private int pageSize;
	
	private Object list;
	
	public PageModel(Object list, WebPage page) {
		this.list = list;
		this.totalRecords = page.getPageBounds().getTotal();
		this.pageNo = ((WebPageImpl)page).page;
		this.pageSize = ((WebPageImpl)page).limit;
	}
	
	public Object getList() {
		return list;
	}

	public void setList(Object list) {
		this.list = list;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	/**
	 * 取得总页数
	 */
	public int getTotalPages() {
		return (totalRecords + pageSize - 1) / pageSize;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	/**
	 * 取得第一页
	 */
	public int getTopPageNo() {
		return 1;
	}

	/**
	 * 取得上一页
	 */
	public int getPreviousPageNo() {
		if (pageNo <= 1) {
			return 1;
		}
		return pageNo - 1;
	}

	/**
	 * 取得下一页
	 */
	public int getNextPageNo() {
		if (pageNo >= getTotalPages()) {
			return getTotalPages() == 0 ? 1 : getTotalPages();
		}
		return pageNo + 1;
	}

	/**
	 * 取得最后一页
	 */
	public int getBottomPageNo() {
		return getTotalPages() == 0 ? 1 : getTotalPages();
	}

}
