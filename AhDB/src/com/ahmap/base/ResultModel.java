package com.ahmap.base;

import java.io.Serializable;

public class ResultModel implements Serializable {
	protected boolean success = true;
	protected String msg = "操作成功!";
	
	private static ResultModel rm = new ResultModel();
	
	public ResultModel() {
	}
	public ResultModel(boolean success,String msg) {
		this.success = success;
		this.msg = msg;
	}
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public static ResultModel getResult(int type,Object...msg){
		ResultModel model = null;
		
		switch (type) {
			case 0:
				model = rm;
				break;
			case 1:
				model = new ResultModel(false,"操作失败!");
			default:
				if(null != msg){
					msg = (Object[])msg;
					
					model = new ResultModel(Boolean.getBoolean(msg[0].toString()),msg[1].toString());
				}
				break;
			}
		return model;
	}
}