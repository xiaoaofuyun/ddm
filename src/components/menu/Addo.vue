<template>
<div>
  <div style="height: 60px;wdith:100%;background-color: #cccccc">
    <div style="width:400px;float:right;line-height: 60px;text-align:center" >
      <span><router-link to="/menu/Addo" >新增</router-link></span>
      <span><router-link to="/menu/update" >修改</router-link></span>
      <span><router-link to="/menu/sel" >删除</router-link></span>
    </div>
  </div>
  {{msg}}

  <form>
    <br/>
    菜单名字：<input
      type="text"
      value=""
      v-model="name"
      placeholder="请输入菜单名">
     <br/>
    <br/>
   菜单分类：
    <select name="pid" v-model="pid" style="width: 150px" id="opt">
    <option selected="selected" value="0">顶级</option>

  </select>



   <br/>
    <br/>
    <button style="width: 70px;height: 30px;"
      @click="submitForm()">提交</button>

  </form>
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

</style>
