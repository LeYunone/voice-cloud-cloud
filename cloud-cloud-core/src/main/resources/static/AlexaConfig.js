Vue.component("alexa-config", {
    template: `
    <div>
        <div>
            <h2>Alexa配置页面</h2>
            <div class="tab-content">Alexa配置内容</div>
            <el-tabs type="border-card">
                <el-tab-pane label="产品映射">
                    <el-button type="primary" @click="productTypeDialog = true">新增</el-button>
                    <el-table :data="productTypeTable" style="height:500px;overflow: auto;width: 100%">
                        <el-table-column prop="productId" label="开发云产品ID"></el-table-column>
                        <el-table-column prop="thirdProductIds" label="产商云产品ID">
                            <template slot-scope="scope">
                                <span v-html="scope.row.thirdProductIds.join('<br>')"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="thirdPartyCloud" label="产商云"></el-table-column>
                        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="productTypeEdit(scope.row.productId)">编辑</el-button>
                                <el-button type="text" @click="productTypeDelete(scope.row.productId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @size-change="productTypeHandleSizeChange"
                            @current-change="productTypeHandleCurrentChange"
                            :current-page="productTypeCurrentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="productTypePageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :productTypeTotal="productTypeTotal"
                    >
                    </el-pagination>
                </el-tab-pane>

                <el-tab-pane label="属性映射">
                    <el-button type="primary" @click="productFunctionDialog = true">新增</el-button>
                    <el-table :data="productFunctionTable" style="width: 100%">
                        <el-table-column prop="productId" label="开发云产品ID"></el-table-column>
                        <el-table-column prop="thirdProductIds" label="产商云产品ID">
                            <template slot-scope="scope">
                                <span v-html="scope.row.thirdProductIds.join('<br>')"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="thirdSignCodes" label="产商云属性code">
                            <template slot-scope="scope">
                                <span v-html="scope.row.thirdSignCodes.join('<br>')"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="thirdPartyCloud" label="产商云"></el-table-column>
                        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="productFunctionEdit(scope.row.productId)">编辑</el-button>
                                <el-button type="text" @click="productFunctionDelete(scope.row.productId)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @size-change="productFunctionHandleSizeChange"
                            @current-change="productFunctionHandleCurrentChange"
                            :current-page="productFunctionCurrentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="productFunctionPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :productTypeTotal="productFunctionTotal"
                    >
                    </el-pagination>
                </el-tab-pane>
                <!--控制-->
                <el-tab-pane label="行为映射">
                    <el-button type="primary" @click="productActionDialog = true">新增</el-button>
                    <el-table :data="productActionTable" style="width: 100%">
                        <el-table-column prop="productId" label="开发云产品ID"></el-table-column>
                        <el-table-column prop="thirdProductIds" label="产商云产品ID">
                            <template slot-scope="scope">
                                <span v-html="scope.row.thirdProductIds.join('<br>')"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="signCodes" label="开发云属性code">
                            <template slot-scope="scope">
                                <span v-html="scope.row.signCodes.join('<br>')"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="thirdPartyCloud" label="产商云"></el-table-column>
                        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="productActionEdit(scope.row.productId)">编辑</el-button>
                                <el-button type="text" @click="productActionDelete(scope.row.productId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @size-change="productActionHandleSizeChange"
                            @current-change="productActionHandleCurrentChange"
                            :current-page="productActionCurrentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="productActionPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :productTypeTotal="productActionTotal"
                    >
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--产品映射表-->
        <el-dialog title="产品映射表单" :visible.sync="productTypeDialog" :before-close="productTypeCancel">
            <el-form ref="productType" :model="productType" label-width="100px">
                <el-form-item label="开发云产品id">
                    <el-input v-model="productType.productId" :disabled="isProductTypeUpdate"></el-input>
                </el-form-item>
                <el-table :data="productType.productTypes" style="width: 100%">
                    <el-table-column label="产商云产品ID" prop="thirdProductId">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.thirdProductId" placeholder="请选择" clearable filterable>
                                <el-option
                                        v-for="item in thirdPids"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="第三方产品名" prop="thirdProduct">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.thirdProduct"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="第三方产品名 第二形式" prop="thirdProduct2">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.thirdProduct2"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="第三方品牌" prop="thirdBrand">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.thirdBrand"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="productTypeRemoveRow(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <el-button @click="productTypeAddRow">新增行</el-button>
            <span slot="footer" class="dialog-footer">
          <el-button @click="productTypeCancel">取消</el-button>
          <el-button type="primary" @click="productTypeSave">保存</el-button>
        </span>
        </el-dialog>

        <!--属性映射表-->
        <el-dialog title="产品属性表单" :visible.sync="productFunctionDialog" width="80%"
                   :before-close="productFunctionCancel">
            <el-form ref="productFunction" :model="productFunction" label-width="100px">
                <el-form-item label="开发云产品id">
                    <el-input v-model="productFunction.productId" :disabled="isProductFunctionUpdate"></el-input>
                </el-form-item>

                <el-table :data="productFunction.productFunctions" style="width: 100%">
                    <el-table-column label="开发云属性" prop="signCode">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.signCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="开发云属性标识" prop="functionId">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.functionId"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="产商云属性" prop="thirdSignCode">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.thirdSignCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="产商云属性行为" prop="thirdActionCode">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.thirdActionCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否值映射" prop="valueOf">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.valueOf">
                                <el-option label="否" value="0"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="映射关系" prop="valueOf" width="300">
                        <template slot-scope="scope">
                            <div v-for="(item, index) in scope.row.valueMapping">
                                <el-input v-model="item.key" style="width: 80px;margin-right: 5px;"></el-input>
                                <span>=</span>
                                <el-input v-model="item.value" style="width:80px;margin-right: 5px;"></el-input>
                                <el-button type="text" @click="functionMappingRemoveRow(scope.row.valueMapping, index)">
                                    删除
                                </el-button>
                            </div>
                            <el-button @click="functionMappingAddRow(scope.$index)">新增</el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="转换函数" prop="convertFunction">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.convertFunction" placeholder="NONE" clearable filterable>
                                <el-option
                                        v-for="item in convertFunctions"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="remark">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.remark"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="productFunctionRemoveRow(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <el-button @click="productFunctionAddRow">新增行</el-button>
            <span slot="footer" class="dialog-footer">
          <el-button @click="productFunctionCancel">取消</el-button>
          <el-button type="primary" @click="productFunctionSave">保存</el-button>
        </span>
        </el-dialog>

        <!--控制映射表-->
        <el-dialog title="产品行为表单" :visible.sync="productActionDialog" width="80%"
                   :before-close="productActionCancel">
            <el-form ref="productAction" :model="productAction" label-width="100px">
                <el-form-item label="开发云产品id">
                    <el-input v-model="productAction.productId" :disabled="isProductActionUpdate"></el-input>
                </el-form-item>

                <el-table :data="productAction.productActions" style="width: 100%">
                    <el-table-column label="开发云属性" prop="signCode">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.signCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="开发云属性标识" prop="functionId">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.functionId"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="产商云属性" prop="thirdSignCode">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.thirdSignCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="产商云属性行为" prop="thirdActionCode">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.thirdActionCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否值映射" prop="valueOf">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.valueOf">
                                <el-option label="否" value="0"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="映射关系" prop="valueOf" width="300">
                        <template slot-scope="scope">
                            <div v-for="(item, index) in scope.row.valueMapping">
                                <el-input v-model="item.key" style="width: 80px;margin-right: 5px;"></el-input>
                                <span>=</span>
                                <el-input v-model="item.value" style="width:80px;margin-right: 5px;"></el-input>
                                <el-button type="text" @click="actionMappingRemoveRow(scope.row.valueMapping, index)">
                                    删除
                                </el-button>
                            </div>
                            <el-button @click="actionMappingAddRow(scope.$index)">新增</el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="转换函数" prop="convertFunction">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.convertFunction" placeholder="NONE" clearable filterable>
                                <el-option
                                        v-for="item in convertFunctions"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="remark">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.remark"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="productActionRemoveRow(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <el-button @click="productActionAddRow">新增行</el-button>
            <span slot="footer" class="dialog-footer">
          <el-button @click="productActionCancel">取消</el-button>
          <el-button type="primary" @click="productActionSave">保存</el-button>
        </span>
        </el-dialog>
    </div>
  `,
    mounted: function () {
        this.alexaProductType();
        this.alexaProductFunction();
        this.productTypeThirdIds();
        this.alexaProductAction();
        axios({
            url: "/cloudToCloud/api/web/config/convertFunctions",
        }).then((res) => {
            this.convertFunctions = res.data.result;
        });
    },
    data: function () {
        return {
            isProductTypeUpdate: false,
            productTypeTable: [],
            productTypeCurrentPage: 1, // 当前页数
            productTypePageSize: 10, // 每页显示条数
            productTypeTotal: 0, // 总条数
            productTypeDialog: false, //产品映射弹窗
            productType: {
                productId: "",
                thirdPartyCloud: "ALEXA",
                productTypes: [
                    {
                        id: "",
                        thirdProduct: "",
                        thirdProduct2: "",
                        thirdProductId: "",
                        thirdBrand: "",
                    },
                ],
            },

            isProductFunctionUpdate: false,
            productFunctionTable: [],
            productFunctionCurrentPage: 1, // 当前页数
            productFunctionPageSize: 10, // 每页显示条数
            productFunctionTotal: 0, // 总条数
            productFunctionDialog: false, //产品映射弹窗
            productFunction: {
                productId: "",
                thirdPartyCloud: "ALEXA",
                productFunctions: [
                    {
                        id: "",
                        signCode: "",
                        functionId: "",
                        thirdSignCode: "",
                        valueOf: '0',
                        valueMapping: [{key: "", value: ""}],
                        convertFunction: "",
                        capabilityConfigId: "",
                        remark: ""
                    },
                ],
            },

            isProductActionUpdate: false,
            productActionTable: [],
            productActionCurrentPage: 1, // 当前页数
            productActionPageSize: 10, // 每页显示条数
            productActionTotal: 0, // 总条数
            productActionDialog: false, //产品映射弹窗
            productAction: {
                productId: "",
                thirdPartyCloud: "ALEXA",
                productActions: [
                    {
                        id: "",
                        signCode: "",
                        functionId: "",
                        thirdSignCode: "",
                        valueOf: '0',
                        valueMapping: [{key: "", value: ""}],
                        convertFunction: "",
                        remark: ""
                    },
                ],
            },

            thirdPids: [],
            convertFunctions: []
        };
    },
    methods: {
        //产品类型方法
        productTypeRemoveRow(index) {
            this.productType.productTypes.splice(index, 1);
        },
        productTypeAddRow() {
            this.productType.productTypes.push({});
        },
        productTypeThirdIds() {
            axios({
                url: "/cloudToCloud/api/web/productType/thirdProducts",
                params: {
                    thirdPartyCloud: "ALEXA",
                },
            }).then((res) => {
                this.thirdPids = res.data.result;
            });
        },
        productTypeHandleSizeChange(size) {
            this.productTypePageSize = size;
            this.alexaProductType();
        },
        productTypeHandleCurrentChange(index) {
            this.productTypeCurrentPage = index;
            this.alexaProductType();
        },
        alexaProductType() {
            axios({
                url: "/cloudToCloud/api/web/productType/list",
                params: {
                    index: this.productTypeCurrentPage,
                    size: this.productTypePageSize,
                    thirdPartyCloud: "ALEXA",
                },
            }).then((res) => {
                var result = res.data.result;

                this.productTypeTotal = result.total;
                this.productTypeTable = result.records;
            });
        },
        productTypeEdit(productId) {
            axios({
                url: "/cloudToCloud/api/web/productType/detail",
                params: {
                    productId: productId,
                    thirdPartyCloud: "ALEXA"
                },
            }).then((res) => {
                var result = res.data.result;
                if(result.success){
                    this.productType.productId = result.productId;
                    this.productType.thirdPartyCloud = result.thirdPartyCloud;
                    this.productType.productTypes = result.productTypes;
                    this.isProductTypeUpdate = true;
                    this.productTypeDialog = true;
                }else{
                    this.$message.error(data.message);
                }
            });
        },
        productTypeSave() {
            axios({
                method: "POST",
                url: "/cloudToCloud/api/web/productType/save",
                data: {
                    productId: this.productType.productId,
                    thirdPartyCloud: "ALEXA",
                    productTypes: this.productType.productTypes,
                },
            }).then((res) => {
                this.productTypeDialog = false;
                this.productType = this.$options.data().productType;
                this.alexaProductType();
            });
        },
        productTypeDelete(productId) {
            axios({
                method: "POST",
                url: "/cloudToCloud/api/web/productType/delete",
                data: {
                    productId: productId,
                    thirdPartyCloud: "ALEXA",
                },
            }).then((res) => {
                this.alexaProductType();
            });
        },
        productTypeCancel() {
            console.log("clear")
            this.productTypeDialog = false;
            this.productType = this.$options.data().productType;
            this.isProductTypeUpdate = false;
        },


        //属性映射方法
        functionMappingRemoveRow(mapping, index) {
            mapping.splice(index, 1);
        }
        ,
        functionMappingAddRow(index) {
            this.productFunction.productFunctions[index].valueMapping.push({
                key: "",
                value: ""
            })
        },
        productFunctionRemoveRow(index) {
            this.productFunction.productFunctions.splice(index, 1);
        },
        productFunctionAddRow() {
            this.productFunction.productFunctions.push({});
        },
        productFunctionThirdIds() {
        },
        productFunctionHandleSizeChange(size) {
            this.productFunctionPageSize = size;
            this.alexaProductFunction();
        },
        productFunctionHandleCurrentChange(index) {
            this.productFunctionCurrentPage = index;
            this.alexaProductFunction();
        },
        alexaProductFunction() {
            axios({
                url: "/cloudToCloud/api/web/productFunction/list",
                params: {
                    index: this.productFunctionCurrentPage,
                    size: this.productFunctionPageSize,
                    thirdPartyCloud: "ALEXA",
                },
            }).then((res) => {
                var result = res.data.result;

                this.productFunctionTotal = result.total;
                this.productFunctionTable = result.records;
            });
        },
        productFunctionEdit(productId) {
            axios({
                url: "/cloudToCloud/api/web/productFunction/detail",
                params: {
                    productId: productId,
                    thirdPartyCloud: "ALEXA"
                },
            }).then((res) => {
                var result = res.data.result;
                this.productFunction.productId = result.productId;
                this.productFunction.thirdPartyCloud = result.thirdPartyCloud;
                this.productFunction.productFunctions = result.productFunctions;
                this.isProductFunctionUpdate = true;
                this.productFunctionDialog = true;
            });
        },
        productFunctionSave() {
            axios({
                method: "POST",
                url: "/cloudToCloud/api/web/productFunction/save",
                data: {
                    productId: this.productFunction.productId,
                    thirdPartyCloud: "ALEXA",
                    productFunctions: this.productFunction.productFunctions,
                },
            }).then((res) => {
                this.productFunctionDialog = false;
                this.productFunction = this.$options.data().productFunction;
                this.alexaProductFunction();
            });
        },
        productFunctionDelete(productId) {
            axios({
                method: "POST",
                url: "/cloudToCloud/api/web/productFunction/delete",
                data: {
                    productId: productId,
                    thirdPartyCloud: "ALEXA",
                },
            }).then((res) => {
                this.alexaProductFunction();
            });
        },
        productFunctionCancel() {
            console.log("clear")
            this.productFunctionDialog = false;
            this.productFunction = this.$options.data().productFunction;
            this.isProductFunctionUpdate = false;
        },

        //属性映射方法
        actionMappingRemoveRow(mapping, index) {
            mapping.splice(index, 1);
        }
        ,
        actionMappingAddRow(index) {
            this.productAction.productActions[index].valueMapping.push({
                key: "",
                value: ""
            })
        },
        productActionRemoveRow(index) {
            this.productAction.productActions.splice(index, 1);
        },
        productActionAddRow() {
            this.productAction.productActions.push({});
        },
        productActionThirdIds() {
        },
        productActionHandleSizeChange(size) {
            this.productActionPageSize = size;
            this.alexaProductFunction();
        },
        productActionHandleCurrentChange(index) {
            this.productActionCurrentPage = index;
            this.alexaProductFunction();
        },
        alexaProductAction() {
            axios({
                url: "/cloudToCloud/api/web/productAction/list",
                params: {
                    index: this.productActionCurrentPage,
                    size: this.productActionPageSize,
                    thirdPartyCloud: "ALEXA",
                },
            }).then((res) => {
                var result = res.data.result;

                this.productActionTotal = result.total;
                this.productActionTable = result.records;
            });
        },
        productActionEdit(productId) {
            axios({
                url: "/cloudToCloud/api/web/productAction/detail",
                params: {
                    productId: productId,
                    thirdPartyCloud: "ALEXA"
                },
            }).then((res) => {
                var result = res.data.result;
                this.productAction.productId = result.productId;
                this.productAction.thirdPartyCloud = result.thirdPartyCloud;
                this.productAction.productActions = result.productActions;
                this.isProductActionUpdate = true;
                this.productActionDialog = true;
            });
        },
        productActionSave() {
            axios({
                method: "POST",
                url: "/cloudToCloud/api/web/productAction/save",
                data: {
                    productId: this.productAction.productId,
                    thirdPartyCloud: "ALEXA",
                    productActions: this.productAction.productActions,
                },
            }).then((res) => {
                this.productActionDialog = false;
                this.productAction = this.$options.data().productAction;
                this.alexaProductAction();
            });
        },
        productActionDelete(productId) {
            axios({
                method: "POST",
                url: "/cloudToCloud/api/web/productAction/delete",
                data: {
                    productId: productId,
                    thirdPartyCloud: "ALEXA",
                },
            }).then((res) => {
                this.alexaProductAction();
            });
        },
        productActionCancel() {
            console.log("clear")
            this.productActionDialog = false;
            this.productAction = this.$options.data().productAction;
            this.isProductFunctionUpdate = false;
        }
    },
});