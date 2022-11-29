<template>
    <div id="print">
        
        <div id="printArea">
            <table id="printtable"  >
                <tr>
                    <td style="width:1.6cm">供应商简称</td>
                    <td colspan="2" >{{printInfo.SUPPSHORTNAME}}</td>
                    <td rowspan="3" style="padding: 0;">
                            <vue-qr :text=printInfo.VBILLCODE  size="72"></vue-qr>
                            
                    </td>
                </tr>
                <tr>
                    <td>物料名称</td>
                    <td colspan="2">{{printInfo.MATERNAME}}</td>
                </tr>
                <tr>
                    <td>供应商料号</td>
                    <td colspan="2">{{printInfo.SUPPMATERCODE}}</td>
                </tr>
                <tr>
                    <td>生产日期</td>
                    <td style="width:4cm">{{dateFormat(printInfo.PRODUCEDATE)}}</td>
                    <td >订单号</td>
                    <td :key="printInfo.VBILLCODE">{{printInfo.VBILLCODE}}</td>
                </tr>
                <tr>
                    <td>供应商批号</td>
                    <td style="width:4cm">{{printInfo.SUPPLOTNUM}}</td>
                    <td>绞距</td>
                    <td>{{printInfo.MATERMATERIALSPEC}}</td>
                </tr>
                <tr>
                    <td>批号</td>
                    <td colspan="2">{{printInfo.LOTNUM}}</td>
                    <td></td>
                </tr>
                <tr >
                    <td>净重</td>
                    <td>{{printInfo.NETWEIGHT}}<span class="unit">KG</span></td>
                    <td>毛重</td>
                     <td><span >{{printInfo.GROSSWEIGHT}}</span><span class="unit">KG</span></td> 
                    
                </tr>
            </table>
            </div>
            
        </div>
</template>

<script lang="ts" setup>
    import Print from 'print-js'
    import VueQr from 'vue-qr/src/packages/vue-qr.vue'
    import {useStore,mapState} from 'vuex'
    import {ref,reactive,getCurrentInstance} from 'vue'
    import { formatDate } from '@vueuse/shared';
    
    

    //获取公用数据
    const store = useStore()
    const state = store.state

    let  printInfo=reactive(state.printInfo)
    
    const updatePrintInfo=()=>{
        printInfo=state.printInfo
        
        internalInstance.ctx.$forceUpdate()
        console.log("更新页面"+printInfo.NETWEIGHT)

        outputPrint()
    }

    const outputPrint=()=> {
        
       
        console.log("打印")
        Print({
                printable: 'printtable',
                type: 'html',
                targetStyles: ['*'],
                onPrintDialogClose:printEnd
            })
            
        }
        
         
      const CreateOneFormPage=()=> {
            updatePrintInfo()

          setTimeout(()=>{
            outputPrint()
          },0)
        }
        
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
        

    //打印结束事件
    const printEnd=()=>{
        
        
        console.log("打印成功")
        console.log("打印成功了")
    }
    
    const internalInstance=getCurrentInstance();
    
    
    
    
    defineExpose({
	        
            CreateOneFormPage
        })
    
    

   

</script>
<style lang="scss">

#print{
    margin: 0 auto;
    
    
    #printArea{
        width: 10.6cm;
        
        padding: 0;
        
        margin-top: 0;
        table,tr，td{
            border-collapse:collapse
            
        }
        table{
            // table-layout: fixed;
            width: 10.4cm;
            
            border: 2px black solid;
            padding: 0%;
            tr{
                padding: 0%;
                td{
                    
                    border: 1px black solid;
                    font-size: 10px;
                    
                    img{
                        
                        padding: 1px;
                    }
                    .unit{
                        font-weight: bold;
                        text-align: right;
                    }
                }
            }
        }
    }
    }
    
        @page {
            size:10.6cm 4.6cm;
        }
</style>