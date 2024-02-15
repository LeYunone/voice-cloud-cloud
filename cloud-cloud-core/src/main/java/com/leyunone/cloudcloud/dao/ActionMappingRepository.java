package com.leyunone.cloudcloud.dao;

import com.leyunone.cloudcloud.dao.base.iservice.IBaseRepository;
import com.leyunone.cloudcloud.dao.entity.ActionMappingDO;

import java.util.List;

/**
 * :)
 *
 * @author LeYunone
 * @email 365627310@qq.com
 * @date 2024-02-14
 */
public interface ActionMappingRepository extends IBaseRepository<ActionMappingDO> {

    List<ActionMappingDO> selectByProductIds(List<String> productIds, String cloud);
}
