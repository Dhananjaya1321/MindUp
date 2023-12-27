package lk.mindup.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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
    private String who_can_view;
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
    private User user;
    private Page page;
    private List<Reactions> reactions;

    public CustomEntity(String name, String address, String country, String contact, String gender, String headline, String youtube_channel, String verified_or_not, String profile_photo, String cover_photo, String page_id) {
        this.name = name;
        this.address = address;
        this.country = country;
        this.contact = contact;
        this.gender = gender;
        this.headline = headline;
        this.youtube_channel = youtube_channel;
        this.verified_or_not = verified_or_not;
        this.profile_photo = profile_photo;
        this.cover_photo = cover_photo;
        this.page_id = page_id;
    }

    public CustomEntity(String post_id, LocalDateTime dateTime, String post_text, String who_can_view, String media, String user_id, String page_id) {
        this.post_id = post_id;
        this.dateTime = dateTime;
        this.post_text = post_text;
        this.who_can_view = who_can_view;
        this.media = media;
        this.user_id = user_id;
        this.page_id = page_id;
    }

    public CustomEntity(String reaction_id, String user_id, String profile_photo, String name) {
        this.reaction_id = reaction_id;
        this.user_id = user_id;
        this.profile_photo = profile_photo;
        this.name = name;
    }
    public CustomEntity(String name,String address,String country,String contact,String gender,String headline,
                String youtube_channel,String verified_or_not,String profile_photo,String cover_photo,
                String email,String password,String username) {
        this.user_id=user_id;
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
        this.email=email;
        this.password=password;
        this.username=username;
    }
}
