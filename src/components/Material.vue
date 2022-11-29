<template>
  <div id="material">
    <el-popover placement="bottom" width="auto" :visible="visible" >
        <template #reference>
          <el-input v-model="props.printSheet.MATERCODE" placeholder="请选择" readonly @click="openPopover" />
        </template>
            <el-table :data="materiels" style="width: 100%" height="240px" @row-click="getMaterial" v-click-outside= "onClickOutside">
                <el-table-column prop="vbillcode" label="订单号" width="180" />
                <el-table-column prop="matercode" label="物料编码" width="180" />
                <el-table-column prop="matername" label="物料名称" width="150" />
                <el-table-column prop="matermaterialspec" label="物料规格" width="150" />
                <el-table-column prop="matermaterialtype" label="物料颜色" width="150"/>
            </el-table>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { getMaterielsApi } from '@/api/getMateriels'
import { ElMessage ,ClickOutside as vClickOutside} from 'element-plus'
import { onMounted ,ref} from 'vue'
import { Materiels } from '../types/index'
import { getLotNumApi } from '../api/getLotNum'

var visible = ref(false)

var materiels : Materiels[]=[];

const props = defineProps({
  printSheet: Object
})

const emit = defineEmits(['update:LOTNUM'])

const openPopover = () => {
  visible.value=true
}
const onClickOutside= () => {
  visible.value=false
}

const getMaterial = (row:Materiels) => {
  const param = {
    PK_ORDER_B:row.pk_ORDER_B
  }
  getLotNumApi(param).then((res) => {
      if(res.state=='200'){
          emit('update:LOTNUM', res.data)
      }else if(res.state=='500'){
          ElMessage.error('获取失败')
      }
  }) ;
  props.printSheet.PK_ORDER=row.pk_ORDER
  props.printSheet.PK_ORDER_B=row.pk_ORDER_B
  props.printSheet.VBILLCODE=row.vbillcode
  props.printSheet.MATERCODE=row.matercode
  props.printSheet.MATERNAME=row.matername
  props.printSheet.MATERMATERIALSPEC=row.matermaterialspec
  props.printSheet.MATERMATERIALTYPE=row.matermaterialtype
  props.printSheet.NUM=row.num
  visible.value=false
}

onMounted(() => {
  getMaterielsApi().then((res) => {
        if(res.state=='200'){
          materiels = res.data
        }else if(res.state=='404'){
            ElMessage.error('物料列表为空')
        }
    }) 
})

</script>

<style lang="scss">
 
</style>

