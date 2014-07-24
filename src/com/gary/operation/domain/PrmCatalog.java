package com.gary.operation.domain;

import java.math.BigDecimal;

public class PrmCatalog {
    private String id;

    private String name;

    private BigDecimal amountreceivable;

    private BigDecimal amountreceived;

    private String createdate;

    private String createuser;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getCreatedate() {
        return createdate;
    }

    public void setCreatedate(String date) {
        this.createdate = date;
    }

    public String getCreateuser() {
        return createuser;
    }

    public void setCreateuser(String createuser) {
        this.createuser = createuser;
    }
}