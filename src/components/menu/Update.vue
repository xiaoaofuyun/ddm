<template>
  <div>

    <div style="height: 60px;wdith:100%;background-color: #cccccc">
      <div style="width:400px;float:right;line-height: 60px;text-align:center" >
        <span><router-link to="/menu/Addo" >新增</router-link></span>
        <span><router-link to="/menu/update" >修改</router-link></span>
        <span><router-link to="/menu/sel" >删除</router-link></span>
      </div>
    </div>
    <div id="tab1" style="width: 500px;margin: 0 auto"></div>


  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "Update",
    data(){
      return{
        name:'',
        pid:'',
        msg:'',
        pathurl:this.global.pathurl
      }

    },mounted:function(){
      this.select();
    },
    methods:{
      select:function () {


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
          var fl='';
          var f2=[];
          function tree( arr , pid , level,f1){
            for (var i = 0; i < arr.length; i++) {
              if( arr[i].pid == pid ){
                arr[i].level = level;
                fl+=arr[i].tree_menu_id
               // console.log(arr[i].tree_menu_id+'###');
                f2.push(f1);

                arr[i].more=f2;
                treeArr.push(arr[i]);
                tree( arr,arr[i].tree_menu_id,level+1,f1 );
              }
            }
          }

          tree( arr , 0 , 0,0); //console.log(f2);
          //console.log(treeArr);
          //alert("before error.");
          var tmpStr = "<table border='1' cellpadding='0'  class=\"easyui-datagrid\" style='border-collapse:collapse;text-align: center;width: 500px'>" +
            "<th>编号ID</th><th>父级</th><th>导航名称</th><th>操作</th>";
          var tm='';
          for (var i = 0; i < treeArr.length; i++) {

            tm=treeArr[i].pid;
            for (var j = 0; j < treeArr[i].level; j++) {
              //tm += ">"+treeArr[j].pid;
            }
            // document.write( tmpStr  + treeArr[i].city + "<br/>");
            tmpStr+="<tr><td>"+treeArr[i].tree_menu_id+"</td>" +"<td>"+tm+"</td>"+
              " <td>"+treeArr[i].name+"</td><td>" +
              "<a href='"+_this.global.pathurl+"menu/updatedo?id="+treeArr[i].tree_menu_id+"'>编辑" +
              "</a>" +
              "" +"   "+
              "<a href='"+_this.global.pathurl+"menu/deldo?id="+treeArr[i].tree_menu_id+"'>删除</a></td></tr>";

          }
          tmpStr+='</table>';
          $('#tab1').append(tmpStr);
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
