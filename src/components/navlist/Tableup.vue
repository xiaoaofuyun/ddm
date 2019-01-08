<template>
  <div>
    <form >
      数据表ID <input type="text" v-model="menu_table_id"><br>
      菜单导航ID <input type="text" v-model="menu_id"><br>
      数据库表名称 <input type="text" v-model="table_name"><br>
      前台显示表名称 <input type="text" v-model="show_name"><br>
      <button @click="submit()" >保存</button>
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

</style>
