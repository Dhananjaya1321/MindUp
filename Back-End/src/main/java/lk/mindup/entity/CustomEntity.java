package lk.mindup.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomEntity {
    private String email;
    private String username;
    private String password;
    private String follower_id;
    private String following_id;
    private String page_id;
    private String page_name;
    private String contact;
    private String county;
    private String province;
    private String description;
    private String headline;
    private String youtube_channel;
    private String website;
    private String verified_or_not;
    private String profile_photo;
    private String cover_photo;
    private String position_id;
    private String company_name;
    private String position;
    private String start_date;
    private String end_date;
    private String post_id;
    private LocalDateTime dateTime;
    private String post_text;
    private String how_can_view;
    private String media;
    private String reaction_id;
    private String user_id;
    private String name;
    private String address;
    private String country;
    private String gender;
    private String page_headline;
    private String page_youtube_channel;
    private String page_verified_or_not;
    private String page_profile_photo;
    private String page_cover_photo;

    public CustomEntity(String name, String address, String country, String contact, String gender, String headline, String youtube_channel, String verified_or_not, String profile_photo, String cover_photo, String page_id) {
        this.name=name;
        this.address=address;
        this.country=country;
        this.contact=contact;
        this.gender=gender;
        this.headline=headline;
        this.youtube_channel=youtube_channel;
        this.verified_or_not=verified_or_not;
        this.profile_photo=profile_photo;
        this.cover_photo=cover_photo;
        this.page_id=page_id;
    }
}
