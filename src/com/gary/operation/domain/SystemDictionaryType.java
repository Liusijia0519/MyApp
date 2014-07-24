package com.gary.operation.domain;

public class SystemDictionaryType {
	
	public final static String TREE = "tree";
	
	public final static String COMBO = "combo";

	private String id;
	
	private String code;
	
	private String text;
	
	//字典类别(tree,combo)
	private String type;

	//扩展字段 为了兼容在树中显示
	private boolean leaf = true;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	
}
