package lk.mindup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomDTO {
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
}
