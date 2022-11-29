import { createStore } from "vuex";

export default createStore({
  state: {
    orders:[{
      
    }],
    order:{
      SHORTNAME: "123",
      MATERNAME: "",
      VBILLCODE: "",
      SUPPLOTNUM:""
    },
    queryCriteria:{
      MATERNAME:"",//物料名称
      SUPPMATERCODE:"",//供应商料号
      VBILLCODE:"",//订单号
      SUPPLOTNUM:"",//供应商批号
      STARTDATE:"",//起始日期
      CLOSINGDATE:""//截止日期
    },
    printInfo:{
      SUPPSHORTNAME:"",       //供应商简称
      MATERNAME:"",           //物料名称
      SUPPMATERCODE:"",       //供应商料号
      PRODUCEDATE:"",           //生产日期
      VBILLCODE:"",           //订单号
      SUPPLOTNUM:"",          //供应商批号
      LOTNUM:"",            //批号
      MATERMATERIALSPEC:"",   //物料规格
      MATERMATERIALTYPE:"",   //物料颜色
      NETWEIGHT:"2.3",           //净重
      GROSSWEIGHT:""         //毛重
    }
  },
  getters: {
    getPrintInfo: function (state) {
      return state.printInfo;
  }
  },
  mutations: {
    modOrders(state,value):void{
      state.orders=value
    },
    modOrder(state,value):void{
      state.order=value
    },
    modQueryCriteria(state,value):void{
      state.queryCriteria=value
    },
    modPrintInfo(state,value):void{
      state.printInfo=value
    },
  },
  actions: {},
  modules: {},
});
