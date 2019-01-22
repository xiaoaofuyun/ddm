<template>
  <div>
    <div class="cptop">

      <span> <router-link :to="{path:'/tabledate/index',query:{id:nid}}">新增</router-link></span>





    </div>
    <br>
    <form>
      <table  style="margin:0 auto;border-collapse:collapse;" border="1"><tr><td colspan="5">
               <a href="#" @click="addlan">添加栏位</a> <a href="#" @click="dellan">删除栏位</a></td></tr>
              <tr><td>表编号ID</td><td colspan="4"><input type="text" v-model="menu_table_id"  disabled></td></tr>

              <tr v-for="(v,i) in data"><td>名字</td> <td><input type="text" v-model="data[i].name" ></td>
                    <td>性别  </td>
                     <td>
                       <select v-model="data[i].sex">
                         <option value="1">男</option>
                         <option value="2">女</option>
                       </select>
                     </td>
                    <td><input type="checkbox" v-model="sel" :value="i"></td>
              </tr>

             <tr><td colspan="5"><input type="button" value="提交" @click="submit"></td></tr>
      </table>
    </form>

  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "index",
    mounted:function () {
      this.csel()
    },data(){
      return{
        company_id:'',
        items:'',
        nid:this.$route.query.id,
        menu_table_id:this.$route.query.id,
        data:[{
          name:'',
          sex:'',}
        ],
        sel:[],
      }
    },methods:{
      dellan:function(){

        for (let i = 0; i < this.sel.length; i++) {
          let val = this.sel
          val.forEach((val, index) => {
            //console.log(val);
            this.data.splice(val, 1);


          })
        }
        this.sel=[];
        },
      addlan:function(){

           let arr={name:'',sex:''};
          this.data.push(arr);

      },
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
         // console.log(res);

        })
      },submit:function () {
        var that=this;


         var json={
           menu_table_id:that.nid,
           data:that.data,
         }
        this.$axios.put(that.global.repathurl+'api/tabledate/index ',json,{
          headers:
            {

              'Content-Type':'application/json',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {

          //console.log(res);
          if(res.data.code=='1'){
            alert('添加成功');

            window.location.href=that.global.pathurl+'tfield/list?id='+that.ids;

          }else{
            alert('添加失败');

            window.location.href=that.global.pathurl+'tfield/list?id='+that.ids;
          }
        }).catch(function (err) {
          console.log(err)
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
