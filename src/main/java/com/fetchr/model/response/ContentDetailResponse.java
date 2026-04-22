package com.fetchr.model.response;

import com.fetchr.model.entity.ContentDetail;
import com.fetchr.model.entity.Season;
import com.fetchr.model.entity.Dub;
import java.util.List;

public class ContentDetailResponse {
    private ContentDetail subject;
    private List<Season> seasons;
    private List<Dub> dubs;

    public ContentDetailResponse() {}

    public ContentDetailResponse(ContentDetail subject, List<Season> seasons, List<Dub> dubs) {
        this.subject = subject;
        this.seasons = seasons;
        this.dubs = dubs;
    }

    public ContentDetail getSubject() {
        return subject;
    }

    public void setSubject(ContentDetail subject) {
        this.subject = subject;
    }

    public List<Season> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<Season> seasons) {
        this.seasons = seasons;
    }

    public List<Dub> getDubs() {
        return dubs;
    }

    public void setDubs(List<Dub> dubs) {
        this.dubs = dubs;
    }
}
