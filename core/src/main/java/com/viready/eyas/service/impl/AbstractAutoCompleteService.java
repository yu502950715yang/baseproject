package com.viready.eyas.service.impl;

import com.viready.eyas.model.AutoComplete;
import com.viready.eyas.service.AutoCompleteService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 自动提示的抽象类
 */
public abstract class AbstractAutoCompleteService implements AutoCompleteService {

    private Map<String, List<AutoComplete>> autoCompleteMap;

    @Override
    public void initAutoComplete() {
        initAutoCompleteMap();
        initAutoCompleteSpell();
    }

    /**
     * 初始化所有的AutoComplete的list
     */
    abstract protected void initAutoCompleteMap();

    /**
     * 对已缓存的map进行拼音转换
     */
    public void initAutoCompleteSpell() {
        Map<String, List<AutoComplete>> map = getAutoCompleteMap();
        for (String str : map.keySet()) {
            initAutoCompleteSpell(map.get(str));
        }
    }

    /**
     * 对list进行拼音转换
     */
    protected void initAutoCompleteSpell(List<AutoComplete> list) {
        if (list == null) {
            return;
        }
        for (AutoComplete autoCompleteVO : list) {
            autoCompleteVO.setSpellAndFirstSpellByName();
        }
    }

    /**
     * 获取自动提示的结果
     *
     * @param autoCompleteParam
     * @return
     */
    @Override
    public List<AutoComplete> getAutoCompleteResultList(AutoComplete autoCompleteParam) {
        return getMatchAutoCompleteList(autoCompleteParam, getAllAutoCompleteList(autoCompleteParam));
    }

    /**
     * 获取该flag下的list，包含全部信息
     *
     * @param autoCompleteParam
     * @return
     */
    private List<AutoComplete> getAllAutoCompleteList(AutoComplete autoCompleteParam) {
        if (getAutoCompleteMap() == null) {
            initAutoComplete();
        }
        return getAutoCompleteMap().get(autoCompleteParam.getFlag());
    }

    /**
     * 获取该flag下的匹配的list，默认多于10条的显示10条
     *
     * @param autoCompleteParam
     * @return
     */
    protected List<AutoComplete> getMatchAutoCompleteList(AutoComplete autoCompleteParam, List<AutoComplete> autoCompleteList) {
        List<AutoComplete> autoCompleteResultList = new ArrayList<AutoComplete>();
        if (autoCompleteList == null || autoCompleteList.size() <= 0) {
            return autoCompleteList;
        }
        for (AutoComplete autoCompleteVO : autoCompleteList) {
            if (!autoCompleteParam.isShowAll() && autoCompleteResultList.size() >= 10) {
                break;
            }
            if (autoCompleteVO.contain(autoCompleteParam.getKeyword())) {
                autoCompleteResultList.add(autoCompleteVO);
            }
        }
        return autoCompleteResultList;
    }

    public Map<String, List<AutoComplete>> getAutoCompleteMap() {
        return autoCompleteMap;
    }

    public void setAutoCompleteMap(Map<String, List<AutoComplete>> autoCompleteMap) {
        this.autoCompleteMap = autoCompleteMap;
    }
}
