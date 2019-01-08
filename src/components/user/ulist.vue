<template>
<div>
  <div>
    <span> <router-link to="/user/create">新增用户</router-link></span>
    <span> <router-link to="/user/repwd">修改密码</router-link></span>
    <span> <router-link to="/department/ulist">用户列表</router-link></span>
    <span><router-link to="/department/udlist">部门用户列表</router-link></span>
    <!--  <span><router-link to="/company/update">修改单位</router-link></span>
      <span><router-link to="/company/del">删除单位</router-link></span>-->
  </div>
  <br>



</div>
</template>

<script>
    export default {
        name: "ulist"
    }
</script>

<style scoped>

</style>
