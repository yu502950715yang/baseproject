package com.viready.eyas.controller.core;

import com.viready.eyas.model.AutoComplete;
import com.viready.eyas.service.AutoCompleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-20 17:03
 */
@Controller
@RequestMapping("/autoComplete")
public class AutoCompleteController {

    @Autowired
    private AutoCompleteService autoCompleteService;

    @RequestMapping
    @ResponseBody
    public List<AutoComplete> autoComplete(AutoComplete autoCompleteParam) {
        return autoCompleteService.getAutoCompleteResultList(autoCompleteParam);
    }
}
