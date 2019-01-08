<template>
  <div>111111{{menuData}}222222
    <template v-for="value in this.menuData">111111111111111
      <el-submenu index="value.id" v-if="value.node">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span slot="title">{{value.menu_name}}</span>
        </template>

      </el-submenu>
      <el-menu-item index="value.id" v-else>
        <i class="el-icon-message"></i>
        <span slot="title">{{value.menu_name}}</span>
      </el-menu-item>
    </template>
    <input class="easyui-combotree" data-options="url:'tree_data1.json',method:'get',required:true" style="width:200px;">


  </div>
</template>

<script>
  export default {

    name: 'MenuTree',
    props: ['menuData'],



  watch:{   // 使用监听的方式，监听数据的变化
    menuData(val){
      this.list = val;
    }
  }

  }
</script>

