package com.gary.operation.domain;

import java.math.BigDecimal;

public class PartnerBase {
    private String id;

    private String pcode;

    private String name;

    private String channelid;

    private BigDecimal payratio;

    private Boolean ischannel;
    
    private String userid;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPcode() {
        return pcode;
    }

    public void setPcode(String pcode) {
        this.pcode = pcode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChannelid() {
        return channelid;
    }

    public void setChannelid(String channelid) {
        this.channelid = channelid;
    }

    public BigDecimal getPayratio() {
        return payratio;
    }

    public void setPayratio(BigDecimal payratio) {
        this.payratio = payratio;
    }

    public Boolean getIschannel() {
        return ischannel;
    }

    public void setIschannel(Boolean ischannel) {
        this.ischannel = ischannel;
    }

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
}