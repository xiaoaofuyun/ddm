<template>
<div>
  <div class="cptop">

    <span> <router-link :to="{path:'/tabledate/index',query:{id:nid}}">新增</router-link></span>
    <span> <router-link :to="{path:'/tabledate/list',query:{id:nid}}">查看</router-link></span>
    <span> <router-link :to="{path:'/tabledate/update',query:{id:nid}}">修改</router-link></span>
    <span> <router-link :to="{path:'/tabledate/del',query:{id:nid}}">删除</router-link></span>


  </div>
  <br>


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
            nid:this.$route.query.id,
            items:"",
            cid:[],
            tid:[],
          }

      },mounted:function () {
        this.del();
      }
      ,methods:{
          del:function () {
            var _this=this;
            _this.cid.push(_this.$route.query.cid);
            var narr=_this.cid;

            function count(o){
              var t = typeof o;

              if(t == 'string'){
                return o.length;

              }else if(t == 'object'){

                var n = 0;

                for(var i in o){

                  n++;

                }

                return n;
              }
              return false;

            }

             var drr=[];
            _this.cid.forEach(function (v,i) {
                v.forEach(function (vv,ii) {
                  _this.$axios.post(_this.global.repathurl+'api/tabledate/del',qs.stringify({

                    menu_table_id:_this.nid,
                    id:vv,

                  }),{
                    headers:
                      {

                        'Content-Type':'application/x-www-form-urlencoded',
                        "Authorization": 'Bearer'+' '+token,
                      }
                  }).then(function (res) {
                     drr.push(res.data.code);
                    if(res.data.code==1){
                      alert('删除成功');
                    }

                  });

                })
            });


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
