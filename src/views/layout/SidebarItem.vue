<template>
    <div>
        <!--展开折叠开关-->
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <template v-for="(item, index) in routes">
        <li :id="'nav'+index">
    <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path"  >
        <el-menu-item :index="item.path+'/'+item.children[0].path" >
           <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
        </el-menu-item>
    </router-link>
            </li>
    <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
            <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
            <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
            <router-link v-else class="menu-indent" :to="item.path+'/'+child.path" >
                <el-menu-item :index="item.path+'/'+child.path" >
                    <wscn-icon-svg v-if='child.icon' :icon-class="child.icon" />
                   {{child.name}}
                </el-menu-item>
            </router-link>
        </template>
    </el-submenu>
</template>
    </div>
</template>

<script>
import Hamburger from 'components/Hamburger';
export default {
    components: {
        Hamburger,
      },
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        }
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar;
        }
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .hamburger{
        color: #fff;
    }
    .wscn-icon {
        margin-right: 10px;
    }

    .hideSidebar .menu-indent {
        display: block;
    }
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull{
             position: absolute;
             right: 90px;
             top: 16px;
             color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top:5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>


<style>
.hamburger-container {
            padding: 13px 0;
        }
.el-menu--dark {
    background: #339abb!important;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
    background: #2486c5;
    color: #fff!important;
}

.el-menu--dark .el-menu-item:hover,
.el-menu--dark .el-submenu__title:hover {
    background-color: #27829f!important;
}

.el-menu--dark .el-menu-item,
.el-menu--dark .el-submenu__title {
    color: #bae8f1!important;
}

.el-menu-item,
.el-submenu__title {
    height: 60px;
    line-height: 60px;
}

.el-menu--dark .el-submenu .el-menu {
    background-color: #14627e!important;
}

.el-menu--dark .el-submenu .el-menu .el-menu-item:hover {
    background-color: #177394!important;
}

.menu-toggle {
    background: #4a5064;
    color: white;
    height: 26px;
    line-height: 30px;
    text-align: center
}
.el-submenu .el-menu-item{height:50px;line-height:50px;padding:0 20px!important;}
</style>
