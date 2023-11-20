package lk.mindup.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Post {
    @Id
    private String post_id;
    private LocalDateTime dateTime;
    private String post_text;
    private String how_can_view;/*anyone or friends*/
    private String media;/*image,video or audio*/



    @ManyToOne
    private User user;

    @ManyToOne
    private Page page;

    @OneToMany(mappedBy = "post",cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Reactions> reactions;
}
