package com.viready.eyas.common.page;


import com.github.pagehelper.PageHelper;
import org.apache.commons.lang3.StringUtils;

public class PageHandle {

    public static void startPage(Page page){
        if (StringUtils.isNotBlank(page.getSortField()) && StringUtils.isNotBlank(page.getSortOrder())){
            PageHelper.startPage(page.getPageNo(), page.getPageSize(), page.getSortField() + " " + page.getSortOrder());
        }else {
            PageHelper.startPage(page.getPageNo(), page.getPageSize());
        }
    }
}
