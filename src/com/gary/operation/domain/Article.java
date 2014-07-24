package com.gary.operation.domain;

import java.util.Date;

public class Article {
    private String id;

    private String categoryid;

    private String zhutici;

    private String createuser;

    private Date createtime;

    private String modifyuser;

    private Date modifytime;

    private String authorname;

    private String authororg;

    private String articlesource;

    private String articlepicture;

    private String istop;

    private Integer sortorder;
    
    private String articletitle;

    private String articlecontent;

    public String getArticletitle() {
        return articletitle;
    }

    public void setArticletitle(String articletitle) {
        this.articletitle = articletitle;
    }

    public String getArticlecontent() {
        return articlecontent;
    }

    public void setArticlecontent(String articlecontent) {
        this.articlecontent = articlecontent;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(String categoryid) {
        this.categoryid = categoryid;
    }

    public String getZhutici() {
        return zhutici;
    }

    public void setZhutici(String zhutici) {
        this.zhutici = zhutici;
    }

    public String getCreateuser() {
        return createuser;
    }

    public void setCreateuser(String createuser) {
        this.createuser = createuser;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getModifyuser() {
        return modifyuser;
    }

    public void setModifyuser(String modifyuser) {
        this.modifyuser = modifyuser;
    }

    public Date getModifytime() {
        return modifytime;
    }

    public void setModifytime(Date modifytime) {
        this.modifytime = modifytime;
    }

    public String getAuthorname() {
        return authorname;
    }

    public void setAuthorname(String authorname) {
        this.authorname = authorname;
    }

    public String getAuthororg() {
        return authororg;
    }

    public void setAuthororg(String authororg) {
        this.authororg = authororg;
    }

    public String getArticlesource() {
        return articlesource;
    }

    public void setArticlesource(String articlesource) {
        this.articlesource = articlesource;
    }

    public String getArticlepicture() {
        return articlepicture;
    }

    public void setArticlepicture(String articlepicture) {
        this.articlepicture = articlepicture;
    }

    public String getIstop() {
        return istop;
    }

    public void setIstop(String istop) {
        this.istop = istop;
    }

    public Integer getSortorder() {
        return sortorder;
    }

    public void setSortorder(Integer sortorder) {
        this.sortorder = sortorder;
    }
}