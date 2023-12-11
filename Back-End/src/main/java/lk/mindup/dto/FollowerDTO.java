package lk.mindup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class FollowerDTO {
    private String follower_id;
    private String other_user_id;
    private UserDTO user;
    private PageDTO page;

    public FollowerDTO(String follower_id, String other_user_id, UserDTO user) {
        this.follower_id=follower_id;
        this.other_user_id=other_user_id;
        this.user=user;
    }
}
