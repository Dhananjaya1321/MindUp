package lk.mindup.controller;

import lk.mindup.service.PageService;
import lk.mindup.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/page")
public class PageController {
    @Autowired
    PageService pageService;

    @GetMapping(path = "/last/page/id")
    public ResponseUtil getLastPageId() {
        return new ResponseUtil("Ok", "Successfully Loaded...!", pageService.getLastPageId());
    }
}
