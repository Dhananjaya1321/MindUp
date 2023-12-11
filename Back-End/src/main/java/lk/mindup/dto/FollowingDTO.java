package lk.mindup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class FollowingDTO {
    private String following_id;
    private String other_user_id;
    private UserDTO user;
    private PageDTO page;

    public FollowingDTO(String following_id, String other_user_id, UserDTO user) {
        this.following_id=following_id;
        this.other_user_id=other_user_id;
        this.user=user;
    }
}
