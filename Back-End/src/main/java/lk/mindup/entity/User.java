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
    private String country;
    private String contact;
    private String gender;
    private String headline;
    private String youtube_channel;
    private String verified_or_not;
    private String profile_photo;
    private String cover_photo;


    @ManyToOne
    private Page page;

    @OneToOne(cascade = {CascadeType.ALL})
    private Login login;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Positions> positions;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Post> posts;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Follower> followers;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Following> followings;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Reactions> reactions;

    public User(String user_id) {
        this.user_id = user_id;
    }

    public User(String user_id, String name, String headline, String verified_or_not, String profile_photo, String cover_photo) {
        this.user_id = user_id;
        this.name = name;
        this.headline = headline;
        this.verified_or_not = verified_or_not;
        this.profile_photo = profile_photo;
        this.cover_photo = cover_photo;
    }

    public User(String user_id, String name,String address,String country,String contact, String gender,
                String headline,String youtube_channel, String verified_or_not, String profile_photo,
                String cover_photo,Login login) {
        this.user_id = user_id;
        this.name = name;
        this.address = address;
        this.country = country;
        this.contact = contact;
        this.gender = gender;
        this.headline = headline;
        this.youtube_channel = youtube_channel;
        this.verified_or_not = verified_or_not;
        this.profile_photo = profile_photo;
        this.cover_photo = cover_photo;
        this.login = login;
    }
}
