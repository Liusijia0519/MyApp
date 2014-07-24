package com.gary.base.web;

/**
 * 封装Extjs Gird 查询排序对象
 * 
 * @author 葛新
 */
public class Sort {

	private String property;
	
	private String direction;

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}
}
