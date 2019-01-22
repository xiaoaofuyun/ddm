<template>
<div>
  <div class="cptop">

    <span> <router-link :to="{path:'/tabledate/index',query:{id:nid}}">新增</router-link></span>





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
    name: "list",
    mounted:function () {
      this.csel()
    },data(){
      return{
        company_id:'',
        items:'',
        nid:this.$route.query.id,
      }
    },methods:{
      csel:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/btns/list',qs.stringify({



        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.items=res.data.result;
          //console.log(res);

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
