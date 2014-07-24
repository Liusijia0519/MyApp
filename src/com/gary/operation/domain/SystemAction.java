package com.gary.operation.domain;

public class SystemAction {

	/* in database */
	private String id;
	
	private String description;
	
	private String springController;
	
	private String methodName;

	/* extend */
	private String menuName;
	
	private boolean checked;
	
	private String text;
	
	private boolean used = false;
	
	public boolean isUsed() {
		return used;
	}

	public void setUsed(boolean used) {
		this.used = used;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	
	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSpringController() {
		return springController;
	}

	public void setSpringController(String springController) {
		this.springController = springController;
	}
	
	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	
}
