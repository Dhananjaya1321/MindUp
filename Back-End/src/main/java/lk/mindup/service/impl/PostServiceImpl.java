package lk.mindup.service.impl;

import lk.mindup.repo.PostRepo;
import lk.mindup.repo.ReactionsRepo;
import lk.mindup.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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

}
