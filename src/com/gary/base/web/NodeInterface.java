package com.gary.base.web;

import java.util.List;

public class NodeInterface {

	//id
	private String id;

	//显示的文本
	private String text;
	
	//icon图标
	private String iconCls;
	
	//排序
	private int index;
	
	//是否页
	private boolean leaf = false;
	
	//是否已经加载
	private boolean loaded = false;
	
	//子节点
	private List<NodeInterface> children;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public boolean isLoaded() {
		return loaded;
	}

	public void setLoaded(boolean loaded) {
		this.loaded = loaded;
	}

	public List<NodeInterface> getChildren() {
		return children;
	}

	public void setChildren(List<NodeInterface> children) {
		this.children = children;
	}
	
}
