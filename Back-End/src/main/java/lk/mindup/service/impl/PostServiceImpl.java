package lk.mindup.service.impl;

import lk.mindup.dto.CustomDTO;
import lk.mindup.dto.PostDTO;
import lk.mindup.dto.ReactionsDTO;
import lk.mindup.entity.CustomEntity;
import lk.mindup.entity.Post;
import lk.mindup.entity.Reactions;
import lk.mindup.entity.User;
import lk.mindup.repo.PostRepo;
import lk.mindup.repo.ReactionsRepo;
import lk.mindup.repo.UserRepo;
import lk.mindup.service.PostService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PostRepo postRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ReactionsRepo reactionsRepo;

    String dir = "C:\\Users\\ACER\\Documents\\WorkZone\\MindUp\\Back-End\\src\\main\\resources\\media";

    @Override
    public void saveReaction(ReactionsDTO dto) {
        reactionsRepo.save(modelMapper.map(dto, Reactions.class));
    }

    @Override
    public void saveUserPost(PostDTO dto) throws IOException {
        MultipartFile media = dto.getMedia();
        if (dto.getMedia() != null) {
            media.transferTo(new File(new File(dir, media.getOriginalFilename()).getAbsolutePath()));
            postRepo.save(
                    new Post(
                            dto.getPost_id(),
                            dto.getDateTime(),
                            dto.getWho_can_view(),
                            media.getOriginalFilename(),
                            dto.getPost_text(),
                            new User(dto.getUser().getUser_id())
                    )
            );
        } else {
            postRepo.save(
                    new Post(
                            dto.getPost_id(),
                            dto.getDateTime(),
                            dto.getWho_can_view(),
                            null,
                            dto.getPost_text(),
                            new User(dto.getUser().getUser_id())
                    )
            );
        }
    }

    @Override
    public boolean checkReaction(String user_id, String post_id) {
        if (reactionsRepo.checkReaction(user_id, post_id) == null){
            return false;
        }
         return true;
    }

    @Override
    public void undoReaction(String user_id, String post_id) {
       reactionsRepo.deleteById(reactionsRepo.checkReaction(user_id, post_id));
    }

    @Override
    public String getLastPostId() {
        return postRepo.getLastPostId();
    }

    @Override
    public String getLastReactionId() {
        return reactionsRepo.getLastReactionId();
    }

    @Override
    public List<CustomDTO> getReactionsOfPost(String post_id) {
        return modelMapper.map(reactionsRepo.getReactionsOfPost(post_id), new TypeToken<ArrayList<CustomEntity>>() {
        }.getType());
    }

    @Override
    public List<CustomDTO> getUserPosts(String user_id, int post_count) {
        return modelMapper.map(postRepo.getUserPosts(user_id, PageRequest.of(0, post_count + 10)), new TypeToken<ArrayList<CustomEntity>>() {
        }.getType());
    }

    /*The method used to retrieve user posts and his following user posts.
      From time to time the DESC order is taken in increments of 50*/
    @Override
    public List<CustomDTO> getPostsForHome(String user_id, int post_count) {
        return modelMapper.map(postRepo.getPostsForHome(user_id, PageRequest.of(0, post_count + 50)), new TypeToken<ArrayList<CustomEntity>>() {
        }.getType());
    }
}
