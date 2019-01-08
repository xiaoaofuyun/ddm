<template>
<div>

  <div style="height: 60px;wdith:100%;background-color: #cccccc">
    <div style="width:400px;float:right;line-height: 60px;text-align:center" >
      <span><router-link to="/menu/Addo" >新增</router-link></span>
      <span><router-link to="/menu/update" >修改</router-link></span>
      <span><router-link to="/menu/sel" >删除</router-link></span>
      </div>

  </div>
  <iframe src="http://localhost:8082/#/menu/Addo" frameborder="0" name="rightbot" style="height: 800px;width: 100%;border: 1px solid lightgrey"></iframe>
</div>
</template>

<script>
    export default {
        name: "Add",
        data(){
          return{
            msg:'aaaaaaaaaaaaaaaaaa'
          }
        }
    }
</script>

<style scoped>

</style>
