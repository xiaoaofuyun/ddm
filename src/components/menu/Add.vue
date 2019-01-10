<template>
<div>

  <div class="addbox">
    <div class="addbox_div">
      <span><router-link to="/menu/Addo" >新增</router-link></span>
      <span><router-link to="/menu/update" >修改</router-link></span>
      <span><router-link to="/menu/sel" >删除</router-link></span>
      </div>

  </div>
  <iframe src="http://localhost:8083/#/menu/Addo" frameborder="0" name="rightbot" style="height: 800px;width: 100%;border: 1px solid lightgrey"></iframe>
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

  .addbox{
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }
  .addbox_div{
    width: 100%;
    text-align: right;
    padding: 10px 0;
  }
  .addbox_div span{
    margin-right: 20px;
  }
  .addbox_div span a{
    font-size: 16px;
    color:#333;
    line-height: 40px;
    text-decoration: none;
  }
</style>
