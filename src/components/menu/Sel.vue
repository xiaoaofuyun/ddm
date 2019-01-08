<template>
<div>
  <div style="height: 60px;wdith:100%;background-color: #cccccc">
    <div style="width:400px;float:right;line-height: 60px;text-align:center" >
      <span><router-link to="/menu/Addo" >新增</router-link></span>
      <span><router-link to="/menu/update" >修改</router-link></span>
      <span><router-link to="/menu/sel" >删除</router-link></span>
    </div>
  </div>
  <div class="right_nav">


  </div>
  <div>


    <form action="">
      <table  cellspacing="0" border="1" style="border-collapse:collapse;" >
        <th>ID</th>
        <th>导航名称</th>
        <th>ID</th>
        <th>ID</th>
        <th>ID</th>
        <th>ID</th>
        <th>ID</th>
        <th>操作</th>


        <tr>
          <td>1111</td>
          <td>1111</td>
          <td>1111</td>
          <td>1111</td>
          <td>1111</td>
          <td>1111</td>
          <td>1111</td>
          <td><a href="">修改</a> <a href="">删除</a> <a href="">更新</a> </td>
        </tr>
      </table>
    </form>
  </div>



</div>
</template>

<script>
    export default {
        name: "Sel"
    }
</script>

<style scoped>
.right_nav{
  background: url("../../assets/images/right_nav.png") repeat-x;
  height: 40px;
  width: 100%;
}
  table{
    width: 100%;

  }
</style>
