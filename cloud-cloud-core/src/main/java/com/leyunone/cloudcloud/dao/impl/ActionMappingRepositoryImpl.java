package com.leyunone.cloudcloud.dao.impl;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.leyunone.cloudcloud.dao.ActionMappingRepository;
import com.leyunone.cloudcloud.dao.base.repository.BaseRepository;
import com.leyunone.cloudcloud.dao.entity.ActionMappingDO;
import com.leyunone.cloudcloud.dao.mapper.ActionMappingMapper;
import com.leyunone.cloudcloud.web.bean.query.ProductTypeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * :)
 *
 * @author LeYunone
 * @email 365627310@qq.com
 * @date 2024-02-14
 */
@Repository
public class ActionMappingRepositoryImpl extends BaseRepository<ActionMappingMapper, ActionMappingDO> implements ActionMappingRepository {

    @Resource
    private ActionMappingMapper actionMappingMapper;

    @Override
    public List<ActionMappingDO> selectByProductIds(List<String> productIds, String cloud) {
        if (CollectionUtils.isEmpty(productIds)) {
            return new ArrayList<>();
        }
        return actionMappingMapper
                .selectList(new LambdaQueryWrapper<ActionMappingDO>()
                        .eq(ActionMappingDO::getThirdPartyCloud, cloud)
                        .in(ActionMappingDO::getProductId, productIds)
                );
    }

    @Override
    public List<ActionMappingDO> selectByProductId(String productId, String cloud) {
        return this.selectByProductIds(CollectionUtil.newArrayList(productId), cloud);
    }

    @Override
    public Page<ActionMappingDO> selectPageOrder(ProductTypeQuery query) {
        Page<ActionMappingDO> page = new Page<>(query.getIndex(),query.getSize());
        return this.baseMapper.selectPageOrder(query,page);
    }

}
