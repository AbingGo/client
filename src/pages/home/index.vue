<template>
    <div class="main flex flex-column">
        这是首页
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    components: {},
    data() {
        return {
            keyword: '',
            pagesize: 10,
            page: 1
        };
    },
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapActions([])
    },

    created() {}
};
</script>
<style scoped lang="scss">
</style>
