<template>
  <el-container>
    <el-header>
      <h1 style="margin:0 20px; float:left; line-height:60px">五笔练习</h1>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
          <el-submenu index="0" v-if="windowWidth < 740">
            <template slot="title"><i style="color:#fff" class="el-icon-s-unfold"></i></template>
            <el-menu-item index="1">字根练习</el-menu-item>
            <el-menu-item index="2">一级简码</el-menu-item>
            <el-menu-item index="3">二级简码</el-menu-item>
            <el-menu-item index="4" ><i style="color:#F56C6C;" class="el-icon-document"></i><a href="https://wubi.yantuz.cn" style="color:#F56C6C; text-decoration: none;" target="_blank"><b>五笔7天速成</b></a></el-menu-item>
          </el-submenu>
          <template v-else>
            <el-menu-item index="1">字根练习</el-menu-item>
            <el-menu-item index="2">一级简码</el-menu-item>
            <el-menu-item index="3">二级简码</el-menu-item>
            <el-menu-item index="4" ><i style="color:#F56C6C;" class="el-icon-document"></i><a href="https://wubi.yantuz.cn" style="color:#F56C6C; text-decoration: none;" target="_blank"><b>五笔7天速成</b></a></el-menu-item>
          </template>
        </el-menu>
        <el-dropdown class="wubi-version-dropdown" @command="toggleVersion">
          <span class="dropdown-text">
            {{ wubiVersion }} 版本<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="86">86 版本</el-dropdown-item>
            <el-dropdown-item command="98">98 版本</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    <el-main>
      <el-row>
        <el-col :xs="24" :sm="{span:20, offset: 2}" :md="{span: 18, offset: 3}" :xl="{span: 12, offset: 6}" >
          <Game :gameModel="gameModel" :wubiVersion="wubiVersion" />
        </el-col>
      </el-row>
    </el-main>
    <el-footer style="text-align:center">&copy; {{new Date().getFullYear()}} <a href="https://yantuz.cn/">岩兔站</a></el-footer>
  </el-container>
</template>


<script>
import Game from './components/Game.vue'

export default {
  name: 'App',
  data() {
      return {
        activeIndex: '1',
        gameModel: 'zigen',
        wubiVersion: '86',
        windowWidth: 740,
      };
    },
  components: {
    Game
  },
    methods: {
      handleSelect(key) {
        //console.log(key);
        switch(key){
          case "1":
            this.gameModel = "zigen";
            break;
          case "2":
            this.gameModel = "yiji";
            break;
          case "3":
            this.gameModel = "erji";
            break;
        }
      },
      toggleVersion(command) {
        this.wubiVersion = command;
      },
    },
    mounted() {
      window.onresize = () => {
        return (() => {
          this.windowWidth = document.body.clientWidth;
        })();
      };

      this.windowWidth = document.body.clientWidth;
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body{margin:0; padding: 0;}
.el-divider{
  margin-top:0;
}
.el-header{
  display: flex;
  justify-content: space-around;
  background: #545c64;
  height: 80px;
  padding: 0 40px;
  color: #fff;
}
.el-menu-demo{float: left;}
.wubi-version-dropdown {
  float: right;
  line-height: 60px;
}
.dropdown-text {
  color: #fff;
  cursor: pointer;
}
.dropdown-text:hover {
  color: #66b1ff;
  transition: .2s;
}
</style>
