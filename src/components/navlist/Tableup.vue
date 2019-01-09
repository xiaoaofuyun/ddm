<template>
  <div class="tableaddbox">
    <form >
      <h2 class="tableaddbox_h2">数据表ID </h2><input type="text" v-model="menu_table_id"><br>
      <h2 class="tableaddbox_h2">菜单导航ID</h2> <input type="text" v-model="menu_id"><br>
      <h2 class="tableaddbox_h2">数据库表名称</h2> <input type="text" v-model="table_name"><br>
      <h2 class="tableaddbox_h2">前台显示表名称</h2> <input type="text" v-model="show_name"><br>
      <button class="tableaddbox_but" @click="submit()" >保存</button>
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
        menu_id:'',
        table_name:'',
        show_name:''

      }
    },
    methods:{
      submit:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/mtable/update',qs.stringify({
          menu_table_id:this.menu_table_id,
          menu_id:_this.menu_id,
          table_name:_this.table_name,
          show_name:_this.show_name
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
  .tableaddbox{
    width: 400px;
    margin: 20px auto;
    background-color: #f7f7f7;
    padding: 20px;
    box-sizing: border-box;
  }
  .tableaddbox_h2{
    font-size: 16px;
    line-height: 30px;
    color:#333;
    text-align: left;
  }
  .tableaddbox input{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
    border:1px solid #ccc;
    margin: 5px 0;
  }
  .tableaddbox_but{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #579fe9;
    color:#fff;
    font-size: 16px;
    text-align: center;
    border:1px solid #579fe9;
    margin-top: 10px;
    cursor: pointer;
  }
</style>
