package com.gary.base.interceptor;

public class RightsKey {
	
	public RightsKey() {}
	
	public RightsKey(String springController, String methodName) {
		super();
		this.springController = springController;
		this.methodName = methodName;
	}

	private String springController;

	private String methodName;

	public String getSpringController() {
		return springController;
	}

	public void setSpringController(String springController) {
		this.springController = springController;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((methodName == null) ? 0 : methodName.hashCode());
		result = prime
				* result
				+ ((springController == null) ? 0 : springController.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RightsKey other = (RightsKey) obj;
		if (methodName == null) {
			if (other.methodName != null)
				return false;
		} else if (!methodName.equals(other.methodName))
			return false;
		if (springController == null) {
			if (other.springController != null)
				return false;
		} else if (!springController.equals(other.springController))
			return false;
		return true;
	}
	
}
