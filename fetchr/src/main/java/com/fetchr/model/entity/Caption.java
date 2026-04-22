package com.fetchr.model.entity;

public class Caption {
    private String id;
    private String lan;
    private String lanName;
    private String url;
    private String size;

    public Caption() {}

    public Caption(String id, String lan, String lanName, String url, String size) {
        this.id = id;
        this.lan = lan;
        this.lanName = lanName;
        this.url = url;
        this.size = size;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLan() {
        return lan;
    }

    public void setLan(String lan) {
        this.lan = lan;
    }

    public String getLanName() {
        return lanName;
    }

    public void setLanName(String lanName) {
        this.lanName = lanName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}
