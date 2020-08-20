package com.viready.eyas.service;


import com.viready.eyas.model.AutoComplete;

import java.util.List;

/**
 * 自动提示的抽象类
 */
public interface AutoCompleteService {

    void initAutoComplete();

    List<AutoComplete> getAutoCompleteResultList(AutoComplete autoCompleteParam);
}
