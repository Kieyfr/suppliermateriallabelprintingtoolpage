<template >
  <div id="indexView">
    <div id="header">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
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
      <el-table 
      :data="getPrintSheet" 
      style="width: 1100px" 
      max-height="250px" 
      highlight-current-row
      @row-click="selPrintHistory"
      @row-dblclick="openModify">  
        <el-table-column type="index" width="100" />
        <el-table-column prop="suppshortname" sortable label="供应商简称" width="250"/>
        <el-table-column prop="matername" sortable label="物料名称" width="205" />
        <el-table-column prop="vbillcode" sortable label="订单号" width="250"/>
        <el-table-column prop="supplotnum" sortable label="商厂批号" width="250"/>
      </el-table>
    </div>
    <div id="record" @contextmenu.prevent="openMenu($event)">
        <el-table
            :data="showPrintHistorys"
            highlight-current-row
            style="width: 1300px;font-size:12px"
            height="400px"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
            selection-mode="multiple"
            >
                                                                                    <!-- 禁用托盘码打印的复选框 -->
            <el-table-column type="selection" width="50" :selectable="row => !(row.pallet!=null&&row.pallet!='')"/>
            <el-table-column type="index" width="50" />
            <el-table-column property="matername" sortable label="物料名称" show-overflow-tooltip width="110"/>
            <el-table-column property="suppmatercode" sortable label="供应商料号" show-overflow-tooltip width="110"/>
            <el-table-column property="producedate" sortable label="生产日期" show-overflow-tooltip width="110"/>
            <el-table-column property="lotnum" sortable label="批号" show-overflow-tooltip width="110"/>
            <el-table-column property="netweight" sortable label="净重" show-overflow-tooltip width="80"/>
            <el-table-column property="grossweight" sortable label="毛重" show-overflow-tooltip width="80"/>
            <el-table-column property="supplotnum" sortable label="供应商批号" show-overflow-tooltip width="110"/>
            <el-table-column property="matermaterialspec" sortable label="物料规格" show-overflow-tooltip width="110"/>
            <el-table-column property="matermaterialtype" sortable label="物料颜色" show-overflow-tooltip width="110"/>
            <el-table-column property="printdate" sortable label="打印日期" show-overflow-tooltip width="110"/>
            
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
        <el-dialog 
        v-model="dialogWord" 
        title="新建" 
        width="800px" 
        :close-on-click-modal="false"
        >
            <el-form :model="printSheet" label-width="100px" :inline="true">
                <el-form-item label="供应商名称">
                    <el-input v-model="printSheet.SUPPSHORTNAME" disabled/>
                </el-form-item>
                <el-form-item label="新亚物料编号">
                    <div id="material">
                        <el-popover placement="bottom" width="auto" :visible="visible" >
                            <template #reference>
                            <el-input v-model="printSheet.MATERCODE" placeholder="请选择" readonly @click="openPopover" />
                            </template>
                                <div v-click-outside= "onClickOutside">
                                    <el-input
                                        v-model="search"
                                        class="w-50 m-2"
                                        size="large"
                                        style="width:200px;height: 32px;"
                                    />
                                    <el-button :icon="Search" @click="searchMateriels(printSheet.SUPPCODE)"/>
                                    <el-table :data="materiels" style="width: 100%" height="240px" @row-click="getMaterial">
                                        <el-table-column prop="vbillcode" label="订单号" width="180" />
                                        <el-table-column prop="matercode" label="物料编码" width="180" />
                                        <el-table-column prop="matername" label="物料名称" width="150" />
                                        <el-table-column prop="matermaterialspec" label="物料规格" width="150" />
                                        <el-table-column prop="matermaterialtype" label="物料颜色" width="150"/>
                                    </el-table>
                                </div>
                        </el-popover>
                    </div>
                </el-form-item>
                <el-form-item label="供应商料号">
                    <el-input v-model="printSheet.SUPPMATERCODE"/>
                </el-form-item>
                <el-form-item label="物料名称">
                    <el-input v-model="printSheet.MATERNAME" disabled />
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="printSheet.VBILLCODE" disabled/>
                </el-form-item>
                <el-form-item label="批号">
                    <el-input v-model="LOTNUM" disabled />
                </el-form-item>
                <el-form-item label="净重">
                    <el-input-number :precision="3" v-model="printSheet.NETWEIGHT"  :min="0"/>
                </el-form-item>
                <el-form-item label="毛重">
                    <el-input-number :precision="3" v-model="printSheet.GROSSWEIGHT" :min="0" />
                </el-form-item>
                <el-form-item label="供应商批号">
                    <el-input v-model="printSheet.SUPPLOTNUM"/>
                </el-form-item>
                <el-form-item label="绞距" v-if="printSheet.MATERCODE.substring(0,2)==='06'">
                    <el-input v-model="printSheet.MATERMATERIALSPEC" disabled/>
                </el-form-item>
                <el-form-item label="颜色" v-else>
                    <el-input v-model="printSheet.MATERMATERIALTYPE" disabled/>
                </el-form-item>
                <el-form-item label="供应商代码">
                    <el-input v-model="printSheet.SUPPCODE" disabled />
                </el-form-item>
                <el-form-item label="打印数量" >
                    <el-input-number :precision="0" v-model="PRINTQUANTITY" :min="1" :max="printSheet.NUM"/>
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-date-picker
                        v-model="printSheet.PRODUCEDATE"
                        type="date"
                        
                        format="YYYY/MM/DD"
                        value-format="YYYY/MM/DD"
                        timezone="GMT+8"
                    />
                </el-form-item>
                <el-form-item label="打印日期" >
                    <el-date-picker
                        v-model="PRINTDATE"
                        type="date"
                        format="YYYY/MM/DD"
                        timezone="GMT+8"
                        :default-time="new Date(2000, 1, 1, 0, 0, 0)"
                        readonly
                    />
                </el-form-item>
                <el-button @click="handleSubit" type="primary">打印</el-button>
                <el-button @click="dialogWord=false">退出</el-button>
            </el-form>
        </el-dialog>
    </div>
    <div id="modify">
        <el-dialog 
        v-model="dialogModify" 
        title="打印" 
        width="800px"
        :close-on-click-modal="false"
        >
            <el-form :model="printSheet" label-width="100px" :inline="true">
                <el-form-item label="供应商名称">
                    <el-input v-model="printSheet.SUPPSHORTNAME" disabled/>
                </el-form-item>
                <el-form-item label="新亚物料编号">
                    <el-input v-model="printSheet.MATERCODE" disabled/>
                </el-form-item>
                <el-form-item label="供应商料号">
                    <el-input v-model="printSheet.SUPPMATERCODE" disabled/>
                </el-form-item>
                <el-form-item label="物料名称">
                    <el-input v-model="printSheet.MATERNAME" disabled />
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="printSheet.VBILLCODE" disabled/>
                </el-form-item>
                <el-form-item label="批号">
                    <el-input v-model="LOTNUM" disabled />
                </el-form-item>
                <el-form-item label="净重">
                    <el-input-number :precision="3" v-model="printSheet.NETWEIGHT"  :min="0"/>
                </el-form-item>
                <el-form-item label="毛重">
                    <el-input-number :precision="3" v-model="printSheet.GROSSWEIGHT" :min="0" />
                </el-form-item>
                <el-form-item label="供应商批号">
                    <el-input v-model="printSheet.SUPPLOTNUM" disabled/>
                </el-form-item>
                <el-form-item label="绞距" v-if="printSheet.MATERCODE.substring(0,2)==='06'" >
                    <el-input v-model="printSheet.MATERMATERIALSPEC" disabled/>
                </el-form-item>
                <el-form-item label="颜色" v-else>
                    <el-input v-model="printSheet.MATERMATERIALTYPE" disabled/>
                </el-form-item>
                <el-form-item label="供应商代码">
                    <el-input v-model="printSheet.SUPPCODE" disabled />
                </el-form-item>
                <el-form-item label="打印数量" >
                    <el-input-number :precision="0" v-model="PRINTQUANTITY" :min="1" :max="printSheet.NUM"/>
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-date-picker
                        v-model="printSheet.PRODUCEDATE"
                        type="date"
                        format="YYYY/MM/DD"
                    />
                </el-form-item>
                <el-form-item label="打印日期">
                    <el-date-picker
                        v-model="PRINTDATE"
                        type="date"
                        format="YYYY/MM/DD"
                        timezone="GMT+8"
                        :default-time="new Date(2000, 1, 1, 0, 0, 0)"
                        readonly
                    />
                </el-form-item>
                <el-button @click="modhandleSubit" type="primary">打印</el-button>
                <el-button @click="dialogModify=false">退出</el-button>
            </el-form>
        </el-dialog>

    </div>
    <div id="query">
        <el-dialog
            v-model="dialogQuery"
            title="查询"
            width="800px"
            :close-on-click-modal="false"
        >
            <el-form :model="selInfo" label-width="100px" :inline="true">
                        <DownSearch ref="supp" v-if="state=='0'" :updatesupplier="updatesupplier" :SUPPNAME="printSheet.SUPPNAME"></DownSearch>
                        <el-form-item label="供应商代码" v-if="state=='0'">
                            <el-select v-model="supplier.SUPPCODE">
                              <el-option
                                v-for="item in SUPPCODES"
                                :key="item"
                                :label="item"
                                :value="item"
                              >
                              </el-option>
                            </el-select>
                          </el-form-item>
                        <el-form-item label="供应商料号">
                            <el-input v-model="selInfo.SUPPMATERCODE"/>
                        </el-form-item>
                        <el-form-item label="供应商批号">
                            <el-input v-model="selInfo.SUPPLOTNUM"/>
                        </el-form-item>
                        <el-form-item label="订单号">
                            <el-input v-model="selInfo.VBILLCODE"/>
                        </el-form-item>
                        <el-form-item label="是否打印完成">
                            <el-radio-group v-model="selInfo.COMPLETION">
                                <el-radio label="全部" />
                                <el-radio label="未完成" />
                                <el-radio label="已完成" />
                            </el-radio-group>
                        </el-form-item>
                        <!-- <el-form-item label="查询日期">
                            <el-date-picker
                                v-model="selInfo.STARTDATE"
                                type="date"
                                :size="10"
                            />
                        </el-form-item>
                        <el-form-item label="截止日期">
                            <el-date-picker
                                v-model="selInfo.ENDDATE"
                                type="date"
                                :size="10"
                            />
                        </el-form-item> -->
                        <el-button v-if="state=='0'" type="primary" @click="getSuppIfPrintSheets" >查询</el-button>
                        <el-button v-else type="primary" @click="getIfPrintSheets" >查询</el-button>
                        <el-button @click="dialogQuery=false">返回</el-button>
            </el-form>
        </el-dialog>
        
    </div>
    <div id="pallet">
        <el-dialog 
        v-model="dialogPallet" 
        title="打印托盘码" 
        width="800px"
        :close-on-click-modal="false"
        >
            <el-form :model="printSheet" label-width="100px" :inline="true">
                <el-form-item label="供应商名称">
                    <el-input v-model="printSheet.SUPPSHORTNAME" disabled/>
                </el-form-item>
                <el-form-item label="新亚物料编号">
                    <el-input v-model="printSheet.MATERCODE" disabled/>
                </el-form-item>
                <el-form-item label="供应商料号">
                    <el-input v-model="printSheet.SUPPMATERCODE" disabled/>
                </el-form-item>
                <el-form-item label="物料名称">
                    <el-input v-model="printSheet.MATERNAME" disabled />
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="printSheet.VBILLCODE" disabled/>
                </el-form-item>
                <el-form-item label="批号">
                    <el-input v-model="LOTNUM" disabled />
                </el-form-item>
                <el-form-item label="净重">
                    <el-input-number :precision="3" v-model="printSheet.NETWEIGHT"  :min="0"  disabled/>
                </el-form-item>
                <el-form-item label="毛重">
                    <el-input-number :precision="3" v-model="printSheet.GROSSWEIGHT" :min="0" disabled />
                </el-form-item>
                <el-form-item label="供应商批号">
                    <el-input v-model="printSheet.SUPPLOTNUM" disabled/>
                </el-form-item>
                <el-form-item label="绞距" v-if="printSheet.MATERCODE.substring(0,2)==='06'" >
                    <el-input v-model="printSheet.MATERMATERIALSPEC" disabled/>
                </el-form-item>
                <el-form-item label="颜色" v-else>
                    <el-input v-model="printSheet.MATERMATERIALTYPE" disabled/>
                </el-form-item>
                <el-form-item label="供应商代码">
                    <el-input v-model="printSheet.SUPPCODE" disabled />
                </el-form-item>
                <el-form-item label="打印数量" >
                    <el-input-number :precision="0" v-model="PRINTQUANTITY" :min="1" />
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-date-picker
                        v-model="printSheet.PRODUCEDATE"
                        type="date"
                        
                        format="YYYY/MM/DD"
                        value-format="YYYY/MM/DD"
                        timezone="GMT+8"
                    />
                </el-form-item>
                <el-form-item label="打印日期">
                    <el-date-picker
                        v-model="PRINTDATE"
                        type="date"
                        format="YYYY/MM/DD"
                        timezone="GMT+8"
                        :default-time="new Date(2000, 1, 1, 0, 0, 0)"
                        readonly
                    />
                </el-form-item>
                <el-button @click="addPallet" type="primary">打印</el-button>
                <el-button @click="dialogPallet=false,printSheet.PALLET=''">退出</el-button>
            </el-form>
        </el-dialog>

    </div>
    <ul class="custom-contextmenu" ref="customContextMenu" style="">
        <li @click="PalletClick()">打印托盘码</li>
      </ul>
  </div>
  
  
</template>

<script lang="ts" setup>
import { reactive , ref, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import { GetPrintSheet,Materiels ,ShowPrintHistory} from '../types/index'
import { ElMessage ,ClickOutside as vClickOutside} from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getSuppUserApi } from '../api/getSuppUser'
import { addPrintSheetApi } from '../api/addPrintSheet'
import { addPrintHistoryApi } from '../api/addPrintHistory'
import { getMaterielsApi } from '@/api/getMateriels'
import { getMaterielsByCodeApi } from '@/api/getMateriels'
import { getLotNumApi } from '../api/getLotNum'
import { getPrintSheetsApi } from '../api/getPrintSheets'
import { getPrintSheetsByCodeApi } from '../api/getPrintSheets'
import { selPrintHistoryApi } from '../api/selPrintHistory'
import { getIfPrintSheetsApi } from '../api/getIfPrintSheets'
import { getIfPrintSheetsByCodeApi } from '../api/getIfPrintSheets'
import { selPrintHistoryNumApi } from '../api/selPrintHistoryNum'
import { searchMaterielsApi } from '../api/searchMateriels'
import { delPrintHistoryApi } from '../api/delPrintHistory'
import { getStateApi } from '../api/getState'
import { loginAdminsupplier } from '@/api/loginAdmin'
import { getSupplierApi } from '@/api/getSupplier'

import {GetPrintWorld,ToAbsoluteURL} from "../assets/PrintWorld.js"
import DownSearch from "../components/DownSearch.vue"
import { format } from 'date-fns'
//打印信息
let printInfo={
      SUPPSHORTNAME:"",       //供应商简称
      MATERNAME:"",           //物料名称
      MATERCODE:"",           //物料编码
      SUPPMATERCODE:"",       //供应商料号
      PRODUCEDATE:"",           //生产日期
      VBILLCODE:"",           //订单号
      SUPPLOTNUM:"",          //供应商批号
      LOTNUM:"",            //批号
      MATERMATERIALSPEC:"",   //物料规格
      MATERMATERIALTYPE:"",   //物料颜色
      NETWEIGHT:"",           //净重
      GROSSWEIGHT:"",         //毛重
      PRINTQUANTITY:1,        //打印数量
      BARCODE:""              //条码
    }
    //获取打天下
    const printworld = GetPrintWorld()

    //打印
    const outputPrint=()=> {
        var json = {};	
        json.action = "print";

        if(printInfo.MATERCODE.substring(0,2)==='06'){
            json.template = ToAbsoluteURL("print.fmx");	
        }else{
            json.template = ToAbsoluteURL("print2.fmx");	
        }
        var downloadUrl = "打天下1.6.zip";
        printworld.DownloadUrlForTemplatePrint(downloadUrl)
        json.data = printInfo
        printworld.Act(json)
        
    }

    
    

//打开打印方法
const CreateOneFormPage = () => {
    modprintInfo()
    setTimeout(()=>{
    outputPrint()
    },0)
};
const CreateOneFormPage2 = () => {
    modprintInfo2()
    setTimeout(()=>{
    outputPrint()
    },0)
};

//更改json信息方法
const modprintInfo=()=>{
    printInfo.SUPPSHORTNAME=printSheet.SUPPSHORTNAME
    printInfo.MATERNAME=printSheet.MATERNAME
    printInfo.MATERCODE=printSheet.MATERCODE
    printInfo.SUPPMATERCODE=printSheet.SUPPMATERCODE
    printInfo.PRODUCEDATE=dateFormat(printSheet.PRODUCEDATE)
    printInfo.SUPPLOTNUM=printSheet.SUPPLOTNUM
    printInfo.VBILLCODE=printSheet.VBILLCODE
    printInfo.LOTNUM=LOTNUM.value
    printInfo.MATERMATERIALSPEC=printSheet.MATERMATERIALSPEC
    printInfo.MATERMATERIALTYPE=printSheet.MATERMATERIALTYPE
    printInfo.NETWEIGHT=printSheet.NETWEIGHT+"KG"
    printInfo.GROSSWEIGHT=printSheet.GROSSWEIGHT+"KG"
    printInfo.PRINTQUANTITY=printSheet.PRINTQUANTITY
    printInfo.BARCODE=barCode(printInfo.MATERCODE,printSheet.NETWEIGHT+"",printSheet.SUPPCODE,printInfo.VBILLCODE,printInfo.LOTNUM)
}
const modprintInfo2=()=>{
    printInfo.SUPPSHORTNAME=printSheet.SUPPSHORTNAME
    printInfo.MATERNAME=printSheet.MATERNAME
    printInfo.MATERCODE=printSheet.MATERCODE
    printInfo.SUPPMATERCODE=printSheet.SUPPMATERCODE
    printInfo.PRODUCEDATE=dateFormat(printSheet.PRODUCEDATE)
    printInfo.SUPPLOTNUM=printSheet.SUPPLOTNUM
    printInfo.VBILLCODE=printSheet.VBILLCODE
    printInfo.LOTNUM=printSheet.LOTNUM
    printInfo.MATERMATERIALSPEC=printSheet.MATERMATERIALSPEC
    printInfo.MATERMATERIALTYPE=printSheet.MATERMATERIALTYPE
    printInfo.NETWEIGHT=printSheet.NETWEIGHT+"KG"
    printInfo.GROSSWEIGHT=printSheet.GROSSWEIGHT+"KG"
    printInfo.PRINTQUANTITY=printSheet.PRINTQUANTITY
    printInfo.BARCODE=barCode(printInfo.MATERCODE,printSheet.NETWEIGHT+"",printSheet.SUPPCODE,printInfo.VBILLCODE,printInfo.LOTNUM)
}
//生成条码
const barCode=(matercode,netweight,suppcode,vbillcode,lotnum)=>{
    let barcode=""
    let pd=netweight.indexOf(".");
    let netweight1=""
    let netweight2=""
    let netweight3=""
    if(pd!=-1){
        netweight1=netweight.substr(0,pd);
        netweight2=netweight.substr(pd,netweight.length-1)
        while(netweight1.length<4){
            netweight1="0"+netweight1
        }
        while(netweight2.length<4){
            netweight2=netweight1+"0"
        }
    }else{
        netweight1=netweight;
        netweight2=".000";
        while(netweight1.length<4){
            netweight1="0"+netweight1
        }
    }
    netweight3=netweight1+netweight2+"";
    barcode="W"+matercode+netweight3+suppcode+vbillcode+lotnum;
    return barcode
}
//日期格式化
const dateFormat=(time)=> {
                var date=new Date(time);
                var year=date.getFullYear();
                /* 在日期格式中，月份是从0开始的，因此要加0
                 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                 * */
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                // 拼接
                return year+"-"+month+"-"+day
            }

const router = useRouter();

const dialogWord = ref(false)   //新建窗口是否显示
const dialogQuery = ref(false)  //查询窗口是否显示
const dialogModify = ref(false) //修改窗口是否显示
const dialogPallet = ref(false) //打印托盘码窗口是否显示

const search = ref('') //修改窗口是否显示

const dialogSupplierVisible=ref('')//管理员切换供应商窗口是否显示

var visible = ref(false)    //气泡表格是否显示

let LOTNUM = ref(0) //批号
const PRINTQUANTITY = ref(1)//打印数量
const PRINTDATE = ref(new Date)//打印日期

const state=ref('');

//获取登录状态
const getState=()=>{
    
    getStateApi().then((res) => {
        if(res.state=='200'){
            state.value=res.data
            console.log(state.value===0)
        }else if(res.state=='404'){
            
            ElMessage.error(res.msg)
        }
        console.log(state.value)
})
}



//管理员查询
const getSuppIfPrintSheets=()=>{
    
    showPrintHistorys.length = 0
    getPrintSheet.length=0
    if(supplier.SUPPSHORTNAME==""||supplier.SUPPCODE!=null){
        setSupplier(supplier.SUPPCODE)
        getPrintSheetsByCode(supplier.SUPPCODE)
        getMaterielsByCode(supplier.SUPPCODE)
        getIfPrintSheetsByCode(supplier.SUPPCODE)
    }
        dialogQuery.value=false
    
}

var materiels : Materiels[]=reactive([]); //物料信息表格
var getPrintSheet: GetPrintSheet[] = reactive([]);   //供应商打印类别
var showPrintHistorys : ShowPrintHistory[]=reactive([]);

const printSheet = reactive({
    PK_ORDER: '',            //采购订单主键
    PK_ORDER_B:'',          //采购订单明细主键
    SUPPCODE:'',            //供应商代码
    SUPPNAME:'',            //供应商名称
    SUPPSHORTNAME:'',       //供应商简称
    SUPPMATERCODE:'',       //供应商料号
    SUPPLOTNUM:'',          //供应商批号
    LOTNUM:'',              //批号
    VBILLCODE:'',           //订单号
    MATERCODE:'',           //物料编码
    MATERNAME:'',           //物料名称
    MATERMATERIALSPEC:'',   //物料规格
    MATERMATERIALTYPE:'',   //物料颜色
    PRODUCEDATE: new Date(),         //生产日期
    NETWEIGHT:0.000,        //净重
    GROSSWEIGHT:0.000,      //毛重
    NUM: 1,
    PRINT:true,            //是否可以打印
    PALLET:""               //托盘码信息
})


//查询信息
const selInfo=reactive({
    SUPPMATERCODE:"",//供应商料号
    VBILLCODE:"",//订单号
    SUPPLOTNUM:"",//供应商批号
    COMPLETION:"全部",//是否完成
    STARTDATE:null,//起始日期
    ENDDATE:null//截止日期
})

//设置菜单选中触发
const handleSelect = (key: string) => {
    if(key=="1"){
        printSheetClear()
        printSheet.PALLET=""
        printSheet.PRODUCEDATE=format(new Date(),'yyyy/MM/dd')
        dialogWord.value = true
    }
    if(key=="2"){
        printSheetClear()
        dialogQuery.value = true
    }
    if(key=="3"){
        localStorage.removeItem("accessToken")
        router.push('/')
    }
    
}

//设置新建表单验证
const handleSubit = () => {
    if(printSheet.MATERCODE==''){
        ElMessage.error('请选择新亚物料编号')
    }
    else if(printSheet.PRODUCEDATE==null){
        ElMessage.error('请选择生产日期')
    }
    else if(printSheet.SUPPMATERCODE==''){
        ElMessage.error('请填写供应商料号')
    }
    else if(printSheet.SUPPLOTNUM==''){
        ElMessage.error('请填写供应商批号')
    }
    else if(printSheet.NETWEIGHT==0.00){
        ElMessage.error('请设置净重')
    }
    else if(printSheet.GROSSWEIGHT==0.00){
        ElMessage.error('请设置毛重')
    }
    else if(printSheet.GROSSWEIGHT<=printSheet.NETWEIGHT){
        ElMessage.error('毛重需要大于等于净重')
    }
    else {
        printSheet.PRODUCEDATE=dateFormat(printSheet.PRODUCEDATE)
        addPrintSheet()
        dialogWord.value=false
    }
}

//设置修改表单验证
const modhandleSubit = () => {
    if(printSheet.NETWEIGHT==0.00){
        ElMessage.error('请设置净重')
    }
    else if(printSheet.GROSSWEIGHT==0.00){
        ElMessage.error('请设置毛重')
    }
    else if(printSheet.GROSSWEIGHT<=printSheet.NETWEIGHT){
        ElMessage.error('毛重需要大于等于净重')
    }
    else {
        for(var i:number=0;i<PRINTQUANTITY.value;i++){
                
                addPrintHistory()
            }
        dialogModify.value=false
    }
}

//显示气泡表格
const openPopover = () => {
  visible.value=true
}
//隐藏气泡表格
const onClickOutside = () => {
    search.value=''
  visible.value=false
}

//获取物料信息
const getMaterial = (row:Materiels) => {
  getLotNum(row.pk_ORDER_B)
  printSheet.PK_ORDER=row.pk_ORDER
  printSheet.PK_ORDER_B=row.pk_ORDER_B
  printSheet.VBILLCODE=row.vbillcode
  printSheet.MATERCODE=row.matercode
  printSheet.MATERNAME=row.matername
  printSheet.MATERMATERIALSPEC=row.matermaterialspec
  printSheet.MATERMATERIALTYPE=row.matermaterialtype
  printSheet.NUM=row.num
  visible.value=false
}

//添加打印单列表
const addPrintSheet=()=>{
    addPrintSheetApi(printSheet).then((res) => {
        if(res.state=='200'){
            for(var i:number=0;i<PRINTQUANTITY.value;i++){
                addPrintHistory()
            }
            
            
            if(state.value=="0"){
                getPrintSheetsByCode(supplier.SUPPCODE)
                getMaterielsByCode(supplier.SUPPCODE)
            }else{
                getPrintSheets()
                getMateriels()
            }
            
        }else if(res.state=='403'){
            ElMessage.error('订单重复，请选择其他订单')
        }else if(res.state=='500'){
            ElMessage.error('添加失败')
        }
    }) 
}

//添加打印单历史记录
const addPrintHistory=()=>{
    const param={
      PK_ORDER: printSheet.PK_ORDER,            //采购订单主键
      PK_ORDER_B: printSheet.PK_ORDER_B,         //采购订单明细主键
      SUPPCODE:printSheet.SUPPCODE,
      PRODUCEDATE: dateFormat(printSheet.PRODUCEDATE.toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})),            //生产日期
      NETWEIGHT: printSheet.NETWEIGHT,         //净重
      GROSSWEIGHT: printSheet.GROSSWEIGHT,            //毛重
      SUPPLOTNUM: printSheet.SUPPLOTNUM,         //供应商批号
      PRINTDATE: PRINTDATE.value,           //打印日期
      PALLET:printSheet.PALLET              //托盘码记录
    }
    addPrintHistoryApi(param).then((res) => {
        getLotNum(printSheet.PK_ORDER_B)
        initselPrintHistory(printSheet.PK_ORDER_B)
        LOTNUM.value=res.data
        
        CreateOneFormPage()
        if(res.state=='201'){
            ElMessage.success("订单完成")
            getPrintSheets()
            showPrintHistorys.length = 0
        }
    }) ;
}

//获取物料列表
const getMateriels = () => {
    getMaterielsApi().then((res) => {
        if(res.state=='200'){
            materiels.length=0
            materiels.push(...res.data) 
        }else if(res.state=='404'){
            ElMessage.error('物料列表为空')
        }
    }) 
}

//根据供应商代码获取物料列表
const getMaterielsByCode = (code) => {
    const param = {
        suppCode: code
    }
    getMaterielsByCodeApi(param).then((res) => {
        if(res.state=='200'){
            materiels.length=0
            materiels.push(...res.data) 
        }else if(res.state=='404'){
            ElMessage.error('物料列表为空')
        }
    }) 
}

//查询物料列表
const searchMateriels = (code) => {
    const param = {
        search: search.value,
        suppCode:code
    }
    searchMaterielsApi(param).then((res) => {
        if(res.state=='200'){
            console.log(res.data)
            materiels.length=0
            materiels.push(...res.data) 
        }else if(res.state=='404'){
            ElMessage.error('物料列表为空')
        }
    }) 
}

//获取登录的供应商信息
const getSuppUser = () => {
    getSuppUserApi().then((res) => {
        if(res.state=='200'){
            printSheet.SUPPCODE = res.data.code
            printSheet.SUPPNAME = res.data.name
            printSheet.SUPPSHORTNAME = res.data.shortname
        }
    });
}

//获取批号
const getLotNum = (PK_ORDER_B:string) => {
    const param = {
        PK_ORDER_B:PK_ORDER_B
    }
    getLotNumApi(param).then((res) => {
        if(res.state=='200'){
            LOTNUM.value=res.data
        }else if(res.state=='500'){
            ElMessage.error(res.msg)
        }
    }) ;
}

//获取打印列表
const getPrintSheets = () => {
    getPrintSheetsApi().then((res) => {
        if(res.state=='200'){
            getPrintSheet.length = 0
            getPrintSheet.push(...res.data)
        }else if(res.state=='500'){
            ElMessage.error('获取失败')
        }
    }) ;
}
//根据供应商代码获取打印列表
const getPrintSheetsByCode = (code) => {
    const param = {
        suppCode: code
    }
    getPrintSheetsByCodeApi(param).then((res) => {
        if(res.state=='200'){
            getPrintSheet.length = 0
            getPrintSheet.push(...res.data)
        }else if(res.state=='500'){
            ElMessage.error('获取失败')
        }
    }) ;
}
//渲染后运行
onMounted(()=>{
    getState();
    getSuppUser();
    getMateriels();
    getPrintSheets();
    
})

//双击打开修改页面
const openModify=(row:GetPrintSheet)=>{
  printSheet.PALLET=""
  printSheet.PK_ORDER=row.pk_ORDER
  printSheet.PK_ORDER_B=row.pk_ORDER_B
  printSheet.SUPPCODE=row.suppcode
  printSheet.SUPPNAME=row.suppname
  printSheet.SUPPSHORTNAME=row.suppshortname
  printSheet.SUPPMATERCODE=row.suppmatercode
  printSheet.SUPPLOTNUM=row.supplotnum
  printSheet.VBILLCODE=row.vbillcode
  printSheet.MATERCODE=row.matercode
  printSheet.MATERNAME=row.matername
  printSheet.MATERMATERIALSPEC=row.matermaterialspec
  printSheet.MATERMATERIALTYPE=row.matermaterialtype
  printSheet.PRODUCEDATE=row.producedate
  printSheet.NETWEIGHT=row.netweight
  printSheet.GROSSWEIGHT=row.grossweight
//   printSheet.NUM=row.num
  printSheet.PRINT=row.print
  getLotNum(printSheet.PK_ORDER_B) //批号
  PRINTQUANTITY.value = 1//打印数量
  selPrintHistoryNum(row)
  dialogModify.value = true
  if(state.value=="0"){
    console.log("aaa")
    getMaterielsByCode(supplier.SUPPCODE)
  }
  
}

//查询对应的打印历史数量
const selPrintHistoryNum=(row:GetPrintSheet)=>{
    const param={
        PK_ORDER_B: row.pk_ORDER_B         //采购订单明细主键
    }
    selPrintHistoryNumApi(param).then((res) => {
        if(res.state=='200'){
            printSheet.NUM = res.data.num-res.data.historyNum
        }
    }) ;
}

//查询对应的打印历史
const selPrintHistory=(row:GetPrintSheet)=>{
    //console.log(row.vbillcode)
    //console.log(row.matercode)

    printSheet.SUPPCODE=row.suppcode
    printSheet.SUPPNAME=row.suppname
    printSheet.SUPPSHORTNAME=row.suppshortname
    console.log(printSheet.SUPPCODE)
    getMaterielsByCode(printSheet.SUPPCODE)
    printSheet.VBILLCODE=row.vbillcode
    printSheet.MATERCODE=row.matercode
    printSheet.PK_ORDER_B=row.pk_ORDER_B
    const param={
        PK_ORDER_B: row.pk_ORDER_B         //采购订单明细主键
    }
    selPrintHistoryApi(param).then((res) => {
        if(res.state=='200'){
            showPrintHistorys.length = 0
            showPrintHistorys.push(...res.data)
        }
    }) ;
}

//行查询对应的打印历史
const hangselPrintHistory=(PK_ORDER_B:string)=>{
    const param={
        PK_ORDER_B: PK_ORDER_B         //采购订单明细主键
    }
    selPrintHistoryApi(param).then((res) => {
        if(res.state=='200'){
            showPrintHistorys.length = 0
            showPrintHistorys.push(...res.data)
        }
    }) ;
}

//根据供应商代码更改供应商信息
const setSupplier=(code)=>{
    const param={
        suppCode: code
    }
    getSupplierApi(param).then((res) => {
        if(res.state=='200'){
            if(res.data!=null){
                printSheet.SUPPCODE = res.data.code
                printSheet.SUPPNAME = res.data.name
                printSheet.SUPPSHORTNAME = res.data.shortname
            }else{
                printSheet.SUPPCODE = ""
                printSheet.SUPPNAME = ""
                printSheet.SUPPSHORTNAME = ""
            }
            
        }
    });
}

//初始化历史记录
const initselPrintHistory=(PK_ORDER_B:string)=>{
    const param={
        PK_ORDER_B: PK_ORDER_B         //采购订单明细主键
    }
    selPrintHistoryApi(param).then((res) => {
        if(res.state=='200'){
            showPrintHistorys.length = 0
            showPrintHistorys.push(...res.data)
        }
    }) ;
}

//对象初始化
const printSheetClear = () => {
  printSheet.PK_ORDER=''
  printSheet.PK_ORDER_B=''
  printSheet.SUPPMATERCODE=''
  printSheet.SUPPLOTNUM=''
  printSheet.VBILLCODE=''
  printSheet.MATERCODE=''
  printSheet.MATERNAME=''
  printSheet.MATERMATERIALSPEC=''
  printSheet.MATERMATERIALTYPE=''
  printSheet.PRODUCEDATE=null
  printSheet.NETWEIGHT=0.000
  printSheet.GROSSWEIGHT=0.000
  printSheet.NUM=0.00
  printSheet.PRINT=true
  LOTNUM.value = 0 
  PRINTQUANTITY.value = 0
}

//查询对应的打印订单
const getIfPrintSheets=()=>{
    showPrintHistorys.length = 0
    const param = {
        SUPPMATERCODE:selInfo.SUPPMATERCODE,//供应商料号
        VBILLCODE:selInfo.VBILLCODE,//订单号
        SUPPLOTNUM:selInfo.SUPPLOTNUM,//供应商批号
        COMPLETION:selInfo.COMPLETION,//是否完成
        STARTDATE:selInfo.STARTDATE,//起始日期
        ENDDATE:selInfo.ENDDATE//截止日期
    }
    //console.log(param)
    getIfPrintSheetsApi(param).then((res) => {
        if(res.state=='200'){  
            getPrintSheet.length=0
            getPrintSheet.push(...res.data)
            
            dialogQuery.value=false
        }else if(res.state=='500'){
            ElMessage.error(res.msg)
        }
    }) 
}

//管理员查询对应的打印订单
const getIfPrintSheetsByCode=(code)=>{
    const param = {
        SUPPCODE:code,//供应商代码
        SUPPMATERCODE:selInfo.SUPPMATERCODE,//供应商料号
        VBILLCODE:selInfo.VBILLCODE,//订单号
        SUPPLOTNUM:selInfo.SUPPLOTNUM,//供应商批号
        COMPLETION:selInfo.COMPLETION,//是否完成
        STARTDATE:selInfo.STARTDATE,//起始日期
        ENDDATE:selInfo.ENDDATE//截止日期
    }
    //console.log(param)
    getIfPrintSheetsByCodeApi(param).then((res) => {
        if(res.state=='200'){  
            getPrintSheet.length=0
            getPrintSheet.push(...res.data)
            
            dialogQuery.value=false
        }else if(res.state=='500'){
            ElMessage.error(res.msg)
        }
    }) 
}

//重打事件
const handleReprint=(row:ShowPrintHistory)=>{
    // PrintSheet.SUPPCODE=row.suppcode
    //console.log(row.lotnum)
    printSheet.SUPPMATERCODE=row.suppmatercode
    printSheet.SUPPLOTNUM=row.supplotnum
    printSheet.MATERNAME=row.matername
    printSheet.LOTNUM=row.lotnum
    printSheet.MATERMATERIALSPEC=row.matermaterialspec
    printSheet.MATERMATERIALTYPE=row.matermaterialtype
    printSheet.PRODUCEDATE=row.producedate
    printSheet.NETWEIGHT=row.netweight
    printSheet.GROSSWEIGHT=row.grossweight
    CreateOneFormPage2()
    

}
//选中的数据
let selectionPrint: ShowPrintHistory[]=reactive([])

//点击选框事件
const handleSelectionChange=(row:ShowPrintHistory)=>{
    selectionPrint=row
    
}

//打印托盘码
const addPallet=()=>{
    console.log(printSheet.PRODUCEDATE)
    for(var i:number=0;i<PRINTQUANTITY.value;i++){
                
                addPrintHistory()
            }
            printSheet.PALLET=""
            dialogPallet.value=false
}

//删除打印事件
const handleDelete=(row:ShowPrintHistory)=>{
    const param = {
        PK_ORDER_B: row.pk_ORDER_B,
        LOTNUM: row.lotnum
    }
    delPrintHistoryApi(param).then((res) => {
        if(res.state=='200'){
            hangselPrintHistory(row.pk_ORDER_B)
        }else if(res.state=='404'){
            ElMessage.error('物料列表为空')
        }
    }) 
}

//获取供应商名称下拉框
const supp=ref()

    const supplier=reactive({
      SUPPSHORTNAME:"",
      
      SUPPCODE:""
    })
    let SUPPCODES=['']
    //供应商名称更改时更新代码
    const  updatesupplier=()=>{
      supplier.SUPPSHORTNAME=supp.value.SUPPSHORTNAME
      SUPPCODES=['']
      SUPPCODES=supp.value.SUPPCODES
      supplier.SUPPCODE=SUPPCODES[0]
    }

    //重写右键事件
    let customContextMenu = ref();
    const openMenu = (e) => {
    let top = e.pageY;
    let left = e.pageX;
    let ele = customContextMenu.value;
    ele.style.top = top + 'px';
    ele.style.left = left + 'px';
    ele.style.display = 'block';
    };
    window.addEventListener('click', () => {
    let menuElement = customContextMenu.value;
    menuElement.style.display = 'none';
    });

    //打开托盘码窗口事件
    const PalletClick=()=>{
        
        
        if(selectionPrint.length>0){
            
            printSheet.SUPPMATERCODE=selectionPrint[0].suppmatercode
            printSheet.SUPPLOTNUM=selectionPrint[0].supplotnum
            printSheet.MATERNAME=selectionPrint[0].matername
            printSheet.PRODUCEDATE=format(new Date(),'yyyy/MM/dd')
            printSheet.MATERMATERIALSPEC=selectionPrint[0].matermaterialspec
            printSheet.MATERMATERIALTYPE=selectionPrint[0].matermaterialtype
            PRINTQUANTITY.value=1
            let NETWEIGHT=0.0
            let GROSSWEIGHT=0.0
            printSheet.PALLET="";
            for(var i=0;i<selectionPrint.length;i++){
                NETWEIGHT+= parseInt(selectionPrint[i].netweight)
                GROSSWEIGHT+= parseInt(selectionPrint[i].grossweight)
                printSheet.PALLET+=selectionPrint[i].lotnum+","
            }
            printSheet.NETWEIGHT=NETWEIGHT
            
            console.log(printSheet.PRODUCEDATE)
            printSheet.GROSSWEIGHT=GROSSWEIGHT
            getLotNum(printSheet.PK_ORDER_B)
            
            dialogPallet.value=true;
        }else{
            ElMessage.error('没有选中的数据')
        }   
    }
    //给托盘码添加的打印记录标识
    const tableRowClassName = ({
        row,
        }: {
            row: ShowPrintHistory
    }) => {
    
        if(row.pallet!=null&&row.pallet!=""){
            return 'warning-row'
        }else{
            return ""
        }
    }
</script>
<style lang="scss">
    
    
    #indexView{
        #word{
            .el-form-item{
                width: 360px;
                margin-right: 10px;
                margin-left: 10px;
                .el-form-item__label{
                    justify-content: flex-start;
                }
            }
        }
        #modify,#pallet{
            .el-form-item{
                width: 360px;
                margin-right: 10px;
                margin-left: 10px;
                .el-form-item__label{
                    justify-content: flex-start;
                }
            }
        }
        #query{
            .el-form-item{
                width: 350px;
                margin-right: 5px;
                margin-left: 5px;
                .el-form-item__label{
                    justify-content: flex-start;
                }
                .el-form-item__content{
                    min-width: 250px;
                    .el-input{
                        width:220px
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
        color: rgb(0, 17, 255);
        font-weight: bold;
        }
</style>