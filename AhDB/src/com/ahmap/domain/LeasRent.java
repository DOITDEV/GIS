package com.ahmap.domain;

public class LeasRent {
	private String rentId;
	private String lanBlock;//地块
	private String cityArea;//所在城区
	private String address;//租赁地址
	private String propertys;//产权(所有权 ，使用权 ，户主)
	private String propertyNo;//产权证号
	private double landSize;//土地(m²)
	private double roomSize;//房屋(m²)
	private double nonOcc;//空置(m²)
	private String geoLocation;//地理位置
	private String realDisplay;//实景
	private String isRent;//是否已租
	private double coors_x;
	private double coors_y;
	private String leasId;
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
	private String isValid;//是否生效
	private String remark;//备注
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
	public String getPropertys() {
		return propertys;
	}
	public void setPropertys(String propertys) {
		this.propertys = propertys;
	}
	public String getPropertyNo() {
		return propertyNo;
	}
	public void setPropertyNo(String propertyNo) {
		this.propertyNo = propertyNo;
	}
	public double getLandSize() {
		return landSize;
	}
	public void setLandSize(double landSize) {
		this.landSize = landSize;
	}
	public double getRoomSize() {
		return roomSize;
	}
	public void setRoomSize(double roomSize) {
		this.roomSize = roomSize;
	}
	public double getNonOcc() {
		return nonOcc;
	}
	public void setNonOcc(double nonOcc) {
		this.nonOcc = nonOcc;
	}
	public String getGeoLocation() {
		return geoLocation;
	}
	public void setGeoLocation(String geoLocation) {
		this.geoLocation = geoLocation;
	}
	public String getRealDisplay() {
		return realDisplay;
	}
	public void setRealDisplay(String realDisplay) {
		this.realDisplay = realDisplay;
	}
	public String getIsRent() {
		return isRent;
	}
	public void setIsRent(String isRent) {
		this.isRent = isRent;
	}
	public double getCoors_x() {
		return coors_x;
	}
	public void setCoors_x(double coors_x) {
		this.coors_x = coors_x;
	}
	public double getCoors_y() {
		return coors_y;
	}
	public void setCoors_y(double coors_y) {
		this.coors_y = coors_y;
	}
	public String getLeasId() {
		return leasId;
	}
	public void setLeasId(String leasId) {
		this.leasId = leasId;
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
	public String getIsValid() {
		return isValid;
	}
	public void setIsValid(String isValid) {
		this.isValid = isValid;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
