package com.ahmap.domain;

import java.io.Serializable;

@SuppressWarnings("serial")
public class RentInfo implements Serializable{
	//出租方信息
	private String id;
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
	private String isRentName;//是否已租
	private double coors_x;
	private double coors_y;
	private String filler1;
	private String filler2;
	private String filler3;
	
	public String getFiller1() {
		return filler1;
	}
	public void setFiller1(String filler1) {
		this.filler1 = filler1;
	}
	public String getFiller2() {
		return filler2;
	}
	public void setFiller2(String filler2) {
		this.filler2 = filler2;
	}
	public String getFiller3() {
		return filler3;
	}
	public void setFiller3(String filler3) {
		this.filler3 = filler3;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getIsRentName() {
		return isRentName;
	}
	public void setIsRentName(String isRentName) {
		this.isRentName = isRentName;
	}
	
}
