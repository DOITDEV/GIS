package com.ahmap.domain;


public class PaymentInfo {
	private String leasseeId;//承租人信息id
	private String rentId;//出租信息id
	private String address;//租赁地址
	private double amount;//付款金额
	private String payType;//支付方式
	private String payee;//收款人
	private String createTime;//付款日期
	
	public String getLeasseeId() {
		return leasseeId;
	}
	public void setLeasseeId(String leasseeId) {
		this.leasseeId = leasseeId;
	}
	public String getRentId() {
		return rentId;
	}
	public void setRentId(String rentId) {
		this.rentId = rentId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public String getPayee() {
		return payee;
	}
	public void setPayee(String payee) {
		this.payee = payee;
	}
	
}
