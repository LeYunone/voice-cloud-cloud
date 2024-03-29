package com.leyunone.cloudcloud.dao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.leyunone.cloudcloud.bean.enums.ConvertFunctionEnum;
import com.leyunone.cloudcloud.enums.OperationEnum;
import com.leyunone.cloudcloud.enums.ThirdPartyCloudEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * :)
 *
 * @author LeYunone
 * @email 365627310@qq.com
 * @date 2024-02-14
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("m_action_mapping")
public class ActionMappingDO{

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String productId;

    /**
     * 三方参数
     */
    private String thirdSignCode;

    /**
     * 三方行为标识
     */
    private String thirdActionCode;

    private String signCode;

    private Integer functionId;

    private String defaultValue;

    private Boolean valueOf;

    private String valueMapping;

    private ThirdPartyCloudEnum thirdPartyCloud;

    private OperationEnum operation;

    private ConvertFunctionEnum convertFunction;

}
