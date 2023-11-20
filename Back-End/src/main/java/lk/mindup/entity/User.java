package lk.mindup.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class User {
    @Id
    private String user_id;
    private String name;
    private String address;
    private String headline;
    private String youtube_channel;
    private String verified_or_not;
    private String profile_photo;
    private String cover_photo;



    @ManyToOne
    private Page page;

    @OneToOne(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private Login login;

    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Positions> positions;

    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Post> posts;

    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Follower> followers;

    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Following> followings;

    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Reactions> reactions;
}
