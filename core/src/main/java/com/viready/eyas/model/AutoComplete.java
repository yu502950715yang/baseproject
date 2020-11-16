package com.viready.eyas.model;


import com.viready.eyas.util.Cn2Spell;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AutoComplete {

    //hidden input的value
    private String id;
    //text input的value
    private String name;
    //拼音全写
    private String spell;
    //拼音首字母
    private String firstSpell;
    //查询时候的关键字
    private String keyword;
    //是否显示全部结果
    private boolean isShowAll;
    //查询类别
    private String flag;


    public AutoComplete(String id, String name) {
        this.id = id;
        this.name = name;
        setSpellAndFirstSpellByName();
    }

    public void setSpellAndFirstSpellByName() {
        setSpell(Cn2Spell.converterToSpell(getName()));
        setFirstSpell(Cn2Spell.converterToFirstSpell(getName()));
    }

    public boolean contain(String keyword) {
        return getSpell().contains(keyword) || getFirstSpell().contains(keyword) || getName().toLowerCase().contains(keyword);
    }

    public boolean isShowAll() {
        return this.isShowAll;
    }

    public void setIsShowAll(boolean showAll) {
        this.isShowAll = showAll;
    }
}

