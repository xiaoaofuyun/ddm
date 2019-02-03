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
    <span> <router-link :to="{path:'/tabledate/file_hooking',query:{id:nid}}">批量挂载</router-link></span>
  </div>
  <br>
  <form>


    <input type="button" value="批量挂载" @click="submit">
  </form>
</div>


</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "file_hooking",
    data(){
      return{
        nid:this.$route.query.id,
      }
    },
    methods:{
      submit:function () {
        var _this=this;

        this.$axios.put(_this.global.repathurl+'api/tabledate/file_hooking',{
          "menu_table_id": 41,
          "field": ["ss","aa",'dd','cc']
        },{
          headers:
            {

              'Content-Type':'application/json',
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
