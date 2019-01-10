<template>
<div>
  <div class="addbox">
    <div class="addbox_div">
      <span class="on"><router-link to="/menu/Addo" >新增</router-link></span>
      <span><router-link to="/menu/update" >修改</router-link></span>

    </div>
  </div>

    <div class="addo_box">
        <h2 class="addo_title">{{msg}}</h2>
        <form>
            <br/>
            <h2 class="addo_box_h2">菜单名字：</h2><input type="text" value="" v-model="name" placeholder="请输入菜单名">
            <br/>
            <br/>
            <h2 class="addo_box_h2">菜单分类：</h2>
            <select name="pid" v-model="pid"  id="opt">
                <option selected="selected" value="0">顶级</option>
            </select>
            <br/>
            <br/>
            <button class="addo_box_but" @click="submitForm()">提交</button>
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
        name: "Addo",
      data(){
          return{
            name:'',
            pid:'',
            msg:'我是导航添加页面'
          }

      },mounted:function(){
        this.checkselect();
      },
      methods:{
          checkselect:function () {

               $('#opt').empty();
               // $('#opt').append('<option>顶级</option><option>123</option>');
            var _this=this;
            this.$axios.post(_this.global.repathurl+'api/menu/list',{},{
              headers:
                {

                  'Content-Type':'application/x-www-form-urlencoded',
                  "Authorization": 'Bearer'+' '+token,
                }
            }).then(function (res) {
               //console.log(res)
              _this.menuData = res.data;
              var arr = _this.menuData;
            //  console.log(arr);
              var treeArr = [];
              function tree( arr , pid , level){
                for (var i = 0; i < arr.length; i++) {
                  if( arr[i].pid == pid ){
                    arr[i].level = level;
                    treeArr.push(arr[i]);
                    tree( arr,arr[i].tree_menu_id,level+1 );
                  }
                }
              }
              tree( arr , 0 , 0);
             // console.log(treeArr);

              var tmpStr = "<option value='0' selected='selected'>顶级</option>";
              for (var i = 0; i < treeArr.length; i++) {

                var tm='';
                 for (var j = 0; j < treeArr[i].level; j++) {
                  tm += "--";
                }
                // document.write( tmpStr  + treeArr[i].city + "<br/>");
                tmpStr+="<option value="+treeArr[i].tree_menu_id+">"+tm+treeArr[i].name+"</option>";

              } $('#opt').append(tmpStr);
            }).catch(function (err) {
              console.log()
            })




          },submitForm:function () {
            console.log('1111111111');
          this.$axios.post(this.global.repathurl+'api/menu/index ',qs.stringify({
            name:this.name,
            pid:this.pid
          }),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            console.log(res);
            if(res.data.code=='1'){
              alert('添加成功');
            }else{
              alert('添加失败');
            }
          }).catch(function (err) {
            console.log(err)
          })

        }
      }
    }
</script>

<style scoped>

    .addbox{
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
    }
    .addbox_div{
        width: 100%;
        text-align: right;
        padding: 10px 0;
    }
    .addbox_div span{
        margin-right: 20px;
    }
    .addbox_div span a{
        font-size: 16px;
        color:#333;
        line-height: 40px;
        text-decoration: none;
    }
    .addbox_div span.on a{
        color:#579fe9
    }
    .addo_title{
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
        color:#333;
        line-height: 30px;
        text-align: left;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }

    .addo_box{
        width: 420px;
        margin: 20px auto;
        background-color: #f7f7f7;
        padding: 20px;
        box-sizing: border-box;
    }
    .addo_box_h2{
        font-size: 15px;
        color:#666;
        line-height: 30px;
        text-align: left;
    }
    .addo_box input{
        width: 100%;
        height: 40px;
        overflow: hidden;
        padding: 0 10px;
        box-sizing: border-box;
        border:1px solid #ccc;
        font-size: 14px;
        line-height: 40px;
    }
    .addo_box select{
        width: 100%;
        height: 40px;
        overflow: hidden;
        padding: 0 10px;
        box-sizing: border-box;
        border:1px solid #ccc;
        font-size: 14px;
        line-height: 40px;
    }
    .addo_box_but{
        width: 100%;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #579fe9;
        color:#fff;
        cursor: pointer;
    }
</style>
