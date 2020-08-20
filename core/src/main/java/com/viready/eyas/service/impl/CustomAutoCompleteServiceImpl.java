package com.viready.eyas.service.impl;

import com.viready.eyas.mapper.AutoCompleteMapper;
import com.viready.eyas.model.AutoComplete;
import com.viready.eyas.service.CustomAutoCompleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-20 17:07
 */
@Service("autoCompleteService")
public class CustomAutoCompleteServiceImpl extends AbstractAutoCompleteService implements CustomAutoCompleteService {

    @Autowired
    private AutoCompleteMapper autoCompleteMapper;

    @Override
    protected void initAutoCompleteMap() {
        Map<String, List<AutoComplete>> autoCompleteMap = new HashMap<>();
        autoCompleteMap.put("gAutoRoleName", autoCompleteMapper.gAutoRoleName());
        setAutoCompleteMap(autoCompleteMap);
    }

    @Override
    public List<AutoComplete> gAutoRoleName(AutoComplete autoCompleteParam) {
        List<AutoComplete> autoCompleteList = autoCompleteMapper.gAutoRoleName();
        initAutoCompleteSpell(autoCompleteList);
        return getMatchAutoCompleteList(autoCompleteParam, autoCompleteList);
    }
}
