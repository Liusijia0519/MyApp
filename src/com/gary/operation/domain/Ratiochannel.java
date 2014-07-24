package com.gary.operation.domain;

import java.math.BigDecimal;

public class Ratiochannel {
    private String id;

    private String channelid;

    private String developerid;

    private BigDecimal ratio;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getChannelid() {
        return channelid;
    }

    public void setChannelid(String channelid) {
        this.channelid = channelid;
    }

    public String getDeveloperid() {
        return developerid;
    }

    public void setDeveloperid(String developerid) {
        this.developerid = developerid;
    }

    public BigDecimal getRatio() {
        return ratio;
    }

    public void setRatio(BigDecimal ratio) {
        this.ratio = ratio;
    }
}