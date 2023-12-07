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
}
