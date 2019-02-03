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
</div>
  <br>
  <div>

    <form>


      <input type="file"><input type="button" value="上传" @click="submit">
    </form>
  </div>

</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "upfile",
       data(){
          return{
            nid:this.$route.query.id,
            checksel:this.$route.query.cid,
          }
       },
      methods:{
              submit:function () {
                var _this=this;
                var formData = new FormData();
                formData.append("file", document.querySelector('input[type=file]').files[0]);
                formData.append("menu_table_id", _this.nid);
                this.$axios.post(_this.global.repathurl+'api/tabledate/upfile',formData,{
                  headers:
                    {

                      'Content-Type':'multipart/form-data',
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
  .cptop{
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    text-align: right;
  }
</style>
