package lk.mindup.service.impl;

import lk.mindup.dto.PositionsDTO;
import lk.mindup.dto.PostDTO;
import lk.mindup.entity.Post;
import lk.mindup.repo.PostRepo;
import lk.mindup.repo.ReactionsRepo;
import lk.mindup.service.PostService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
    ReactionsRepo reactionsRepo;

    @Override
    public String getLastPostId() {
        return postRepo.getLastPostId();
    }

    @Override
    public String getLastReactionId() {
        return reactionsRepo.getLastReactionId();
    }

    @Override
    public List<PostDTO> getUserPosts(String user_id, int post_count) {
        return modelMapper.map(postRepo.getUserPosts(user_id,post_count), new TypeToken<ArrayList<Post>>() {
        }.getType());
    }

}
