<template>
  <div>
    <div class="cptop">

      <span> <router-link :to="{path:'/tabledate/index',query:{id:nid}}">新增</router-link></span>
      <span> <router-link :to="{path:'/tabledate/list',query:{id:nid}}">查看</router-link></span>
      <span> <router-link :to="{path:'/tabledate/update',query:{id:nid}}">修改</router-link></span>
      <span> <router-link :to="{path:'/tabledate/del',query:{id:nid}}">删除</router-link></span>


    </div>
    <br>
    <form>
      表编号ID：<input type="text" v-model="menu_table_id"  disabled><br/>
      <table  style="margin:0 auto;border-collapse:collapse;" border="1">




            <th>company_id</th>
            <th>file_hooking</th>
             <th v-for="item in mitems">
                           {{item.field_show}}

             </th>
           <th>操作</th>
          <tr >



                 <!--<td v-for="(v,i) in pitems">
                   <input type="text" v-model="pitems[i]">


                 </td>-->
                 <td v-for="(v,i) in piitems">
                    <span v-for="(vv,j) in v">
                      <input type="text" v-model="piitems[i][j]">
                    </span>

                 </td>




            <!--<td>{{pitems.company_id}}</td>-->

          </tr>
           <tr v-for="(v,kk,i) in pitems.data">

             <td v-for="(vv,key,j) in v">
               <!--{{key}}-->
             </td>
          <!--     <td><input type="text" v-model="v.company_id"></td>
              <td><input type="text" v-model="v.file_hooking"></td>
              <td v-for="(vv,j) in v.data">
               {{vv}}
               </td>-->
               <!--<td><input type="checkbox"></td>-->
           </tr>

        <!--{{pitems}}-->
      </table>

      <div><input type="button" value="提交" @click="submit"></div>

    </form>
    <!--{{nitems}}-->
    <!--{{pitems}}-->
<!--{{piitems}}-->
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
      this.csel();
      this.tablemenuid();

    },data(){
      return{
        company_id:'',
        items:'',
        nid:this.$route.query.id,
        menu_table_id:this.$route.query.id,
        data:[ ],
        sel:[],
        mitems:'',
        file_hooking:'',
        pitems:[],
        piitems:[],
        nitems:"",
      }
    },methods:{
      dellan:function(){

        for (let i = 0; i < this.sel.length; i++) {
          let val = this.sel;
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
        var jsons=that.pitems;
        //var c_id={"company":jsons.company_id};
      //  var f_h={"file_hooking":jsons.file_hooking};
      //  that.piitems.push(c_id);
     // that.piitems.push(f_h);
        var arrs=that.piitems;
        function replaceAll1(str)
        {
          if(str!=null)
            str = str.replace(/{/g,"");
          return str;
        }
        function replaceAll2(str)
        {
          if(str!=null)
            str = str.replace(/}/g,"");
          return str;
        }
        var str1=replaceAll1(JSON.stringify(arrs));
        var str2=replaceAll2(str1);
        var strs='['+str2.replace('[','{').replace(']','}')+']';
       // console.log(strs);
        // that.piitems.push(that.pitems);
       /*  var json=[{
           menu_table_id:41,
           data:[{"company_id":"","file_hooking":"","ss":"","aa":"","dd":"","cc":""}],
         }];*/

       var json={
         "menu_table_id":that.nid,
        "data": JSON.parse(strs),

       };
        /*"data":[
            {"ss":"111","aa":1,"dd":"333","cc":"44","file_hooking":"11","company_id":"9"}

          ]*/
     // var json=[{"company_id":"","file_hooking":"","ss":"","aa":"","dd":"","cc":""}];
        //console.log(json);
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

            //window.location.href=that.global.pathurl+'tfield/list?id='+that.ids;

          }else{
            alert('添加失败');

           // window.location.href=that.global.pathurl+'tfield/list?id='+that.ids;
          }
        }).catch(function (err) {
          console.log(err)
        })

      },
      tablemenuid:function(){
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/tfield/list',qs.stringify({

          menu_table_id:_this.nid,

        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.mitems=res.data;
        //  console.log(res.data);
          let arr=[];
          res.data.forEach(function(v,i){


           // arr[v.field_show]=[];
           // arr[v.field_show][i]="";
            arr.push(v.field_show);

          });
          var myMap = {};
          let kk=[];
          var arrStr="";
          var newmap=new Map();
          for(var i=0;i<arr.length;i++){
             var data={};
               data[arr[i]]="";
            // newmap.set(arr[i],'');
            kk.push(data);


          }
          var d1={};
          var d2={};
          d1['company_id']="";
          d2['file_hooking']="";
          kk.unshift(d2);
          kk.unshift(d1);
       //   newmap.set('company_id',"");
        //  newmap.set('file_hooking',"");
          var map2json=JSON.stringify(newmap);
        //  _this.nitems=newmap;
          //alert(map2json);
  //  console.log(map2json);
    // console.log(kk);


      /*_this.pitems={
        company_id:"",
        file_hooking:'',
        };*/
      _this.piitems=kk;
        })
      },

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
  th{
    width:10%
  }

</style>
