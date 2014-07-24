package com.gary.operation.domain;

public class Previewtrack {
    private String id;

    private String name;

    private String developerid;
    
    private String developername;

    private String trackstatus;

    private String trackdescription;

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

    public String getDevelopername() {
        return developername;
    }

    public void setDevelopername(String developername) {
        this.developername = developername;
    }

    public String getTrackstatus() {
        return trackstatus;
    }

    public void setTrackstatus(String trackstatus) {
        this.trackstatus = trackstatus;
    }

    public String getTrackdescription() {
        return trackdescription;
    }

    public void setTrackdescription(String trackdescription) {
        this.trackdescription = trackdescription;
    }

	public String getDeveloperid() {
		return developerid;
	}

	public void setDeveloperid(String developerid) {
		this.developerid = developerid;
	}
}