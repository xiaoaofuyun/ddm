<template>
<div>
  <div class="cptop">

    <span> <router-link :to="{path:'/tabledate/index',query:{id:nid}}">新增</router-link></span>
    <span> <router-link :to="{path:'/tabledate/list',query:{id:nid}}">查看</router-link></span>
    <span> <router-link :to="{path:'/tabledate/update',query:{id:nid,cid:checksel}}">修改</router-link></span>
    <span> <router-link :to="{path:'/tabledate/del',query:{id:nid,cid:checksel}}">删除</router-link></span>
    <span> <router-link :to="{path:'/tabledate/imexcel',query:{id:nid,cid:checksel}}">导入imexcel</router-link></span>
    <span> <router-link :to="{path:'/tabledate/exexcel',query:{id:nid,cid:checksel}}">导出exexcel</router-link></span>
  </div>
  <br>
<div>
  <form>
    <input type="button" value="导出" @click="submit">


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
        name: "exexcel",
        data(){
            return{
                nid:this.$route.query.id,
                checksel:this.$route.query.cid,
            }

        },methods:{
          submit(){
            var _this=this;
            this.$axios.put(_this.global.repathurl+'api/tabledate/exexcel',{
              "menu_table_id":41,
              "where":[
                ["id","<>","15337"]
              ]

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
  .cptop{
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    text-align: right;
  }
</style>
