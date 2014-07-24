package com.gary.base.system;

public class SystemException extends RuntimeException {
	
	private static final long serialVersionUID = 1549912024489826536L;
	
	private String message;
	
	public SystemException(String message) {
		super(message);
		this.message = message;
	}
	
	public SystemException(String message, Throwable cause) {
		super(message, cause);
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}

}
