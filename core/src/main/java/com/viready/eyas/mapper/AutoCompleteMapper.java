package com.viready.eyas.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.viready.eyas.model.AutoComplete;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-20 17:09
 */
@Repository
public interface AutoCompleteMapper extends BaseMapper<AutoComplete> {

    List<AutoComplete> gAutoRoleName();
}
