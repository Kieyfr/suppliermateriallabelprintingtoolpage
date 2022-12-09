<template>
	
		<el-form-item label="供应商名称">
			<!-- 下拉框 -->
			<el-select v-model="form.value" style="width: 252px;" ref="valSelect" filterable @blur="valSelectBlur" @focus="valSelectFocus"
			 @change="valSelectChange">
				<el-option v-for="item in options" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<!-- 输入框 使用position: absolute;left: 0px;将输入框定位到下拉框上方 -->
			<el-input v-model="form.name" style="width: 220px;position: absolute;left: 0px;" @blur="valInputBlur()" ref="valInput"
			 @focus="valInputFocus" @change="valInputChange"></el-input>
		</el-form-item>
	
</template>

<script lang="ts" setup>
    import { adminGetSuppNamesApi } from '@/api/getSuppName'
    import { reactive ,ref,onMounted,watch,defineExpose,defineProps} from 'vue'
	let form=reactive({
		name: "",
		value: ''
	})
    let  options=['']
    let optionsAll=[]
    let supplierAll=[]
    
    // 输入框是否第一次获取焦点
    let inputOneFocus= true
				// 焦点是否在下拉框
	let	valSelectFocusVal= false
				// 焦点是否在输入框
	let	valInputFocusVal=false
    const valSelect=ref()
    const valInput=ref()
    const supplier={
        SUPPSHORTNAME:"",
        SUPPCODES:[]
    }
    defineExpose(supplier)
    const setsupplier=(name)=>{
		supplier.SUPPCODES=[]
		supplier.SUPPSHORTNAME=name
        for(var i=0;i<supplierAll.length;i++){
            if(supplierAll[i].name==name){
                 
                supplier.SUPPCODES.push(supplierAll[i].code);
                
            }
        }
    }
    const props = defineProps({
        updatesupplier: {
            type: Function,
            default: Function,
            required: true,
        }
        })
    watch(() => form.name, () => {
        
        var data = [];
				// 从全部中筛选和输入框匹配的下拉框
				for (var i = 0; i < optionsAll.length; i++) {
					if (optionsAll[i].indexOf(form.name) >= 0  ) {
                        
						data.push(optionsAll[i]);
					}
				}
				//将匹配的下拉项给下拉框
				options = data;
                valSelect.value.focus();
    })
    const valSelectChange=(val)=> {
		valSelectFocusVal = false;
		form.name = val;
        setsupplier(form.name)
        props.updatesupplier()
		//---其他操作---可以去后台查询相关数据
	}
    
	const valInputChange=()=>{
		setsupplier(form.name)
		props.updatesupplier()
	}
    

    const getSupps = () => {
        adminGetSuppNamesApi().then((res) => {
        if(res.state=='200'){
            supplierAll.length=0
            
            supplierAll=res.data
        }else if(res.state=='404'){
            ElMessage.error(res.msg)
        }
        Setoptionss()
        })
    }
    const Setoptionss = () => {
        optionsAll=[];
        for(var i=0;i<supplierAll.length;i++){
            optionsAll.push(supplierAll[i].name)
            
        }
    }
    onMounted(()=>{
        getSupps();
    })
    const valSelectFocus=()=> {
				valSelectFocusVal = true;
				//焦点给输入框
				valInput.value.focus();
			}
			//下拉框失去焦点
		const valSelectBlur=()=> {
				valSelectFocusVal = false;
			}
		
    //输入框失去焦点后
    const valInputBlur=()=>{
		console.log(options.length)
        valInputFocusVal = false;
				if (optionsAll.indexOf(form.name) >= 0) {
					setTimeout(() => {
						//100毫秒后 焦点不在输入框也不在下拉框时的操作
						if (valSelectFocusVal == false && valInputFocusVal == false) {
							//---其他操作---可以去后台查询相关数据
							inputOneFocus = true;
						}
					}, 100)
				}else{
					setTimeout(() => {
						//500毫秒后 焦点不在输入框也不在下拉框时的操作
						if (valSelectFocusVal == false && valInputFocusVal == false) {
							//---其他操作---可以去后台查询相关数据
							inputOneFocus = true;
						}
					}, 500)
				}
    }
    const valInputFocus=()=> {
				valInputFocusVal = true;
				form.value = form.name;
				//是否第一次获取焦点
				if(inputOneFocus){
					inputOneFocus = false;
					var data = [];
					// 从全部中筛选和输入框匹配的下拉框
					for (var i = 0; i < optionsAll.length; i++) {
						if (optionsAll[i].indexOf(form.name) >= 0 || form.name == 0) {
							data.push(optionsAll[i]);
						}
					}
					//将匹配的下拉项给下拉框
					options = data;
					//200毫秒后打开下拉框
					setTimeout(() => {
						//焦点给下拉框
						valSelect.value.focus();
					}, 200)
				}
			}
</script>