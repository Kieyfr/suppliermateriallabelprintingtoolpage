<template>
    <div id="print">
        
        <div id="printArea">
            <table id="printtable">
                <tr>
                    <td style="width:1.8cm">供应商简称</td>
                    <td colspan="2" >{{printInfo.SUPPSHORTNAME}}</td>
                    <td rowspan="3" style="padding: 0;">
                            <vue-qr :text=printInfo.VBILLCODE  size="70"></vue-qr> 
                    </td>
                </tr>
                <tr>
                    <td>物料名称</td>
                    <td colspan="2">{{printInfo.SUPPSHORTNAME}}</td>
                </tr>
                <tr>
                    <td>供应商料号</td>
                    <td colspan="2">{{printInfo.SUPPMATERCODE}}</td>
                </tr>
                <tr>
                    <td>生产日期</td>
                    <td style="width:4cm">{{printInfo.PRODUCEDATE}}</td>
                    <td >订单号</td>
                    <td >{{printInfo.VBILLCODE}}</td>
                </tr>
                <tr>
                    <td>供应商批号</td>
                    <td style="width:4cm">{{printInfo.SUPPSHORTNAME}}</td>
                    <td>胶距</td>
                    <td>{{printInfo.MATERMATERIALSPEC}}</td>
                </tr>
                <tr>
                    <td>批号</td>
                    <td colspan="2">{{printInfo.LOTNUM}}</td>
                    <td></td>
                </tr>
                <tr >
                    <td>净重</td>
                    <td style="width:4cm">{{printInfo.NETWEIGHT}}</td>
                    <td>毛重</td>
                    <td>{{printInfo.GROSSWEIGHT}}<span class="unit">KG</span></td>
                </tr>
            </table>
            
            </div>
        </div>
</template>

<script lang="ts" setup>
    import Print from 'print-js'
    import VueQr from 'vue-qr/src/packages/vue-qr.vue'
    import {useStore,mapState} from 'vuex'
    

    const outputPrint=()=> {
            Print({
                printable: 'printtable',
                type: 'html',
                targetStyles: ['*'],
                onPrintDialogClose:printEnd
            })
            
        }
        
        defineExpose({
	        outputPrint
        })
    

    //打印结束事件
    const printEnd=()=>{
        
        
        console.log("打印成功")
        console.log("打印成功了")
    }
    

    //获取公用数据
    
    const store = useStore()
    const state = store.state
    let printInfo=store.state.printInfo
    

   

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
                    font-size: 12px;
                    
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
    @media print{
        @page {
            
        }
       
    }
</style>