package lk.mindup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class UserDTO {
    private String user_id;
    private String name;
    private String address;
    private String headline;
    private String youtube_channel;
    private String verified_or_not;
    private String profile_photo;
    private String cover_photo;

    private PageDTO page;

    private LoginDTO login;

    private List<PositionsDTO> positions;

    private List<PostDTO> posts;

    private List<FollowerDTO> followers;

    private List<FollowingDTO> followings;

    private List<ReactionsDTO> reactions;
}
