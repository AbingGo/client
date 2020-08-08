<template>
<div id="app" class="flex flex-column">
    <!-- 顶部导航栏部分 -->
    <div class="doc-hd">
        <navigation-bar class="navigation-bar"></navigation-bar>
    </div>

    <!-- 路由切换部分 -->
    <div class="doc-bd flex">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import Cookies from 'js-cookie';

/**
 * 需要在现有element的基础上，进行样式的覆盖改造
 */
import '@/assets/css/el-reset/index.scss';
import '@/assets/css/commons/reset.scss';
import '@/assets/css/commons/style.scss';

import NavigationBar from '@/components/navigation-bar';
import * as serviceManage from '@/service/manage';

export default {
    name: 'App',
    components: {
        NavigationBar
    },
    data() {
        return {};
    },
    computed: {
        isNoManage() {
            return this.$route.name !== 'Manage';
        }
    },
    methods: {

        /**
         * 全局事件eventHub 监听
         */
        listen() {},
        async init() {
            const res = await serviceManage.getUserInfo();
            const { EngName = '' } = res;
            Cookies.set('EngName', EngName);
            Cookies.set('PAS_COOKIE_USER', EngName);
        }
    },
    created() {
        this.listen();
        this.init();
    }
};
</script>

<style lang="scss">
#app {
    align-items: center;
}
.app-height {
    height: 100%;
}
.is-check {
    .qrcode-canvas,
    .code-title,
    .pc-button,
    .iframe-wrapper {
        filter: blur(15px);
    }
    .aside,
    .doc-hd {
        filter: blur(2px);
    }
}
.is-lock {
    .qrcode-canvas,
    .code-title,
    .pc-button,
    .iframe-wrapper {
        filter: blur(15px);
    }
}
.doc-hd {
    width: 100%;
    height: 70px;
    background: $headerBgColor;
}
.doc-hd .navigation-bar {
    margin: 0 auto;
    padding: 0 60px;
}
.doc-bd {
    width: 100%;
    flex: 1;
    overflow-y: hidden;
    overflow-x: scroll;
}
</style>
