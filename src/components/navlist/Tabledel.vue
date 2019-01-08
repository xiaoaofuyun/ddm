<template>
  <div>
    <form >
      数据表ID <input type="text" v-model="menu_table_id">

      <button @click="submit()" >删除</button>
    </form></div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');

  export default {
    name: "Tableaup",
    data(){
      return{
        menu_table_id:'',


      }
    },
    methods:{
      submit:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/mtable/del',qs.stringify({
          menu_table_id:this.menu_table_id,

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
