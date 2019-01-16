<template>
<div>
  <div style="width: 100%;height: 50px ;border-bottom: 2px solid #579fe9">
  <div style="float: right;">
    <ul class="listul">
      <li>
        <router-link :to="{path:'/navlist/tableadd',query:{id:ids}}">新建表</router-link>
      </li>
      <li>
        <router-link :to="{path:'/navlist/tableup',query:{id:ids}}">修改</router-link>
      </li>
      <li>
        <router-link :to="{path:'/navlist/tabledel',query:{id:ids}}">删除</router-link>
      </li>
      <li>
        <router-link :to="{path:'/navlist/tablesel',query:{id:ids}}">查询</router-link>
      </li>
      <li>
        <router-link :to="{path:'/tfield/index',query:{id:ids}}">新建表字段</router-link>
      </li>
      <!--<li><router-link to="/tfield/del"   >删除表字段</router-link></li>-->
      <li>
        <router-link :to="{path:'/tfield/list',query:{id:ids}}">查看表字段</router-link>
      </li>
      <li>
        <router-link :to="{path:'/tfield/dtype',query:{id:ids}}">查询数据类型</router-link>
      </li>
    </ul>
  </div>
</div>

</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "del",
    data(){
      return{
        ids:this.$route.query.id,
      }
    },
    mounted:function(){
      this.deldo();
    },
    methods: {

      deldo:function () {
        var nid=this.$route.query.fid;
        console.log(nid);
        var that=this;
        // that.$router.push(that.global.pathurl)
        //console.log(2);
        that.$axios.post(that.global.repathurl+'api/tfield/del',qs.stringify({table_field_id:nid}),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('删除成功');
            //  that.$router.push(that.global.pathurl+'menu/update')
            window.location.href=that.global.pathurl+'tfield/list'
            //parent.parent.location.href=that.global.pathurl
            //location.reload();
          }else{
            alert('删除失败');
            //that.$router.push(that.global.pathurl+'menu/update')
            window.location.href=that.global.pathurl+'tfield/list'
          }
        })
      }
    }


  }
</script>

<style scoped>
  ul>li {
    float:left;
    margin:5px;
  }
  .listul a{
    text-decoration: none;
    color:#333;
    line-height: 40px;
  }
</style>
