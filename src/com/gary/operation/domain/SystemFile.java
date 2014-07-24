package com.gary.operation.domain;

public class SystemFile {
    private String id;

    private String fileid;

    private String filename;

    private byte[] filebyte;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileid() {
        return fileid;
    }

    public void setFileid(String fileid) {
        this.fileid = fileid;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public byte[] getFilebyte() {
        return filebyte;
    }

    public void setFilebyte(byte[] filebyte) {
        this.filebyte = filebyte;
    }
}