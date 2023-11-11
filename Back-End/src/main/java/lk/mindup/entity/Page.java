package lk.mindup.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Page {
    @Id
    private String page_id;



    @OneToMany(cascade = {CascadeType.PERSIST})
    private List<User> users;

    @OneToMany(cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Post> posts;

    @OneToMany(cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Follower> followers;

    @OneToMany(cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Following> followings;
}
