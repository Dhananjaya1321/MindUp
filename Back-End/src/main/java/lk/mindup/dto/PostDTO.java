package lk.mindup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class PostDTO {
    private String post_id;
    private LocalDateTime dateTime;
    private String post_text;
    private String who_can_view;/*anyone or friends*/
    private MultipartFile media;/*image,video or audio*/


    private UserDTO user;
    private PageDTO page;

    private List<ReactionsDTO> reactions;
}
