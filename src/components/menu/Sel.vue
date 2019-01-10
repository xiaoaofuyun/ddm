<template>
<div>
  <div class="addbox">
    <div class="addbox_div">
      <span><router-link to="/menu/Addo" >新增</router-link></span>
      <span><router-link to="/menu/update" >修改</router-link></span>
      <span class="on"><router-link to="/menu/sel" >删除</router-link></span>
    </div>
  </div>
  <div class="right_nav">


  </div>
  <div>


    <form action="">
      <table class="deltab"  cellspacing="0" border="1" style="border-collapse:collapse;" >
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
  /*background: url("../../assets/images/right_nav.png") repeat-x;*/
  height: 20px;
  width: 100%;
}
  table{
    width: 98%;
    margin: 0 auto;
  }
.deltab th{
  line-height: 40px;
  background-color: #f2f2f2;
}
.deltab td{
  line-height: 35px;
}

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
.addbox_div span.on a{
  color:#579fe9
}
</style>
