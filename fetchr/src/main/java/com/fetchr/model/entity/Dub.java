package com.fetchr.model.entity;

public class Dub {
    private String subjectId;
    private String lanName;
    private String lanCode;
    private int type;
    private boolean original;
    private String detailPath;

    public Dub() {}

    public Dub(String subjectId, String lanName, String lanCode, int type, boolean original, String detailPath) {
        this.subjectId = subjectId;
        this.lanName = lanName;
        this.lanCode = lanCode;
        this.type = type;
        this.original = original;
        this.detailPath = detailPath;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getLanName() {
        return lanName;
    }

    public void setLanName(String lanName) {
        this.lanName = lanName;
    }

    public String getLanCode() {
        return lanCode;
    }

    public void setLanCode(String lanCode) {
        this.lanCode = lanCode;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public boolean isOriginal() {
        return original;
    }

    public void setOriginal(boolean original) {
        this.original = original;
    }

    public String getDetailPath() {
        return detailPath;
    }

    public void setDetailPath(String detailPath) {
        this.detailPath = detailPath;
    }
}
