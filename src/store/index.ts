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
      SUPPSHORTNAME:"测试",       //供应商简称
      MATERNAME:"测试",           //物料名称
      SUPPMATERCODE:"测试",       //供应商料号
      PRODUCEDATE:"测试",           //生产日期
      VBILLCODE:"123456789012345",           //订单号
      SUPPLOTNUM:"测试",          //供应商批号
      LOTNUM:"测试",            //批号
      MATERMATERIALSPEC:"测试",   //物料规格
      MATERMATERIALTYPE:"测试",   //物料颜色
      NETWEIGHT:"测试",           //净重
      GROSSWEIGHT:"测试"         //毛重
    }
  },
  getters: {},
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
  },
  actions: {},
  modules: {},
});
