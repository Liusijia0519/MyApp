package com.gary.operation.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class SystemDictionary {

	/* in database */
	private String id;
	
	private String dictionaryTypeCode;
	
	private String text;
	
	private String parentId;
	
	private int index;
	
	private boolean availabl;
	
	private boolean leaf;
	
	private int level;  //lyh added
	
	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	
	
	/* extend */
	@JsonInclude(Include.NON_EMPTY)
	private List<SystemDictionary> children = new ArrayList<SystemDictionary>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDictionaryTypeCode() {
		return dictionaryTypeCode;
	}

	public void setDictionaryTypeCode(String dictionaryTypeCode) {
		this.dictionaryTypeCode = dictionaryTypeCode;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public boolean isAvailabl() {
		return availabl;
	}

	public void setAvailabl(boolean availabl) {
		this.availabl = availabl;
	}

	public List<SystemDictionary> getChildren() {
		return children;
	}

	public void setChildren(List<SystemDictionary> children) {
		this.children = children;
	}
	
	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	
}
