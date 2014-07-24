package com.gary.operation.domain;

import java.math.BigDecimal;

public class Previewresult {
    private String id;
    
    private int index;

    private String pid;

    private String appname;
    
    private String developername;

    private BigDecimal amountplm;

    private BigDecimal amountprm;

    private BigDecimal amountrecived;

    private BigDecimal amountreturn;

    private BigDecimal amountdeduct;

    private BigDecimal amountaddition;

    private BigDecimal amounttotal;

    private BigDecimal ratioinner;

    private BigDecimal ratiooutter;

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

    public String getAppname() {
        return appname;
    }

    public void setAppname(String appname) {
        this.appname = appname;
    }

    public BigDecimal getAmountplm() {
        return amountplm;
    }

    public void setAmountplm(BigDecimal amountplm) {
        this.amountplm = amountplm;
    }

    public BigDecimal getAmountprm() {
        return amountprm;
    }

    public void setAmountprm(BigDecimal amountprm) {
        this.amountprm = amountprm;
    }

    public BigDecimal getAmountrecived() {
        return amountrecived;
    }

    public void setAmountrecived(BigDecimal amountrecived) {
        this.amountrecived = amountrecived;
    }

    public BigDecimal getAmountreturn() {
        return amountreturn;
    }

    public void setAmountreturn(BigDecimal amountreturn) {
        this.amountreturn = amountreturn;
    }

    public BigDecimal getAmountdeduct() {
        return amountdeduct;
    }

    public void setAmountdeduct(BigDecimal amountdeduct) {
        this.amountdeduct = amountdeduct;
    }

    public BigDecimal getAmountaddition() {
        return amountaddition;
    }

    public void setAmountaddition(BigDecimal amountaddition) {
        this.amountaddition = amountaddition;
    }

    public BigDecimal getAmounttotal() {
        return amounttotal;
    }

    public void setAmounttotal(BigDecimal amounttotal) {
        this.amounttotal = amounttotal;
    }

    public BigDecimal getRatioinner() {
        return ratioinner;
    }

    public void setRatioinner(BigDecimal ratioinner) {
        this.ratioinner = ratioinner;
    }

    public BigDecimal getRatiooutter() {
        return ratiooutter;
    }

    public void setRatiooutter(BigDecimal ratiooutter) {
        this.ratiooutter = ratiooutter;
    }

	public String getDevelopername() {
		return developername;
	}

	public void setDevelopername(String developername) {
		this.developername = developername;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}
}