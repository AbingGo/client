<template>
    <div class="table-content">
        <el-table
            :data="tableData"
            border
            stripe>
            <el-table-column
                prop="id"
                label="活动ID"
                width="130">
            </el-table-column>
            <el-table-column
                prop="name"
                label="活动名称">
            </el-table-column>

            <el-table-column
                label="操作记录"
                width="240">
                <template slot-scope="scope">
                    <div class="reset-lineheight-edit">
                        编辑：{{ scope.row.editor }}
                    </div>
                    <div class="reset-lineheight-edit">
                        时间：{{ scope.row.editTime }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="活动时间"
                width="240">
                <template slot-scope="scope">
                    <div class="reset-lineheight">
                        开始：{{ scope.row.begin }}
                    </div>
                    <div class="reset-lineheight">
                        结束：{{ scope.row.end }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="game"
                label="所属游戏"
                width="200">
                <template slot-scope="scope">
                    <div class="reset-lineheight">[{{ scope.row.gameId }}]</div>
                    <div class="reset-lineheight">{{ scope.row.game }}</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ['tableData'],
    created() {
        console.log(this.tableData);
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions([])
    }
};
</script>

<style scoped>
</style>
