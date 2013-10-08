package com.ahmap.domain;

import java.io.Serializable;


@SuppressWarnings("serial")
public class LeasseeInfo implements Serializable{
	//承租方信息
	private String id;
	private String rentId;
	private String lanBlock;//地块
	private String cityArea;//所在城区
	private String address;//租赁地址
	private String leaholder;//承租人
	private String cardType;//证件类型
	private String idCard;//身份证证件号
	private	String tel;//联系电话
	private String timLimit;//期限
	private String startDate;//租赁起始日期
	private String endDate;//租赁结束日期
	private double monRent;//月租金
	private double yerRent;//年租金
	private double wuyeFee;//物业管理费
	private double parkFee;//停车费
	private double handsel;//押金
	private double penalty;//违约金
	private String payType;//支付方式
	private String rentStatus;//租金收缴(已交、滞交)
	private String outDays;//滞交天数
	private String incExplain;//租金调整说明
	private String nextPayDate;//下次缴费日期
	private String createTime;//创建时间
	private String isValid;//是否生效(0 表示已过期的历史租赁信息，1 表示当前有效的租赁信息)
	private RentInfo rentInfo;
	private String remark;//备注
	private String dateFlag;//距离租赁到期时间(0 已到期,1 一个月内到期,3 三个月内到期,9距离到期时间超过三个月)
	private String filler3;
	private double filler4;
	private String filler5;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIsValid() {
		return isValid;
	}
	public void setIsValid(String isValid) {
		this.isValid = isValid;
	}
	public String getRentId() {
		return rentId;
	}
	public void setRentId(String rentId) {
		this.rentId = rentId;
	}
	public String getLanBlock() {
		return lanBlock;
	}
	public void setLanBlock(String lanBlock) {
		this.lanBlock = lanBlock;
	}
	public String getCityArea() {
		return cityArea;
	}
	public void setCityArea(String cityArea) {
		this.cityArea = cityArea;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getLeaholder() {
		return leaholder;
	}
	public void setLeaholder(String leaholder) {
		this.leaholder = leaholder;
	}
	public String getCardType() {
		return cardType;
	}
	public void setCardType(String cardType) {
		this.cardType = cardType;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getTimLimit() {
		return timLimit;
	}
	public void setTimLimit(String timLimit) {
		this.timLimit = timLimit;
	}
	
	public double getMonRent() {
		return monRent;
	}
	public void setMonRent(double monRent) {
		this.monRent = monRent;
	}
	public double getYerRent() {
		return yerRent;
	}
	public void setYerRent(double yerRent) {
		this.yerRent = yerRent;
	}
	public double getWuyeFee() {
		return wuyeFee;
	}
	public void setWuyeFee(double wuyeFee) {
		this.wuyeFee = wuyeFee;
	}
	public double getParkFee() {
		return parkFee;
	}
	public void setParkFee(double parkFee) {
		this.parkFee = parkFee;
	}
	public double getHandsel() {
		return handsel;
	}
	public void setHandsel(double handsel) {
		this.handsel = handsel;
	}
	public double getPenalty() {
		return penalty;
	}
	public void setPenalty(double penalty) {
		this.penalty = penalty;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public String getRentStatus() {
		return rentStatus;
	}
	public void setRentStatus(String rentStatus) {
		this.rentStatus = rentStatus;
	}
	public String getOutDays() {
		return outDays;
	}
	public void setOutDays(String outDays) {
		this.outDays = outDays;
	}
	public String getIncExplain() {
		return incExplain;
	}
	public void setIncExplain(String incExplain) {
		this.incExplain = incExplain;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getNextPayDate() {
		return nextPayDate;
	}
	public void setNextPayDate(String nextPayDate) {
		this.nextPayDate = nextPayDate;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public RentInfo getRentInfo() {
		return rentInfo;
	}
	public void setRentInfo(RentInfo rentInfo) {
		this.rentInfo = rentInfo;
	}
	public String getFiller3() {
		return filler3;
	}
	public void setFiller3(String filler3) {
		this.filler3 = filler3;
	}
	public double getFiller4() {
		return filler4;
	}
	public void setFiller4(double filler4) {
		this.filler4 = filler4;
	}
	public String getFiller5() {
		return filler5;
	}
	public void setFiller5(String filler5) {
		this.filler5 = filler5;
	}
	public String getDateFlag() {
		return dateFlag;
	}
	public void setDateFlag(String dateFlag) {
		this.dateFlag = dateFlag;
	}
	
}
