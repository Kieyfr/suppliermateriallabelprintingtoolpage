<template>
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
      style="width: 850px" 
      height="240px" 
      highlight-current-row
      @row-click="selPrintHistory"
      @row-dblclick="openModify">  
        <el-table-column type="index" width="50" />
        <el-table-column prop="suppshortname" sortable label="供应商简称" width="200"/>
        <el-table-column prop="matername" sortable label="物料名称" width="200" />
        <el-table-column prop="vbillcode" sortable label="订单号" width="200"/>
        <el-table-column prop="supplotnum" sortable label="商厂批号" width="200"/>
      </el-table>
    </div>
    <div id="record">
        <el-table
            :data="showPrintHistorys"
            highlight-current-row
            style="width: 1240px;font-size:12px"
            height="280px"
            >
            <el-table-column type="index" width="50" />
            <el-table-column property="matername" sortable label="物料名称" show-overflow-tooltip width="110"/>
            <el-table-column property="suppmatercode" sortable label="供应商料号" show-overflow-tooltip width="120"/>
            <el-table-column property="producedate" sortable label="生产日期" show-overflow-tooltip width="110"/>
            <el-table-column property="lotnum" sortable label="批号" show-overflow-tooltip width="110"/>
            <el-table-column property="netweight" sortable label="净重" show-overflow-tooltip width="80"/>
            <el-table-column property="grossweight" sortable label="毛重" show-overflow-tooltip width="80"/>
            <el-table-column property="supplotnum" sortable label="供应商批号" show-overflow-tooltip width="120"/>
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
                                    <el-button :icon="Search" @click="searchMateriels"/>
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
                    />
                </el-form-item>
                <el-form-item label="打印日期" >
                    <el-date-picker
                        v-model="PRINTDATE"
                        type="date"
                        format="YYYY/MM/DD"
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
                        <el-button type="primary" @click="getIfPrintSheets" >查询</el-button>
                        <el-button @click="dialogQuery=false">返回</el-button>
            </el-form>
        </el-dialog>
    </div>
  </div>
  <Print ref="printRef" class="print"></Print>
</template>
<style>
    .print{
        display: none;
    }
</style>
<script lang="ts" setup>
import { reactive , ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { GetPrintSheet,Materiels ,ShowPrintHistory} from '../types/index'
import { ElMessage ,ClickOutside as vClickOutside} from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getSuppUserApi } from '../api/getSuppUser'
import { addPrintSheetApi } from '../api/addPrintSheet'
import { addPrintHistoryApi } from '../api/addPrintHistory'
import { getMaterielsApi } from '@/api/getMateriels'
import { getLotNumApi } from '../api/getLotNum'
import { getPrintSheetsApi } from '../api/getPrintSheets'
import { selPrintHistoryApi } from '../api/selPrintHistory'
import { getIfPrintSheetsApi } from '../api/getIfPrintSheets'
import { selPrintHistoryNumApi } from '../api/selPrintHistoryNum'
import { searchMaterielsApi } from '../api/searchMateriels'
import { delPrintHistoryApi } from '../api/delPrintHistory'


import {GetPrintWorld,ToAbsoluteURL} from "../assets/PrintWorld.js"


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
        
        json.data = printInfo
        if (!printworld.Act(json)) {                    //数据发送失败
            alert(printworld.GetLastError());
        }
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

const search = ref('') //修改窗口是否显示

var visible = ref(false)    //气泡表格是否显示

let LOTNUM = ref(0) //批号
const PRINTQUANTITY = ref(1)//打印数量
const PRINTDATE = ref(new Date)//打印日期

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
    PRINT:true             //是否可以打印
})

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
            getPrintSheets()
            getMateriels()
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
      PRODUCEDATE: printSheet.PRODUCEDATE,            //生产日期
      NETWEIGHT: printSheet.NETWEIGHT,         //净重
      GROSSWEIGHT: printSheet.GROSSWEIGHT,            //毛重
      SUPPLOTNUM: printSheet.SUPPLOTNUM,         //供应商批号
      PRINTDATE: PRINTDATE.value,            //打印日期
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

//查询物料列表
const searchMateriels = () => {
    const param = {
        search: search.value
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

onMounted(()=>{
    getSuppUser();
    getMateriels();
    getPrintSheets();
})

//双击打开修改页面
const openModify=(row:GetPrintSheet)=>{
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
    console.log(row.matercode)
    printSheet.VBILLCODE=row.vbillcode
    printSheet.MATERCODE=row.matercode
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
    const param = {
        SUPPMATERCODE:selInfo.SUPPMATERCODE,//供应商料号
        VBILLCODE:selInfo.VBILLCODE,//订单号
        SUPPLOTNUM:selInfo.SUPPLOTNUM,//供应商批号
        COMPLETION:selInfo.COMPLETION,//是否完成
        STARTDATE:selInfo.STARTDATE,//起始日期
        ENDDATE:selInfo.ENDDATE//截止日期
    }
    console.log(param)
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

const handleReprint=(row:ShowPrintHistory)=>{
    // PrintSheet.SUPPCODE=row.suppcode
    console.log(row.lotnum)
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
    #modify{
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
</style>