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
