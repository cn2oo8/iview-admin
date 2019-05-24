<template>
  <div>

    <Table border :columns="columns" :data="queryResult.dataList" :loading="loading"></Table>

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="queryResult.pageQuery.totalCount" :pageSize="queryResult.pageQuery.pageSize"
              :current="queryResult.pageQuery.currentPageNo" @on-page-size-change="loadPageSizeChange"
              @on-change="loadPageNoChange" show-total show-elevator show-sizer></Page>
      </div>
    </div>
  </div>
</template>
<script>
import dictSelect from '@/view/components/dict/DictSelect'
import dictCheckbox from '@/view/components/dict/DictCheckBox'
import dictRadio from '@/view/components/dict/DictRadio'
import requestUtils from '@/request/requestUtils.js'
import constants from '@/constants/constants'
import operate from './operate.vue'
import dictLabel from '@/view/components/dict/DictLabel'
import * as renderUtil from '@/libs/renderUtil.js'

export default {
  props: {
    'params': {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      columns: [
        {
          title: 'accountId',
          key: 'accountId',
          width: 100
        },
        {
          title: '主站bpin',
          key: 'bPin',
          width: 100
        },
        {
          title: '平台',
          width: 80,
          render: (h, params) => {
            return h(dictLabel, {
              props: {
                value: params.row['platform'],
                kind: constants.dicts.dictKinds.STD_PLATFORM_DICT,
                showStyle: false
              }
            })
          }
        },

        {
          title: '原始企业id',
          key: 'originalCompanyId',
          width: 100
        },

        {
          title: 'b2b平台pin',
          key: 'b2bPin',
          width: 100
        },

        {
          title: '用户名称',
          key: 'name',
          width: 100
        },

        {
          title: '用户昵称',
          key: 'nick',
          width: 100
        },

        {
          title: '用户类型',
          width: 100,
          key: 'type'
        },

        {
          title: '来源',
          key: 'source',
          width: 100
        },

        {
          title: '注册来源',
          width: 100,
          render: (h, params) => {
            return h(dictLabel, {
              props: {
                value: params.row['regSource'],
                kind: constants.dicts.dictKinds.b2bUserInfo_regSource_DICT,
                showStyle: true
              }
            })
          }
        },

        {
          title: '经营行业id',
          key: 'industryId',
          width: 100
        },

        {
          title: '认领人',
          width: 50,
          render: (h, params) => {
            return h(dictLabel, {
              props: {
                value: params.row['claimant'],
                kind: constants.dicts.dictKinds.b2bUserInfo_claimant_DICT,
                showStyle: true
              }
            })
          }
        },

        {
          title: '认领时间',
          key: 'claimTime',
          width: 100,
          render: (h, params) => {
            return h('div', renderUtil.formatDateTime(params.row.claimTime))
          }
        },

        {
          title: '推广人员',
          width: 30,
          key: 'pushErp'
        },

        {
          title: '推广来源',
          width: 30,
          key: 'pushSource'
        },

        {
          title: '运营人员',
          width: 30,
          key: 'bizErp'
        },

        {
          title: '用户群组',
          key: 'groupCode',
          width: 30
        },

        {
          title: '业务标示userMark',
          key: 'userMark',
          width: 100
        },

        {
          title: 'orgLevelCode',
          key: 'orgLevelCode',
          width: 100
        },

        {
          title: '销售所在小组id',
          key: 'groupId',
          width: 100
        },

        {
          title: '所属区域id',
          key: 'areaId',
          width: 50
        },
        {
          title: '注册时间',
          key: 'registTime',
          width: 100,
          render: (h, params) => {
            return h('div', renderUtil.formatDateTime(params.row.registTime))
          }
        },

        {
          title: 'projectId',
          key: 'projectId',
          width: 100
        },

        {
          title: '省Id',
          key: 'provinceId',
          width: 100
        },

        {
          title: '市Id',
          key: 'cityId',
          width: 100
        },

        {
          title: '县ID',
          key: 'countyId',
          width: 100
        },

        {
          title: '镇Id',
          key: 'townId',
          width: 100
        },

        {
          title: '详细地址',
          key: 'address',
          width: 100
        },

        {
          title: 'userStatus',
          key: 'userStatus',
          width: 100
        },

        {
          title: '分销渠道',
          key: 'channelType',
          width: 100
        },

        {
          title: '是否被联系',
          width: 50,
          render: (h, params) => {
            return h(dictLabel, {
              props: {
                value: params.row['contacted'],
                kind: constants.dicts.dictKinds.STD_YESNO_DICT,
                showStyle: true
              }
            })
          }
        },

        {
          title: '数据有效性',
          width: 100,
          render: (h, params) => {
            return h(dictLabel, {
              props: {
                value: params.row['status'],
                kind: constants.dicts.dictKinds.STD_STATUS,
                showStyle: true
              }
            })
          }
        },
        {
          title: 'leader',
          key: 'leader',
          width: 100
        },
        {
          title: '上次成单时间',
          key: 'lastOrderTime',
          width: 100,
          render: (h, params) => {
            return h('div', renderUtil.formatDateTime(params.row.lastOrderTime))
          }
        },

        {
          title: '创建人',
          key: 'creator',
          width: 100
        },
        {
          title: '修改人',
          key: 'operator',
          width: 100
        },
        {
          title: '修改时间',
          key: 'modified',
          width: 100,
          render: (h, params) => {
            return h('div', renderUtil.formatDateTime(params.row.modified))
          }
        },

        {
          title: '并发版本号',
          key: 'concurrentVersion',
          width: 100
        },

        {
          title: '数据版本号',
          key: 'dataVersion',
          width: 100
        },

        {
          title: '操作',
          key: 'action',
          width: 200,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h(operate, {
              props: {
                item: params.row
              },
              on: {
                'refreshList': () => {
                  this.loadData()
                },
                'updateItem': (item) => {
                  this.editItem(item)
                }
              }
            })
          }
        }
      ],
      queryResult: {
        dataList: [],
        pageQuery: {
          totalCount: 0,
          pageCount: 0,
          currentPageNo: 1,
          pageSize: 10
        }
      },
      formSearch: {
        'id': null,
        'platform': '1',
        'originalCompanyId': null,
        'bPin': '',
        'b2bPin': '',
        'type': null,
        'industryId': null,
        'provinceId': '',
        'cityId': '',
        'townId': '',
        'countyId': '',
        'userStatus': '',
        'accountId': null,
        'accountIdGreater': '',
        'status': ''
      },
      constants
    }
  },
  methods: {
    loadPageSizeChange (pageSize) {
      this.queryResult.pageQuery.pageSize = pageSize
      this.loadData()
    },
    loadPageNoChange (pageNo) {
      this.queryResult.pageQuery.currentPageNo = pageNo
      this.loadData()
    },
    loadData () {
      var _this = this

      this.formSearch.platform = this.params.userInfo.platform + ''
      this.formSearch.bPin = this.params.userInfo.bPin
      this.formSearch.originalCompanyId = this.params.userInfo.originalCompanyId + ''

      let pageQuery = this.queryResult.pageQuery
      if (pageQuery.pageSize * pageQuery.currentPageNo > 10000) {
        this.$Message.error('ES搜索不能超过1W条!')
        return
      }
      var searchParam = requestUtils.serializeObject(this.formSearch, true, true)
      searchParam['pageSize'] = _this.queryResult.pageQuery.pageSize
      searchParam['page'] = _this.queryResult.pageQuery.currentPageNo
      requestUtils.postSubmit(_this, constants.urls.userCenter.b2bUserInfo.list, searchParam, function (data) {
        _this.queryResult.dataList = data.value
        _this.queryResult.pageQuery = data.pageQuery
      }, null, true)
    },
    editItem: function (item) {
      this.$refs.editModal.editItem(item)
    },
    notifyQueryEvent () {
      this.loadData()
    }
  },
  components: {
    dictSelect,
    dictCheckbox,
    dictRadio
  }
}
</script>
