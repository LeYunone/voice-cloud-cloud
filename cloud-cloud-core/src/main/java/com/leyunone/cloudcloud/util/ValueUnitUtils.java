package com.leyunone.cloudcloud.util;

import com.alibaba.fastjson.JSONObject;
import com.leyunone.cloudcloud.bean.Celsius;

public class ValueUnitUtils {

    public static Object celsiusUnit(String value) {
        return new Celsius(Float.parseFloat(value));
    }
}
