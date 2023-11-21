package lk.mindup.service.impl;

import lk.mindup.repo.PageRepo;
import lk.mindup.service.PageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PageServiceImpl implements PageService {
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PageRepo pageRepo;

    @Override
    public String getLastPageId() {
        return pageRepo.getLastPageId();
    }

}
