package com.gary.base.web;

/**
 * 封装数据与总页数
 * 
 * @author 葛新
 */
public class DataAndTotal {

	public DataAndTotal(Object data, int total) {
		this.data = data;
		this.total = total;
	}

	private Object data;
	
	private int total;
	
	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}
	
}
