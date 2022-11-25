<template>
  <div id="material">
    <el-select v-model="props.printSheet" >
      测试
    <el-option
      v-for="item in materiels"
      :key="item.pk_ORDER_B"
      :label="item.matercode"
      :value="item.matercode"
    />
  </el-select>
  </div>
</template>
<script lang="ts" setup>
import { getMaterielsApi } from '@/api/getMateriels'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'

var materiels : Materiels[];

const props = defineProps({
  printSheet: Object
})

const emit = defineEmits(['update:printSheet'])

const handleClose = () => {
  emit('update:printSheet', props.printSheet)
}

interface Materiels{
  pk_ORDER: string,
  pk_ORDER_B: string,
  vbillcode: string,
  matercode: string,
  matername: string,
  matermaterialspec: string,
  matermaterialtype: string,
}[]

onMounted(() => {
  getMaterielsApi().then((res) => {
        if(res.state=='200'){
          materiels = res.data
          console.log(materiels)
        }else if(res.state=='404'){
            ElMessage.error('物料列表为空')
        }
    }) 
})

</script>

<style lang="scss">
 
</style>

