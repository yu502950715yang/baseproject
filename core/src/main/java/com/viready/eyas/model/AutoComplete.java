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

    private String id;//hidden input的value
    private String name;//text input的value
    private String spell;//拼音全写
    private String firstSpell;//拼音首字母

    private String keyword;//查询时候的关键字
    private boolean isShowAll;//是否显示全部结果
    private String flag;//查询类别


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

