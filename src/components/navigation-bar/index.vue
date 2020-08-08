<template>
    <div class="nav flex flex-space-between">
        <div class="nav-left flex">
            <a href="/" class="logo-a">
                {{ title }}
            </a>
            <router-link to="/manage">首页</router-link>
        </div>
        <div class="operate">
            <span v-if="userInfo"
                class="avatar"><img :src="avatar" />
            </span>
            <span v-if="userInfo"
                class="operate-button-text username">{{ userInfo }}
            </span>
            <span v-if="!userInfo"
                class="operate-button-text login"
                @click="handleLogin">登录
            </span>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            avatarBaseUrl: 'http://xxxxxxx.com/avatars',
            upgradeValue: false
        };
    },
    computed: {
        userInfo() {
            return Cookies.get('EngName');
        },
        avatar() {
            return `${this.avatarBaseUrl}/${this.userInfo}/profile.jpg`;
        },
        title() {
            return this.ENV[process.env.NODE_ENV].title;
        }
    },
    methods: {
        ...mapActions([]),
        handleLogin() {
            window.eventHub.$emit('login');
        }
    }
};
</script>
<style scoped lang="scss">
.nav {
    height: 100%;
    background: $headerBgColor;
    .logo-a {
        margin-right: 5%;
    }
    .nav-left {
        width: 1180px;
        img {
            vertical-align: middle;
        }
    }
    a {
        font-family: "PingFangHK-Light";
        color: #ffffff;
        font-size: 16px;
        text-decoration: none;
        text-align: center;
        padding: 0 30px;
    }
    .logo-a {
        padding: 0 85px 0 0px;
    }
    .vertical-line::after {
        padding: 0 30px;
        font-size: 21px;
        font-family: "PingFangHK-Light";
    }
    .is-active {
        font-family: "PingFangHK-Medium";
        color: $themColor;
    }
    .operate {
        color: #ffffff;
        .avatar img {
            margin-right: 5px;
            width: 36px;
            height: 36px;
            overflow: hidden;
            border-radius: 50%;
            vertical-align: middle;
        }
        .vertical-line::after {
            color: #ffffff;
            padding: 0 6px;
            font-size: $fontSize;
        }
        .username {
            cursor: auto;
        }
        .username:hover {
            color: #ffffff;
        }
        .login {
            display: inline-block;
            height: 34px;
            line-height: 34px;
        }
        .login:hover {
            color: $themColor;
        }
    }
}
.nav.spe-nav {
    .is-active {
        color: #ffffff;
    }
}
</style>
