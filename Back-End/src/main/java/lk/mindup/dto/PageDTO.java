package lk.mindup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class PageDTO {
    private String page_id;



    private List<UserDTO> users;

    private List<PostDTO> posts;

    private List<FollowerDTO> followers;

    private List<FollowingDTO> followings;
}
