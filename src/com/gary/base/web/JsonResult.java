package com.gary.base.web;

public class JsonResult {

	public static JsonResult SUCCESS = new JsonResult();
	
	private boolean success = Boolean.TRUE;
	
	private Object data;
	
	private int total;
	
	private String message;
	
	private Object metaData;
	
	private boolean timeOut = Boolean.FALSE;
	
	public JsonResult() {}
	
	public JsonResult(boolean success) {
		this(success, null, 0, "", null);
	}
	
	public JsonResult(DataAndTotal dataAndTotal) {
		this.data = dataAndTotal.getData();
		this.total = dataAndTotal.getTotal();
	}
	
	public JsonResult(Object data) {
		this(true, data, 0, "", null);
	}
	
	public JsonResult(boolean success, Object data) {
		this(success, data, 0, "", null);
	}
	
	public JsonResult(boolean success, String message) {
		this(success, null, 0, message, null);
	}
	
	public JsonResult(boolean success, Object data, int total) {
		this(success, data, total, "", null);
	}

	public JsonResult(boolean success, Object data, int total, String message) {
		this(success, data, total, message, null);
	}
	
	public JsonResult(boolean success, Object data, int total, String message,
			Object metaData) {
		super();
		this.success = success;
		this.data = data;
		this.total = total;
		this.message = message;
		this.metaData = metaData;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getMetaData() {
		return metaData;
	}

	public void setMetaData(Object metaData) {
		this.metaData = metaData;
	}
	
	public boolean isTimeOut() {
		return timeOut;
	}

	public void setTimeOut(boolean timeOut) {
		this.timeOut = timeOut;
	}
	
}
