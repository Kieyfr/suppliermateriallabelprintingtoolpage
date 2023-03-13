<template >
    <div id="indexView">
        <div id="header">
            <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    <el-icon>
                        <Document />
                        <icon-menu />
                    </el-icon>
                    <template #title>新建</template>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <Search />
                        <icon-menu />
                    </el-icon>
                    <template #title>查询</template>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon>
                        <Close />
                        <icon-menu />
                    </el-icon>
                    <template #title>退出</template>
                </el-menu-item>
            </el-menu>
        </div>
        <div id="order">
            <el-table :data="getPrintSheet" style="width: 1235px" max-height="250px" highlight-current-row
                @row-click="selPrintHistory" @contextmenu.prevent="orderMenu" @row-contextmenu="orderRightClick"
                @row-dblclick="openModify" v-loading="loading">
                <el-table-column type="index" width="100" />
                <!-- <el-table-column prop="pk_ORDER" sortable label="采购订单主键" width="250"/> -->
                <el-table-column prop="suppshortname" sortable label="供应商简称" width="250" />
                <el-table-column prop="matername" sortable label="物料名称" width="205" />
                <el-table-column prop="matercode" label="物料编码" width="180" />
                <el-table-column prop="vbillcode" sortable label="订单号" width="250" />
                <el-table-column prop="supplotnum" sortable label="商厂批号" width="150" />
                <el-table-column prop="dbilldate" sortable label="采购日期" width="150" />
            </el-table>
            <div class="demo-pagination-block">
                <el-pagination v-model:current-page="currentPage1" v-model:page-size="pageSize1"
                    :page-sizes="[10, 20, 30, 40]" :disabled="false" :hide-on-single-page="false"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </div>
        <div id="record" @contextmenu.prevent="openMenu($event)">
            <el-table :data="showPrintHistorys" highlight-current-row style="font-size:12px;width: 1470px;" height="400px"
                @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" selection-mode="multiple">
                <!-- 禁用托盘码打印的复选框 -->
                <el-table-column type="selection" width="50" :selectable="row => !(row.pallet != null && row.pallet != '')" />
                <el-table-column type="index" width="50" />
                <el-table-column property="matername" sortable label="物料名称" show-overflow-tooltip width="200" />
                <el-table-column property="suppmatercode" sortable label="供应商料号" show-overflow-tooltip width="150" />
                <el-table-column property="producedate" sortable label="生产日期" show-overflow-tooltip width="110" />
                <el-table-column property="lotnum" sortable label="批号" show-overflow-tooltip width="110" />
                <el-table-column property="netweight" sortable label="净重" show-overflow-tooltip width="80" />
                <el-table-column property="grossweight" sortable label="毛重" show-overflow-tooltip width="80" />
                <el-table-column property="supplotnum" sortable label="供应商批号" show-overflow-tooltip width="150" />
                <el-table-column property="matermaterialspec" sortable label="物料规格" show-overflow-tooltip width="110" />
                <el-table-column property="matermaterialtype" sortable label="物料颜色" show-overflow-tooltip width="110" />
                <el-table-column property="printdate" sortable label="打印日期" show-overflow-tooltip width="110" />
                <el-table-column label="操作" show-overflow-tooltip width="160">
                    <template #default="scope">
                        <el-button size="small" @click="handleReprint(scope.row)">
                            重打
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div id="word">
            <el-dialog v-model="dialogWord" title="新建" width="800px" :close-on-click-modal="false">
                <el-form :model="printSheet" label-width="100px" :inline="true">
                    <el-form-item label="供应商名称">
                        <el-input v-model="printSheet.SUPPSHORTNAME" disabled />
                    </el-form-item>
                    <el-form-item label="新亚物料编号">
                        <div id="material">
                            <el-popover placement="bottom" width="auto" :visible="visible">
                                <template #reference>
                                    <el-input v-model="printSheet.MATERCODE" placeholder="请选择" readonly
                                        @click="openPopover" />
                                </template>
                                <div v-click-outside="onClickOutside">
                                    <el-input v-model="search" class="w-50 m-2" size="large"
                                        style="width:200px;height: 32px;" />
                                    <el-button :icon="Search" @click="searchMateriels(printSheet.SUPPCODE)" />
                                    <el-table :data="materiels" style="width: 100%" height="240px" @row-click="getMaterial">
                                        <el-table-column prop="vbillcode" label="订单号" width="180" />
                                        <el-table-column prop="matercode" label="物料编码" width="180" />
                                        <el-table-column prop="matername" label="物料名称" width="150" />
                                        <el-table-column prop="matermaterialspec" label="物料规格" width="150" />
                                        <el-table-column prop="matermaterialtype" label="物料颜色" width="150" />
                                    </el-table>
                                </div>
                            </el-popover>
                        </div>
                    </el-form-item>
                    <el-form-item label="供应商料号">
                        <el-input v-model="printSheet.SUPPMATERCODE" />
                    </el-form-item>
                    <el-form-item label="物料名称">
                        <el-input v-model="printSheet.MATERNAME" disabled />
                    </el-form-item>
                    <el-form-item label="订单号">
                        <el-input v-model="printSheet.VBILLCODE" disabled />
                    </el-form-item>
                    <el-form-item label="批号">
                        <el-input v-model="LOTNUM" disabled />
                    </el-form-item>
                    <el-form-item label="净重">
                        <el-input-number :precision="3" v-model="printSheet.NETWEIGHT" :min="0" />
                    </el-form-item>
                    <el-form-item label="毛重">
                        <el-input-number :precision="3" v-model="printSheet.GROSSWEIGHT" :min="0" />
                    </el-form-item>
                    <el-form-item label="供应商批号">
                        <el-input v-model="printSheet.SUPPLOTNUM" />
                    </el-form-item>
                    <el-form-item label="绞距" v-if="printSheet.MATERCODE.substring(0, 2) === '06'">
                        <el-input v-model="printSheet.MATERMATERIALSPEC" disabled />
                    </el-form-item>
                    <el-form-item label="颜色" v-else>
                        <el-input v-model="printSheet.MATERMATERIALTYPE" disabled />
                    </el-form-item>
                    <el-form-item label="供应商代码">
                        <el-input v-model="printSheet.SUPPCODE" disabled />
                    </el-form-item>
                    <el-form-item label="打印数量">
                        <el-input-number :precision="0" v-model="PRINTQUANTITY" :min="0" :max="printSheet.NUM" />
                    </el-form-item>
                    <el-form-item label="生产日期">
                        <el-date-picker v-model="printSheet.PRODUCEDATE" type="date" format="YYYY/MM/DD"
                            value-format="YYYY/MM/DD" timezone="GMT+8" />
                    </el-form-item>
                    <el-form-item label="打印日期">
                        <el-date-picker v-model="PRINTDATE" type="date" format="YYYY/MM/DD" timezone="GMT+8"
                            :default-time="new Date(2000, 1, 1, 0, 0, 0)" readonly />
                    </el-form-item>
                    <el-button @click="handleSubit" type="primary">打印</el-button>
                    <el-button @click="dialogWord = false">退出</el-button>
                </el-form>
            </el-dialog>
        </div>
        <div id="modify">
            <el-dialog v-model="dialogModify" title="打印" width="800px" :close-on-click-modal="false">
                <el-form :model="printSheet" label-width="100px" :inline="true">
                    <el-form-item label="供应商名称">
                        <el-input v-model="printSheet.SUPPSHORTNAME" disabled />
                    </el-form-item>
                    <el-form-item label="新亚物料编号">
                        <el-input v-model="printSheet.MATERCODE" disabled />
                    </el-form-item>
                    <el-form-item label="供应商料号">
                        <el-input v-model="printSheet.SUPPMATERCODE" disabled />
                    </el-form-item>
                    <el-form-item label="物料名称">
                        <el-input v-model="printSheet.MATERNAME" disabled />
                    </el-form-item>
                    <el-form-item label="订单号">
                        <el-input v-model="printSheet.VBILLCODE" disabled />
                    </el-form-item>
                    <el-form-item label="批号">
                        <el-input v-model="LOTNUM" disabled />
                    </el-form-item>
                    <el-form-item label="净重">
                        <el-input-number :precision="3" v-model="printSheet.NETWEIGHT" :min="0" />
                    </el-form-item>
                    <el-form-item label="毛重">
                        <el-input-number :precision="3" v-model="printSheet.GROSSWEIGHT" :min="0" />
                    </el-form-item>
                    <el-form-item label="供应商批号">
                        <el-input v-model="printSheet.SUPPLOTNUM" disabled />
                    </el-form-item>
                    <el-form-item label="绞距" v-if="printSheet.MATERCODE.substring(0, 2) === '06'">
                        <el-input v-model="printSheet.MATERMATERIALSPEC" disabled />
                    </el-form-item>
                    <el-form-item label="颜色" v-else>
                        <el-input v-model="printSheet.MATERMATERIALTYPE" disabled />
                    </el-form-item>
                    <el-form-item label="供应商代码">
                        <el-input v-model="printSheet.SUPPCODE" disabled />
                    </el-form-item>
                    <el-form-item label="打印数量">
                        <el-input-number :precision="0" v-model="PRINTQUANTITY" :min="1" :max="printSheet.NUM" />
                    </el-form-item>
                    <el-form-item label="生产日期">
                        <el-date-picker v-model="printSheet.PRODUCEDATE" type="date" format="YYYY/MM/DD" />
                    </el-form-item>
                    <el-form-item label="打印日期">
                        <el-date-picker v-model="PRINTDATE" type="date" format="YYYY/MM/DD" timezone="GMT+8"
                            :default-time="new Date(2000, 1, 1, 0, 0, 0)" readonly />
                    </el-form-item>
                    <el-button @click="modhandleSubit" type="primary">打印</el-button>
                    <el-button @click="dialogModify = false">退出</el-button>
                </el-form>
            </el-dialog>

        </div>
        <div id="query">
            <el-dialog v-model="dialogQuery" title="查询" width="800px" :close-on-click-modal="false">
                <el-form :model="selInfo" label-width="100px" :inline="true">
                    <DownSearch ref="supp" v-if="state == '0'" :updatesupplier="updatesupplier"
                        :SUPPNAME="printSheet.SUPPNAME"></DownSearch>
                    <el-form-item label="供应商代码" v-if="state == '0'">
                        <el-select v-model="supplier.SUPPCODE">
                            <el-option v-for="item in SUPPCODES" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商料号">
                        <el-input v-model="selInfo.SUPPMATERCODE" />
                    </el-form-item>
                    <el-form-item label="供应商批号">
                        <el-input v-model="selInfo.SUPPLOTNUM" />
                    </el-form-item>
                    <el-form-item label="订单号">
                        <el-input v-model="selInfo.VBILLCODE" />
                    </el-form-item>
                    <el-form-item label="是否打印完成">
                        <el-radio-group v-model="selInfo.COMPLETION">
                            <el-radio label="全部" />
                            <el-radio label="未完成" />
                            <el-radio label="已完成" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="起始日期">
                        <el-date-picker v-model="selInfo.STARTDATE" type="date" :size="10" timezone="GMT+8" />
                    </el-form-item>
                    <el-form-item label="截止日期">
                        <el-date-picker v-model="selInfo.ENDDATE" type="date" :size="10" timezone="GMT+8" />
                    </el-form-item>
                    <el-form-item label="是否有打印记录">
                        <el-radio-group v-model="selInfo.Print">
                            <el-radio label="全部" />
                            <el-radio label="有" />
                            <el-radio label="无" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="">
                    </el-form-item>
                    <el-button type="primary" @click="getSuppIfPrintSheets">查询</el-button>
                    <el-button @click="dialogQuery = false">返回</el-button>
                </el-form>
            </el-dialog>
        </div>
        <div id="pallet">
            <el-dialog v-model="dialogPallet" title="打印托盘码" width="800px" :close-on-click-modal="false">
                <el-form :model="printSheet" label-width="100px" :inline="true">
                    <el-form-item label="供应商名称">
                        <el-input v-model="printSheet.SUPPSHORTNAME" disabled />
                    </el-form-item>
                    <el-form-item label="新亚物料编号">
                        <el-input v-model="printSheet.MATERCODE" disabled />
                    </el-form-item>
                    <el-form-item label="供应商料号">
                        <el-input v-model="printSheet.SUPPMATERCODE" disabled />
                    </el-form-item>
                    <el-form-item label="物料名称">
                        <el-input v-model="printSheet.MATERNAME" disabled />
                    </el-form-item>
                    <el-form-item label="订单号">
                        <el-input v-model="printSheet.VBILLCODE" disabled />
                    </el-form-item>
                    <el-form-item label="批号">
                        <el-input v-model="LOTNUM" disabled />
                    </el-form-item>
                    <el-form-item label="净重">
                        <el-input-number :precision="3" v-model="printSheet.NETWEIGHT" :min="0" disabled />
                    </el-form-item>
                    <el-form-item label="毛重">
                        <el-input-number :precision="3" v-model="printSheet.GROSSWEIGHT" :min="0" disabled />
                    </el-form-item>
                    <el-form-item label="供应商批号">
                        <el-input v-model="printSheet.SUPPLOTNUM" disabled />
                    </el-form-item>
                    <el-form-item label="绞距" v-if="printSheet.MATERCODE.substring(0, 2) === '06'">
                        <el-input v-model="printSheet.MATERMATERIALSPEC" disabled />
                    </el-form-item>
                    <el-form-item label="颜色" v-else>
                        <el-input v-model="printSheet.MATERMATERIALTYPE" disabled />
                    </el-form-item>
                    <el-form-item label="供应商代码">
                        <el-input v-model="printSheet.SUPPCODE" disabled />
                    </el-form-item>
                    <el-form-item label="打印数量">
                        <el-input-number :precision="0" v-model="PRINTQUANTITY" :min="1" />
                    </el-form-item>
                    <el-form-item label="生产日期">
                        <el-date-picker v-model="printSheet.PRODUCEDATE" type="date" format="YYYY/MM/DD"
                            value-format="YYYY/MM/DD" timezone="GMT+8" />
                    </el-form-item>
                    <el-form-item label="打印日期">
                        <el-date-picker v-model="PRINTDATE" type="date" format="YYYY/MM/DD" timezone="GMT+8"
                            :default-time="new Date(2000, 1, 1, 0, 0, 0)" readonly />
                    </el-form-item>
                    <el-button @click="addPallet" type="primary">打印</el-button>
                    <el-button @click="dialogPallet = false, printSheet.PALLET = ''">退出</el-button>
                </el-form>
            </el-dialog>

        </div>
        <div id="papersize">
            <el-dialog v-model="dialogPaperSize" title="选择纸张大小" width="400px" :close-on-click-modal="false">
                <el-form-item label="纸张大小cm(宽×高)">
                    <el-select v-model="papersize" placeholder="请选择">
                        <el-option v-for="item in papersizes" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-button @click="modpapersize" type="primary">确认</el-button>
            </el-dialog>
        </div>
        <ul class="custom-contextmenu" ref="customContextMenu" style="display: none;">
            <li @click="PalletClick()">打印托盘码</li>
        </ul>
        <ul class="custom-contextmenu" ref="orderNew" style="display: none;">
            <li @click="rightNew">新建</li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { GetPrintSheet, Materiels, ShowPrintHistory, SelInfo, Suppler, Supplier } from '../types/index'
import { ElMessage, ClickOutside as vClickOutside } from 'element-plus'
import { Right, Search } from '@element-plus/icons-vue'
import { getSuppUserApi } from '../api/getSuppUser'
import { addPrintSheetApi } from '../api/addPrintSheet'
import { addPrintHistoryApi } from '../api/addPrintHistory'
import { getMaterielsApi } from '@/api/getMateriels'
import { getMaterielsByCodeApi } from '@/api/getMateriels'
import { getLotNumApi } from '../api/getLotNum'
import { getPrintSheetsApi } from '../api/getPrintSheets'
import { getPrintSheetsByCodeApi } from '../api/getPrintSheets'
import { selPrintHistoryApi } from '../api/selPrintHistory'
import { getIfPrintSheetsApi, Page } from '../api/getIfPrintSheets'
import { getIfPrintSheetsByCodeApi, getQueryPrintSheetsTotalApi } from '../api/getIfPrintSheets'
import { selPrintHistoryNumApi } from '../api/selPrintHistoryNum'
import { getMaterielApi } from '../api/getMateriel'
import { searchMaterielsApi } from '../api/searchMateriels'
import { delPrintHistoryApi } from '../api/delPrintHistory'
import { getStateApi } from '../api/getState'
import { loginAdminsupplier } from '@/api/loginAdmin'
import { getSupplierApi } from '@/api/getSupplier'
import { GetPrintWorld, ToAbsoluteURL } from "../assets/PrintWorld.js"
import DownSearch from "../components/DownSearch.vue"
import { format } from 'date-fns'
import { fa } from 'element-plus/es/locale';
import { el } from 'date-fns/locale';



const dialogPaperSize = ref(false)
//打印信息
interface PrintInfo {
    SUPPSHORTNAME?: string,       //供应商简称
    MATERNAME?: string,           //物料名称
    MATERCODE?: string,           //物料编码
    SUPPMATERCODE?: string,       //供应商料号
    PRODUCEDATE?: string,           //生产日期
    VBILLCODE?: string,           //订单号
    SUPPLOTNUM?: string,          //供应商批号
    LOTNUM?: string,            //批号
    MATERMATERIALSPEC?: string,   //物料规格
    MATERMATERIALTYPE?: string,   //物料颜色
    NETWEIGHT?: string,           //净重
    GROSSWEIGHT?: string,         //毛重
    PRINTQUANTITY?: number,        //打印数量
    BARCODE?: string              //条码
}
const printInfo: PrintInfo = reactive({})
const printInfos: PrintInfo[] = reactive([])


//获取打天下
const printworld = GetPrintWorld()

//获取打天下安装包
var downloadUrl = "打天下64位1.6.zip";
function getPrintWorldZip() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Win64') > -1 || userAgent.indexOf('WOW64') > -1) {
        downloadUrl = "打天下64位1.6.zip";
    } else {
        downloadUrl = "打天下32位1.6.zip";
    }
    // if (bit.indexOf('64') !== -1) {

    //     downloadUrl= "打天下64位1.6.zip";
    // } else {
    //     downloadUrl="打天下32位1.6.zip";
    // }
    return downloadUrl
}
// order鼠标右击事件
let orderNew = ref()
let orderPrintSheet: GetPrintSheet = reactive({})
const orderRightClick = (row: GetPrintSheet) => {
    orderPrintSheet = row
}
const orderMenu = (e) => {
    let top = e.pageY;
    let left = e.pageX;
    let ele = orderNew.value;
    ele.style.top = top + 'px';
    ele.style.left = left + 'px';
    ele.style.display = 'block';
}
//右击新建
const rightNew = () => {
    printSheet.SUPPCODE = orderPrintSheet.suppcode
    printSheet.SUPPNAME = orderPrintSheet.suppname
    printSheet.SUPPSHORTNAME = orderPrintSheet.suppshortname
    getMaterielsByCode(printSheet.SUPPCODE)
    printSheet.PALLET = ""
    printSheet.PK_ORDER = orderPrintSheet.pk_ORDER
    printSheet.PK_ORDER_B = orderPrintSheet.pk_ORDER_B
    printSheet.SUPPCODE = orderPrintSheet.suppcode
    printSheet.SUPPNAME = orderPrintSheet.suppname
    printSheet.SUPPSHORTNAME = orderPrintSheet.suppshortname
    printSheet.SUPPMATERCODE = ""
    printSheet.SUPPLOTNUM = ""
    printSheet.VBILLCODE = orderPrintSheet.vbillcode
    printSheet.MATERCODE = orderPrintSheet.matercode
    printSheet.MATERNAME = orderPrintSheet.matername
    printSheet.MATERMATERIALSPEC = orderPrintSheet.matermaterialspec
    printSheet.MATERMATERIALTYPE = orderPrintSheet.matermaterialtype
    if (printSheet.MATERMATERIALTYPE == null || printSheet.MATERMATERIALTYPE == "") {
        printSheet.MATERMATERIALTYPE = "无"
    }
    // console.log(row.producedate)
    printSheet.PRODUCEDATE = dateFormat(orderPrintSheet.producedate)
    printSheet.NETWEIGHT = 0
    printSheet.GROSSWEIGHT = 0
    printSheet.NUM = orderPrintSheet.num
    printSheet.PRINT = true
    printSheet.DBILLDATE = orderPrintSheet.dbilldate
    printSheet.PRODUCEDATE = format(new Date(), 'yyyy/MM/dd')
    getLotNum(printSheet.PK_ORDER_B) //批号
    PRINTQUANTITY.value = 1//打印数量
    // console.log(row)

    dialogWord.value = true
}
//打印
const outputPrint = () => {
    var json = {};
    var paperSize = localStorage.getItem('paperSize')
    if (paperSize != "" && paperSize != null) {
        json.action = "print";

        if (printInfo.MATERCODE.substring(0, 2) === '06') {
            if (paperSize == "8×6") {
                json.template = ToAbsoluteURL("print86jj.fmx");
            } else if (paperSize == "10.6×4.6") {
                json.template = ToAbsoluteURL("print104jj.fmx");
            } else if (paperSize == "10.5×6") {
                json.template = ToAbsoluteURL("print106jj.fmx");
            } else {
                dialogPaperSize.value = true
                return
            }
        } else {
            if (paperSize == "8×6") {
                json.template = ToAbsoluteURL("print86ys.fmx");
            } else if (paperSize == "10.6×4.6") {
                json.template = ToAbsoluteURL("print104ys.fmx");
            } else if (paperSize == "10.5×6") {
                json.template = ToAbsoluteURL("print106ys.fmx");
            } else {
                dialogPaperSize.value = true
                return
            }
        }

        printworld.DownloadUrlForTemplatePrint(getPrintWorldZip())
        json.data = printInfos
        if (!printworld.Act(json)) {                    //数据发送失败
            alert(printworld.GetLastError());
        }
    } else {
        dialogPaperSize.value = true
    }


}

const papersize = ref("")

const papersizes = ["10.6×4.6", "8×6", "10.5×6"]

const modpapersize = () => {
    localStorage.setItem('paperSize', papersize.value);
    dialogPaperSize.value = false
    outputPrint()
}

//打开打印方法
const CreateOneFormPage = () => {
    setTimeout(() => {
        outputPrint()
    }, 0)
};
const CreateOneFormPage2 = () => {
    printInfos.length = 0
    modprintInfo2()
    printInfos.push(printInfo)
    setTimeout(() => {
        outputPrint()
    }, 0)
};

//更改json信息方法
function modprintInfo() {
    printInfo.SUPPSHORTNAME = printSheet.SUPPSHORTNAME
    printInfo.MATERNAME = printSheet.MATERNAME
    printInfo.MATERCODE = printSheet.MATERCODE
    printInfo.SUPPMATERCODE = printSheet.SUPPMATERCODE
    printInfo.PRODUCEDATE = dateFormat(printSheet.PRODUCEDATE)
    printInfo.SUPPLOTNUM = printSheet.SUPPLOTNUM
    printInfo.VBILLCODE = printSheet.VBILLCODE
    printInfo.MATERMATERIALSPEC = printSheet.MATERMATERIALSPEC
    printInfo.MATERMATERIALTYPE = printSheet.MATERMATERIALTYPE
    printInfo.NETWEIGHT = printSheet.NETWEIGHT + "KG"
    printInfo.GROSSWEIGHT = printSheet.GROSSWEIGHT + "KG"
    printInfo.PRINTQUANTITY = 1
    printInfo.BARCODE = barCode(printInfo.MATERCODE, printSheet.NETWEIGHT + "", printSheet.SUPPCODE, printInfo.VBILLCODE, printInfo.LOTNUM)
}
const modprintInfo2 = () => {
    printInfo.SUPPSHORTNAME = printSheet.SUPPSHORTNAME
    printInfo.MATERNAME = printSheet.MATERNAME
    printInfo.MATERCODE = printSheet.MATERCODE
    printInfo.SUPPMATERCODE = printSheet.SUPPMATERCODE
    printInfo.PRODUCEDATE = dateFormat(printSheet.PRODUCEDATE)
    printInfo.SUPPLOTNUM = printSheet.SUPPLOTNUM
    printInfo.VBILLCODE = printSheet.VBILLCODE
    printInfo.LOTNUM = printSheet.LOTNUM
    printInfo.MATERMATERIALSPEC = printSheet.MATERMATERIALSPEC
    printInfo.MATERMATERIALTYPE = printSheet.MATERMATERIALTYPE
    printInfo.NETWEIGHT = printSheet.NETWEIGHT + "KG"
    printInfo.GROSSWEIGHT = printSheet.GROSSWEIGHT + "KG"
    printInfo.PRINTQUANTITY = 1
    printInfo.BARCODE = barCode(printInfo.MATERCODE, printSheet.NETWEIGHT + "", printSheet.SUPPCODE, printInfo.VBILLCODE, printInfo.LOTNUM)
}
//生成条码
const barCode = (matercode, netweight, suppcode, vbillcode, lotnum) => {
    let barcode = "";
    let pd = netweight.indexOf(".");
    let netweight1 = ""
    let netweight2 = ""
    let netweight3 = ""
    if (pd != -1) {
        netweight1 = netweight.substr(0, pd);
        netweight2 = netweight.substr(pd, netweight.length - 1)
        while (netweight1.length < 4) {
            netweight1 = "0" + netweight1
        }
        while (netweight2.length < 4) {
            netweight2 = netweight1 + "0"
        }
    } else {
        netweight1 = netweight;
        netweight2 = ".000";
        while (netweight1.length < 4) {
            netweight1 = "0" + netweight1
        }
    }
    netweight3 = netweight1 + netweight2 + "";
    barcode = "W" + matercode + netweight3 + suppcode + vbillcode + lotnum;
    return barcode
}
//日期格式化
const dateFormat = (time) => {
    var date = new Date(time);
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return year + "-" + month + "-" + day
}

const router = useRouter();

const dialogWord = ref(false)   //新建窗口是否显示
const dialogQuery = ref(false)  //查询窗口是否显示
const dialogModify = ref(false) //修改窗口是否显示
const dialogPallet = ref(false) //打印托盘码窗口是否显示

const search = ref('') //修改窗口是否显示

const dialogSupplierVisible = ref('')//管理员切换供应商窗口是否显示

var visible = ref(false)    //气泡表格是否显示

const LOTNUM = ref(0) //批号
const PRINTQUANTITY = ref(1)//打印数量
const PRINTDATE = ref(new Date)//打印日期

const state = ref('');

//获取登录状态
function getState() {
    return new Promise<string>((resolve, reject) => {
        getStateApi().then((res) => {
            if (res.state == '200') {
                let a = res.data
                resolve(a)
            } else if (res.state == '404') {
                ElMessage.error(res.msg)
            }
        })
    })
}

const loading = ref(false)

//管理员查询
async function getSuppIfPrintSheets() {
    showPrintHistorys.length = 0
    getPrintSheet.length = 0
    if (state.value != "0") {
        selInfo.SUPPCODE = printSheet.SUPPCODE
    } else {
        selInfo.SUPPCODE = supplier.SUPPCODE
        printSheet.SUPPCODE = ""
        printSheet.SUPPNAME = ""
        printSheet.SUPPSHORTNAME = ""
    }
    if (selInfo.STARTDATE != "" && selInfo.STARTDATE != null) {
        selInfo.STARTDATE = dateFormat(selInfo.STARTDATE)
    }
    if (selInfo.ENDDATE != "" && selInfo.ENDDATE != null) {
        selInfo.ENDDATE = dateFormat(selInfo.ENDDATE)
    }
    if (supplier.SUPPSHORTNAME == "" || supplier.SUPPCODE != null) {
        await getQueryPrintSheetsTotal(selInfo).then(val => {
            total.value = val
        })
        currentPage1.value = 1
        getIfPrintSheetsByCode(pageSize1.value, currentPage1.value)
    }


    dialogQuery.value = false
}

//获取查询的总数量
function getQueryPrintSheetsTotal(selInfo: SelInfo) {
    return new Promise<number>((resolve, reject) => {
        getQueryPrintSheetsTotalApi(selInfo).then((res) => {
            if (res.state == '200') {
                resolve(res.data)
            }
        })
    })
}

var materiels: Materiels[] = reactive([]); //物料信息表格
var getPrintSheet: GetPrintSheet[] = reactive([]);   //供应商打印类别
var showPrintHistorys: ShowPrintHistory[] = reactive([]);

interface PrintSheet {
    PK_ORDER: string,            //采购订单主键
    PK_ORDER_B: string,          //采购订单明细主键
    SUPPCODE: string,            //供应商代码
    SUPPNAME: string,            //供应商名称
    SUPPSHORTNAME: string,       //供应商简称
    SUPPMATERCODE: string,       //供应商料号
    SUPPLOTNUM: string,          //供应商批号
    LOTNUM: string,              //批号
    VBILLCODE: string,           //订单号
    MATERCODE: string,           //物料编码
    MATERNAME: string,           //物料名称
    MATERMATERIALSPEC: string,   //物料规格
    MATERMATERIALTYPE: string,   //物料颜色
    PRODUCEDATE: string,         //生产日期
    NETWEIGHT: number,        //净重
    GROSSWEIGHT: number,      //毛重
    NUM: number,
    PRINT: boolean,            //是否可以打印
    PALLET: string,              //托盘码信息
    DBILLDATE: string            //采购日期
}

//对象初始化
const printSheet: PrintSheet = reactive({
    PK_ORDER: '',            //采购订单主键
    PK_ORDER_B: '',          //采购订单明细主键
    SUPPCODE: '',            //供应商代码
    SUPPNAME: '',            //供应商名称
    SUPPSHORTNAME: '',       //供应商简称
    SUPPMATERCODE: '',       //供应商料号
    SUPPLOTNUM: '',          //供应商批号
    LOTNUM: '',              //批号
    VBILLCODE: '',           //订单号
    MATERCODE: '',           //物料编码
    MATERNAME: '',           //物料名称
    MATERMATERIALSPEC: '',   //物料规格
    MATERMATERIALTYPE: '',   //物料颜色
    PRODUCEDATE: "",         //生产日期
    NETWEIGHT: 0.000,        //净重
    GROSSWEIGHT: 0.000,      //毛重
    NUM: 1,
    PRINT: true,            //是否可以打印
    PALLET: "",              //托盘码信息
    DBILLDATE: ""            //采购日期
})


//查询信息
const selInfo: SelInfo = reactive({
})

//设置菜单选中触发
const handleSelect = (key: string) => {
    if (key == "1") {
        getMaterielsByCode(printSheet.SUPPCODE)
        printSheetClear()
        printSheet.PALLET = ""
        printSheet.PRODUCEDATE = format(new Date(), 'yyyy/MM/dd')
        dialogWord.value = true
    }
    if (key == "2") {
        printSheetClear()
        dialogQuery.value = true
    }
    if (key == "3") {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("paperSize")
        router.push('/')
    }
}


//设置新建表单验证
const handleSubit = () => {
    if (printSheet.SUPPMATERCODE == null) {
        printSheet.SUPPMATERCODE = ""
    }
    if (printSheet.MATERCODE == '' || printSheet.MATERCODE == null) {
        ElMessage.error('请选择新亚物料编号')
    } else if (printSheet.PRODUCEDATE == null || printSheet.PRODUCEDATE == "") {
        ElMessage.error('请选择生产日期')
    } else if ((printSheet.SUPPMATERCODE == '' || printSheet.SUPPMATERCODE == null) && state.value != "0") {
        ElMessage.error('请填写供应商料号')
    } else if (printSheet.SUPPLOTNUM == '' || printSheet.SUPPLOTNUM == null) {
        ElMessage.error('请填写供应商批号')
    } else if (printSheet.NETWEIGHT == 0.00) {
        ElMessage.error('请设置净重')
    } else if (printSheet.GROSSWEIGHT == 0.00) {
        ElMessage.error('请设置毛重')
    } else if (printSheet.GROSSWEIGHT <= printSheet.NETWEIGHT) {
        ElMessage.error('毛重需要大于等于净重')
    } else {
        printSheet.PRODUCEDATE = dateFormat(printSheet.PRODUCEDATE)
        addPrintSheet()
        dialogWord.value = false
    }
}

//设置修改表单验证
async function modhandleSubit() {
    if (printSheet.NETWEIGHT == 0.00) {
        ElMessage.error('请设置净重')
    }
    else if (printSheet.GROSSWEIGHT == 0.00) {
        ElMessage.error('请设置毛重')
    }
    else if (printSheet.GROSSWEIGHT <= printSheet.NETWEIGHT) {
        ElMessage.error('毛重需要大于等于净重')
    }
    else {
        printInfos.length = 0

        for (var i: number = 0; i < PRINTQUANTITY.value; i++) {
            await addPrintHistory().then(val => {
                printInfo.LOTNUM = val + ""
                console.log(val)
            });
            await modprintInfo()
            await printInfos.push({
                SUPPSHORTNAME: printInfo.SUPPSHORTNAME,
                MATERNAME: printInfo.MATERNAME,
                MATERCODE: printInfo.MATERCODE,
                SUPPMATERCODE: printInfo.SUPPMATERCODE,
                PRODUCEDATE: printInfo.PRODUCEDATE,
                VBILLCODE: printInfo.VBILLCODE,
                SUPPLOTNUM: printInfo.SUPPLOTNUM,
                LOTNUM: printInfo.LOTNUM,
                MATERMATERIALSPEC: printInfo.MATERMATERIALSPEC,
                MATERMATERIALTYPE: printInfo.MATERMATERIALTYPE,
                NETWEIGHT: printInfo.NETWEIGHT,
                GROSSWEIGHT: printInfo.GROSSWEIGHT,
                BARCODE: printInfo.BARCODE
            })
        }
        await outputPrint()
        dialogModify.value = false
    }
}

//显示气泡表格
const openPopover = () => {
    visible.value = true
}
//隐藏气泡表格
const onClickOutside = () => {
    search.value = ''
    visible.value = false
}

//获取物料信息
const getMaterial = (row: Materiels) => {
    getLotNum(row.pk_ORDER_B)
    printSheet.PK_ORDER = row.pk_ORDER
    printSheet.PK_ORDER_B = row.pk_ORDER_B
    printSheet.VBILLCODE = row.vbillcode
    printSheet.MATERCODE = row.matercode
    printSheet.MATERNAME = row.matername
    printSheet.MATERMATERIALSPEC = row.matermaterialspec
    printSheet.MATERMATERIALTYPE = row.matermaterialtype
    printSheet.NUM = row.num
    if (printSheet.MATERMATERIALTYPE == null || printSheet.MATERMATERIALTYPE == "") {
        printSheet.MATERMATERIALTYPE = "无"
    }
    visible.value = false
}

//添加打印单列表
function addPrintSheet() {
    addPrintSheetApi(printSheet).then(async (res) => {
        if (res.state == '200') {
            printInfos.length = 0
            for (var i: number = 0; i < PRINTQUANTITY.value; i++) {
                await addPrintHistory().then(val => {
                    printInfo.LOTNUM = val + ""
                });
                await modprintInfo()
                await printInfos.push({
                    SUPPSHORTNAME: printInfo.SUPPSHORTNAME,
                    MATERNAME: printInfo.MATERNAME,
                    MATERCODE: printInfo.MATERCODE,
                    SUPPMATERCODE: printInfo.SUPPMATERCODE,
                    PRODUCEDATE: printInfo.PRODUCEDATE,
                    VBILLCODE: printInfo.VBILLCODE,
                    SUPPLOTNUM: printInfo.SUPPLOTNUM,
                    LOTNUM: printInfo.LOTNUM,
                    MATERMATERIALSPEC: printInfo.MATERMATERIALSPEC,
                    MATERMATERIALTYPE: printInfo.MATERMATERIALTYPE,
                    NETWEIGHT: printInfo.NETWEIGHT,
                    GROSSWEIGHT: printInfo.GROSSWEIGHT,
                    BARCODE: printInfo.BARCODE
                })
            }

            await outputPrint()
            printInfos.length = 0
            if (state.value == "0") {
                getIfPrintSheetsByCode(10, 1)
                getMaterielsByCode(supplier.SUPPCODE)
            } else {
                getIfPrintSheetsByCode(10, 1)
                getMateriels()
            }
            getSuppIfPrintSheets()
        } else if (res.state == '403') {
            ElMessage.error(res.msg)
        } else if (res.state == '500') {
            ElMessage.error('添加失败')
        }
    })
}

//添加打印单历史记录
function addPrintHistory() {
    return new Promise((resolve, reject) => {
        const param = {
            PK_ORDER: printSheet.PK_ORDER,            //采购订单主键
            PK_ORDER_B: printSheet.PK_ORDER_B,         //采购订单明细主键
            SUPPCODE: printSheet.SUPPCODE,
            PRODUCEDATE: dateFormat(printSheet.PRODUCEDATE.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })),            //生产日期
            NETWEIGHT: printSheet.NETWEIGHT,         //净重
            GROSSWEIGHT: printSheet.GROSSWEIGHT,            //毛重
            SUPPLOTNUM: printSheet.SUPPLOTNUM,         //供应商批号
            PRINTDATE: PRINTDATE.value,           //打印日期
            PALLET: printSheet.PALLET,              //托盘码记录
            DBILLDATE: printSheet.DBILLDATE //采购日期
        }
        addPrintHistoryApi(param).then((res) => {
            getLotNum(printSheet.PK_ORDER_B)
            // initselPrintHistory(printSheet.PK_ORDER_B)
            // LOTNUM.value=res.data
            let lotnum = res.data
            // console.log(lotnum)
            resolve(lotnum)
            if (res.state == '201') {
                ElMessage.success("订单完成")
                getIfPrintSheetsByCode(10, 1)
                showPrintHistorys.length = 0
            }
            if (res.state == '200') {
                showPrintHistorys.length = 0
            }
        })

        //你的逻辑代码

    });
    // const param={
    //     PK_ORDER: printSheet.PK_ORDER,            //采购订单主键
    //     PK_ORDER_B: printSheet.PK_ORDER_B,         //采购订单明细主键
    //     SUPPCODE:printSheet.SUPPCODE,
    //     PRODUCEDATE: dateFormat(printSheet.PRODUCEDATE.toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})),            //生产日期
    //     NETWEIGHT: printSheet.NETWEIGHT,         //净重
    //     GROSSWEIGHT: printSheet.GROSSWEIGHT,            //毛重
    //     SUPPLOTNUM: printSheet.SUPPLOTNUM,         //供应商批号
    //     PRINTDATE: PRINTDATE.value,           //打印日期
    //     PALLET:printSheet.PALLET              //托盘码记录
    //     }
    //     addPrintHistoryApi(param).then((res) => {
    //         getLotNum(printSheet.PK_ORDER_B)
    //         initselPrintHistory(printSheet.PK_ORDER_B)
    //         LOTNUM.value=res.data

    //         if(res.state=='201'){
    //             ElMessage.success("订单完成")
    //             getPrintSheets()
    //             showPrintHistorys.length = 0
    //         }
    //         if(res.state=='200'){
    //             showPrintHistorys.length = 0
    //         }
    //     })
    //     await lotnums.push(LOTNUM.value)


}

//获取物料列表
const getMateriels = () => {
    getMaterielsApi().then((res) => {
        if (res.state == '200') {
            materiels.length = 0
            materiels.push(...res.data)
        } else if (res.state == '404') {
            ElMessage.error('物料列表为空')
        }
    })
}

let materiel: Materiels = reactive({
    pk_ORDER: "",
    pk_ORDER_B: "",
    vbillcode: "",
    matercode: "",
    matername: "",
    dbilldate: "",        //开票日期
    matermaterialspec: "",
    matermaterialtype: "",
    num: 0
})

//根据供应商代码获取物料列表
const getMaterielsByCode = (code) => {
    const param = {
        suppCode: code
    }
    getMaterielsByCodeApi(param).then((res) => {
        if (res.state == '200') {
            materiels.length = 0
            materiels.push(...res.data)
        } else if (res.state == '404') {
            ElMessage.error('物料列表为空')
        }
    })
}

//根据物料编码获取物料
function getMateriel(suppCode, matercode) {
    return new Promise<Materiels>((resolve, reject) => {
        const param = {
            suppCode: suppCode,
            materCode: matercode
        }
        getMaterielApi(param).then((res) => {
            if (res.state == '200') {
                materiel = res.data
                resolve(materiel)
            } else if (res.state == '404') {
                ElMessage.error('物料列表为空')
            }
        })
    })
}

//查询物料列表
const searchMateriels = (code) => {
    const param = {
        search: search.value,
        suppCode: code
    }
    searchMaterielsApi(param).then((res) => {
        if (res.state == '200') {
            materiels.length = 0
            materiels.push(...res.data)
        } else if (res.state == '404') {
            ElMessage.error('物料列表为空')
        }
    })
}



//获取登录的供应商信息
function getSuppUser() {
    return new Promise<Supplier>((resolve, reject) => {
        getSuppUserApi().then((res) => {
            if (res.state == '200') {
                let a: Supplier = reactive({})
                a.suppCode = res.data.code
                a.suppName = res.data.name
                a.suppShortname = res.data.shortname
                resolve(a)
            }
        });
    })
}

//获取批号
const getLotNum = (PK_ORDER_B: string) => {
    const param = {
        PK_ORDER_B: PK_ORDER_B
    }
    getLotNumApi(param).then((res) => {
        if (res.state == '200') {
            LOTNUM.value = res.data
        } else if (res.state == '500') {
            ElMessage.error(res.msg)
        }
    });
}



//渲染后运行
onMounted(() => {
    getState().then(val => {
        state.value = val
        getSuppUser().then(val => {
            printSheet.SUPPCODE = val.suppCode
            printSheet.SUPPNAME = val.suppName
            printSheet.SUPPSHORTNAME = val.suppShortname
            selInfo.SUPPCODE = printSheet.SUPPCODE
            selInfo.Print = "全部"
            selInfo.COMPLETION = "全部"
            selInfo.STARTDATE = ""
            selInfo.ENDDATE = ""
            selInfo.VBILLCODE = ""
            selInfo.SUPPMATERCODE = ""
            selInfo.SUPPLOTNUM = ""
            if (state.value != "0") {
                // getIfPrintSheetsByCode(10,1);
                getSuppIfPrintSheets()
                searchMateriels(selInfo.SUPPCODE);
            }
        });


    })

})

//双击打开修改页面
async function openModify(row: GetPrintSheet) {
    if (row.supplotnum != null && row.supplotnum != "") {
        printSheet.PALLET = ""
        printSheet.PK_ORDER = row.pk_ORDER
        printSheet.PK_ORDER_B = row.pk_ORDER_B
        printSheet.SUPPCODE = row.suppcode
        printSheet.SUPPNAME = row.suppname
        printSheet.SUPPSHORTNAME = row.suppshortname
        printSheet.SUPPMATERCODE = row.suppmatercode
        printSheet.SUPPLOTNUM = row.supplotnum
        printSheet.VBILLCODE = row.vbillcode
        printSheet.MATERCODE = row.matercode
        printSheet.MATERNAME = row.matername
        printSheet.MATERMATERIALSPEC = row.matermaterialspec
        printSheet.MATERMATERIALTYPE = row.matermaterialtype
        // console.log(row.producedate)
        printSheet.PRODUCEDATE = dateFormat(row.producedate)
        printSheet.NETWEIGHT = row.netweight
        printSheet.GROSSWEIGHT = row.grossweight
        printSheet.NUM = row.num
        printSheet.PRINT = row.print
        printSheet.DBILLDATE = row.dbilldate
        getLotNum(printSheet.PK_ORDER_B) //批号
        PRINTQUANTITY.value = 1//打印数量
        selPrintHistoryNum(row)
        dialogModify.value = true
        if (state.value == "0") {
            getMaterielsByCode(supplier.SUPPCODE)
        }
    } else {
        printSheet.SUPPCODE = row.suppcode
        printSheet.SUPPNAME = row.suppname
        printSheet.SUPPSHORTNAME = row.suppshortname
        getMaterielsByCode(printSheet.SUPPCODE)
        printSheet.PALLET = ""
        printSheet.PK_ORDER = row.pk_ORDER
        printSheet.PK_ORDER_B = row.pk_ORDER_B
        printSheet.SUPPCODE = row.suppcode
        printSheet.SUPPNAME = row.suppname
        printSheet.SUPPSHORTNAME = row.suppshortname
        printSheet.SUPPMATERCODE = row.suppmatercode
        printSheet.SUPPLOTNUM = row.supplotnum
        printSheet.VBILLCODE = row.vbillcode
        printSheet.MATERCODE = row.matercode
        printSheet.MATERNAME = row.matername
        printSheet.MATERMATERIALSPEC = row.matermaterialspec
        printSheet.MATERMATERIALTYPE = row.matermaterialtype
        if (printSheet.MATERMATERIALTYPE == null || printSheet.MATERMATERIALTYPE == "") {
            printSheet.MATERMATERIALTYPE = "无"
        }
        // console.log(row.producedate)
        printSheet.PRODUCEDATE = dateFormat(row.producedate)
        printSheet.NETWEIGHT = 0
        printSheet.GROSSWEIGHT = 0
        printSheet.NUM = row.num
        printSheet.PRINT = true
        printSheet.DBILLDATE = row.dbilldate
        printSheet.PRODUCEDATE = format(new Date(), 'yyyy/MM/dd')
        getLotNum(printSheet.PK_ORDER_B) //批号
        PRINTQUANTITY.value = 1//打印数量
        // console.log(row)

        dialogWord.value = true
    }
}



//根据供应商代码获取供应商信息
function getSupplier(suppcode) {
    return new Promise<Suppler>((resolve, reject) => {
        const param = {
            suppCode: suppcode
        }
        getSupplierApi(param).then((res) => {
            let suppler: Suppler = reactive({})
            if (res.state == '200') {
                suppler = res.data
                resolve(suppler)
            } else if (res.state == '500') {
                suppler.code = ""
                suppler.name = ""
                suppler.shortname = ""
            }
        })
    })
}

//查询对应的打印历史数量
const selPrintHistoryNum = (row: GetPrintSheet) => {
    const param = {
        PK_ORDER_B: row.pk_ORDER_B,         //采购订单明细主键
        SUPPLOTNUM: row.supplotnum           //供应商批号
    }
    selPrintHistoryNumApi(param).then((res) => {
        if (res.state == '200') {
            printSheet.NUM = res.data.num - res.data.historyNum
        }
    });
}

//查询对应的打印历史
const selPrintHistory = (row: GetPrintSheet) => {
    //console.log(row.vbillcode)
    //console.log(row.matercode)
    if (row.supplotnum != null && row.supplotnum != "") {
        printSheet.SUPPCODE = row.suppcode
        printSheet.SUPPNAME = row.suppname
        printSheet.SUPPSHORTNAME = row.suppshortname
        //console.log(printSheet.SUPPCODE)
        getMaterielsByCode(printSheet.SUPPCODE)
        printSheet.VBILLCODE = row.vbillcode
        printSheet.MATERCODE = row.matercode
        printSheet.PK_ORDER_B = row.pk_ORDER_B
        const param = {
            PK_ORDER_B: row.pk_ORDER_B,         //采购订单明细主键
            SUPPLOTNUM: row.supplotnum
        }
        selPrintHistoryApi(param).then((res) => {
            if (res.state == '200') {
                showPrintHistorys.length = 0
                showPrintHistorys.push(...res.data)
            }
        })
    } else {
        showPrintHistorys.length = 0
        if (state.value == "0") {
            getMaterielsByCode(row.suppcode)
        }
    }
}

//行查询对应的打印历史
const hangselPrintHistory = (PK_ORDER_B: string, SUPPLOTNUM: string) => {
    const param = {
        PK_ORDER_B: PK_ORDER_B,         //采购订单明细主键
        SUPPLOTNUM: SUPPLOTNUM
    }
    selPrintHistoryApi(param).then((res) => {
        if (res.state == '200') {
            showPrintHistorys.length = 0
            showPrintHistorys.push(...res.data)
        }
    });
}

//根据供应商代码更改供应商信息
const setSupplier = (code) => {
    const param = {
        suppCode: code
    }
    getSupplierApi(param).then((res) => {
        if (res.state == '200') {
            if (res.data != null) {
                printSheet.SUPPCODE = res.data.code
                printSheet.SUPPNAME = res.data.name
                printSheet.SUPPSHORTNAME = res.data.shortname
            } else {
                printSheet.SUPPCODE = ""
                printSheet.SUPPNAME = ""
                printSheet.SUPPSHORTNAME = ""
            }
        }
    });
}

//初始化历史记录
const initselPrintHistory = (PK_ORDER_B: string) => {
    const param = {
        PK_ORDER_B: PK_ORDER_B         //采购订单明细主键
    }
    selPrintHistoryApi(param).then((res) => {
        if (res.state == '200') {
            showPrintHistorys.length = 0
            showPrintHistorys.push(...res.data)
        }
    });
}

//对象重置
const printSheetClear = () => {
    printSheet.PK_ORDER = ''
    printSheet.PK_ORDER_B = ''
    printSheet.SUPPMATERCODE = ''
    printSheet.SUPPLOTNUM = ''
    printSheet.VBILLCODE = ''
    printSheet.MATERCODE = ''
    printSheet.MATERNAME = ''
    printSheet.MATERMATERIALSPEC = ''
    printSheet.MATERMATERIALTYPE = ''
    printSheet.PRODUCEDATE = ""
    printSheet.NETWEIGHT = 0.000
    printSheet.GROSSWEIGHT = 0.000
    printSheet.NUM = 1
    printSheet.PRINT = true
    LOTNUM.value = 0
    PRINTQUANTITY.value = 0
}


//查询对应的打印订单
async function getIfPrintSheetsByCode(pageSize: number, current: number) {
    if (selInfo.STARTDATE != "" && selInfo.STARTDATE != null) {
        selInfo.STARTDATE = dateFormat(selInfo.STARTDATE)
    }
    if (selInfo.ENDDATE != "" && selInfo.ENDDATE != null) {
        selInfo.ENDDATE = dateFormat(selInfo.ENDDATE)
    }

    loading.value = true
    // console.log(selInfo.STARTDATE+"aaa"+selInfo.ENDDATE)
    selInfo.pageSize = pageSize
    selInfo.current = current
    getIfPrintSheetsByCodeApi(selInfo).then((res) => {
        if (res.state == '200') {
            getPrintSheet.length = 0
            getPrintSheet.push(...res.data)
            loading.value = false
        } else if (res.state == '500') {
            ElMessage.error(res.msg)
            loading.value = false
        }
    })
    if (state.value != "0") {

        getSupplier(printSheet.SUPPCODE).then(val => {
            printSheet.SUPPCODE = val.suppcode
            printSheet.SUPPNAME = val.suppname
            printSheet.SUPPSHORTNAME = val.suppshortname
        })
        searchMateriels(printSheet.SUPPCODE);
    } else {
        // console.log("管理员")
        if (selInfo.SUPPCODE != null && selInfo.SUPPCODE != "") {
            getSupplier(selInfo.SUPPCODE).then(val => {
                printSheet.SUPPCODE = val.suppcode
                printSheet.SUPPNAME = val.suppname
                printSheet.SUPPSHORTNAME = val.suppshortname
            })
        }

    }

}

//重打事件
const handleReprint = (row: ShowPrintHistory) => {
    // PrintSheet.SUPPCODE=row.suppcode
    //console.log(row.lotnum)
    printSheet.SUPPMATERCODE = row.suppmatercode
    printSheet.SUPPLOTNUM = row.supplotnum
    printSheet.MATERNAME = row.matername
    printSheet.LOTNUM = row.lotnum
    printSheet.MATERMATERIALSPEC = row.matermaterialspec
    printSheet.MATERMATERIALTYPE = row.matermaterialtype
    printSheet.PRODUCEDATE = row.producedate.toString()
    printSheet.NETWEIGHT = row.netweight
    printSheet.GROSSWEIGHT = row.grossweight
    CreateOneFormPage2()

}
//选中的数据
let selectionPrint: ShowPrintHistory[] = reactive([])

//点击选框事件
const handleSelectionChange = (row: ShowPrintHistory) => {
    selectionPrint = row
}

//打印托盘码
async function addPallet() {
    printInfos.length = 0
    for (var i: number = 0; i < PRINTQUANTITY.value; i++) {
        await addPrintHistory().then(val => {
            printInfo.LOTNUM = val + ""
        });
        await modprintInfo()
        printInfos.push({
            SUPPSHORTNAME: printInfo.SUPPSHORTNAME,
            MATERNAME: printInfo.MATERNAME,
            MATERCODE: printInfo.MATERCODE,
            SUPPMATERCODE: printInfo.SUPPMATERCODE,
            PRODUCEDATE: printInfo.PRODUCEDATE,
            VBILLCODE: printInfo.VBILLCODE,
            SUPPLOTNUM: printInfo.SUPPLOTNUM,
            LOTNUM: printInfo.LOTNUM,
            MATERMATERIALSPEC: printInfo.MATERMATERIALSPEC,
            MATERMATERIALTYPE: printInfo.MATERMATERIALTYPE,
            NETWEIGHT: printInfo.NETWEIGHT,
            GROSSWEIGHT: printInfo.GROSSWEIGHT,
            BARCODE: printInfo.BARCODE
        })
    }

    await outputPrint()
    printInfos.length = 0
    printSheet.PALLET = ""
    dialogPallet.value = false
}

//删除打印事件
const handleDelete = (row: ShowPrintHistory) => {
    const param = {
        PK_ORDER_B: row.pk_ORDER_B,
        LOTNUM: row.lotnum
    }
    delPrintHistoryApi(param).then((res) => {
        if (res.state == '200') {
            hangselPrintHistory(row.pk_ORDER_B, row.supplotnum)
        } else if (res.state == '404') {
            ElMessage.error('物料列表为空')
        }
    })
}

//获取供应商名称下拉框
const supp = ref()

const supplier = reactive({
    SUPPSHORTNAME: "",

    SUPPCODE: ""
})
let SUPPCODES = ['']
//供应商名称更改时更新代码
const updatesupplier = () => {
    supplier.SUPPSHORTNAME = supp.value.SUPPSHORTNAME
    SUPPCODES = ['']
    SUPPCODES = supp.value.SUPPCODES
    supplier.SUPPCODE = SUPPCODES[0]
}

//重写右键事件
let customContextMenu = ref();
const openMenu = (e: any) => {
    let top = e.pageY;
    let left = e.pageX;
    let ele = customContextMenu.value;
    ele.style.top = top + 'px';
    ele.style.left = left + 'px';
    ele.style.display = 'block';
    console.log(e)
};
window.addEventListener('click', () => {
    let menuElement = customContextMenu.value;
    if (menuElement != null && menuElement != "") {
        menuElement.style.display = 'none';
    }
    let menuElement2 = orderNew.value;
    if (menuElement2 != null && menuElement2 != "") {
        menuElement2.style.display = 'none';
    }
}
)

//打开托盘码窗口事件
const PalletClick = () => {

    if (selectionPrint.length > 0) {

        printSheet.SUPPMATERCODE = selectionPrint[0].suppmatercode
        printSheet.SUPPLOTNUM = selectionPrint[0].supplotnum
        printSheet.MATERNAME = selectionPrint[0].matername
        printSheet.PRODUCEDATE = format(new Date(), 'yyyy/MM/dd')
        printSheet.MATERMATERIALSPEC = selectionPrint[0].matermaterialspec
        printSheet.MATERMATERIALTYPE = selectionPrint[0].matermaterialtype
        PRINTQUANTITY.value = 1
        let NETWEIGHT = 0.0
        let GROSSWEIGHT = 0.0
        printSheet.PALLET = "";
        for (var i = 0; i < selectionPrint.length; i++) {
            NETWEIGHT += selectionPrint[i].netweight
            GROSSWEIGHT += selectionPrint[i].grossweight
            printSheet.PALLET += selectionPrint[i].lotnum + ","
        }
        printSheet.NETWEIGHT = NETWEIGHT
        printSheet.GROSSWEIGHT = GROSSWEIGHT
        getLotNum(printSheet.PK_ORDER_B)
        dialogPallet.value = true;
    } else {
        ElMessage.error('没有选中的数据')
    }
}
//给托盘码添加的打印记录标识
const tableRowClassName = ({
    row,
}: {
    row: ShowPrintHistory
}) => {

    if (row.pallet != null && row.pallet != "") {
        return 'warning-row'
    } else {
        return ""
    }
}
//分页
const currentPage1 = ref(1)
const total = ref(1)
const pageSize1 = ref(10)
const handleSizeChange = (val: number) => {
    getIfPrintSheetsByCode(val, currentPage1.value)
}
const handleCurrentChange = (val: number) => {
    getIfPrintSheetsByCode(pageSize1.value, val)
}
</script>
<style lang="scss">
#indexView {
    #word {
        .el-form-item {
            width: 360px;
            margin-right: 10px;
            margin-left: 10px;

            .el-form-item__label {
                justify-content: flex-start;
            }
        }
    }

    #modify,
    #pallet {
        .el-form-item {
            width: 360px;
            margin-right: 10px;
            margin-left: 10px;

            .el-form-item__label {
                justify-content: flex-start;
            }
        }
    }

    #query {
        .el-form-item {
            width: 350px;
            margin-right: 5px;
            margin-left: 5px;

            .el-form-item__label {
                justify-content: flex-start;
            }

            .el-form-item__content {
                min-width: 250px;

                .el-input {
                    width: 220px
                }
            }
        }
    }
}

.custom-contextmenu {
    z-index: 10000;
    border: 1px solid #ccc;
    width: 100px;
    padding: 0;
    list-style: none;
    border-bottom: none;
    position: fixed;
    display: none;
    background-color: #fff;

    li {
        width: 100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        &:hover {
            background-color: skyblue;
        }
    }
}

.el-table .warning-row {
    color: rgb(17, 33, 255);
    font-weight: bold;
}
</style>