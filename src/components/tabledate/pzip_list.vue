<template>
<div>
  <div class="cptop">

    <span> <router-link :to="{path:'/tabledate/index',query:{id:nid}}">新增</router-link></span>
    <span> <router-link :to="{path:'/tabledate/list',query:{id:nid}}">查看</router-link></span>
    <span> <router-link :to="{path:'/tabledate/update',query:{id:nid,cid:checksel}}">修改</router-link></span>
    <span> <router-link :to="{path:'/tabledate/del',query:{id:nid,cid:checksel}}">删除</router-link></span>
    <span> <router-link :to="{path:'/tabledate/imexcel',query:{id:nid,cid:checksel}}">导入imexcel</router-link></span>
    <span> <router-link :to="{path:'/tabledate/exexcel',query:{id:nid,cid:checksel}}">导出exexcel</router-link></span>
    <span> <router-link :to="{path:'/tabledate/upfile',query:{id:nid}}">上传文件</router-link></span>
    <span> <router-link :to="{path:'/tabledate/packzip',query:{id:nid}}">打包zip</router-link></span>
    <span> <router-link :to="{path:'/tabledate/pzip_list',query:{id:nid}}">打包Zip列表</router-link></span>
    <span> <router-link :to="{path:'/tabledate/pzip_down',query:{id:nid}}">下载Zip包</router-link></span>
  </div>
  <br>

  <form>


    <input type="button" value="打包zip列表" @click="submit">
  </form>
</div>


</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "pack_list",
    data(){
      return{
        nid:this.$route.query.id,
      }
    },
    methods:{
      submit:function () {
        var _this=this;

        this.$axios.post(_this.global.repathurl+'api/tabledate/pzip_list',qs.stringify({
          menu_table_id:_this.nid,
        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          console.log(res);



        })
      }
    }
  }
</script>

<style scoped>

</style>
