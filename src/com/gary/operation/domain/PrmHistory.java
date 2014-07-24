package com.gary.operation.domain;

import java.math.BigDecimal;

public class PrmHistory {
    private String id;

    private String pid;

    private String province;

    private BigDecimal amountreceivable;

    private BigDecimal amountreceived;
    
    public PrmHistory(){
    	amountreceivable=new BigDecimal(0);
    	amountreceived=new BigDecimal(0);
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public BigDecimal getAmountreceivable() {
        return amountreceivable;
    }

    public void setAmountreceivable(BigDecimal amountreceivable) {
        this.amountreceivable = amountreceivable;
    }

    public BigDecimal getAmountreceived() {
        return amountreceived;
    }

    public void setAmountreceived(BigDecimal amountreceived) {
        this.amountreceived = amountreceived;
    }
}