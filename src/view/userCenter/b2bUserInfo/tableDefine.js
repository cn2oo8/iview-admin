/**
 * 抽取出来方便
 */
import * as renderUtil from '@/libs/renderUtil.js'
import constants from '@/constants/constants'
import operate from './operate.vue'
import dictLabel from '@/view/components/dict/DictLabel'
import dictSelect from '@/view/components/dict/DictSelect'
import dictCheckbox from '@/view/components/dict/DictCheckBox'

const searchFormRules = {
  id: [{ type: 'string', required: false, message: '主键id不能为空', trigger: 'blur' }],
  platform: [{ type: 'string', required: true, message: '平台不能为空', trigger: 'blur' }],
  originalCompanyId: [{ type: 'string', required: false, message: '原始企业id不能为空', trigger: 'blur' }],
  name: [{ type: 'string', required: false, message: '用户名称不能为空', trigger: 'blur' }],
  type: [{ type: 'string', required: false, message: '用户类型不能为空', trigger: 'blur' }],
  industryId: [{ type: 'string', required: false, message: '经营行业id不能为空', trigger: 'blur' }],
  groupId: [{ type: 'string', required: false, message: '销售所在小组id不能为空', trigger: 'blur' }],
  areaId: [{ type: 'string', required: false, message: '所属区域id不能为空', trigger: 'blur' }],
  projectId: [{ type: 'string', required: false, message: '大客不能为空', trigger: 'blur' }],
  provinceId: [{ type: 'string', required: false, message: '省Id不能为空', trigger: 'blur' }],
  cityId: [{ type: 'string', required: false, message: '市Id不能为空', trigger: 'blur' }],
  countyId: [{ type: 'string', required: false, message: '县ID不能为空', trigger: 'blur' }],
  townId: [{ type: 'string', required: false, message: '镇Id不能为空', trigger: 'blur' }],
  userStatus: [{ type: 'string', required: false, message: 'userStatus数据有误', trigger: 'blur' }],
  channelType: [{ type: 'string', required: false, message: '分销渠道不能为空', trigger: 'blur' }],
  channelBizType: [{ type: 'string', required: false, message: '渠道业务类型不能为空', trigger: 'blur' }],
  status: [{ type: 'string', required: false, message: '数据有效性有误', trigger: 'blur' }],
  accountId: [{ type: 'string', required: false, message: '唯一的id不能为空', trigger: 'blur' }]
}

let tableDefine = {
  name: 'b2bUserInfo',
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
          width: 100,
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
          width: 100,
          key: 'claimant'
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
          width: 100,
          key: 'pushErp'
        },

        {
          title: '推广来源',
          width: 100,
          key: 'pushSource'
        },

        {
          title: '运营人员',
          width: 100,
          key: 'bizErp'
        },

        {
          title: '用户群组',
          key: 'groupCode',
          width: 100
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
          width: 100
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
          width: 100,
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
          title: '创建时间',
          key: 'created',
          width: 100,
          render: (h, params) => {
            return h('div', renderUtil.formatDateTime(params.row.created))
          }
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
        'status': '',
        'pinList': '',
        'extQueryJson': '',
        'createdStart': null,
        'createdEnd': null
      },
      searchFormRules: searchFormRules,
      constants
    }
  },
  mounted () {
    this.loadData()
  },
  components: {
    operate,
    dictLabel,
    dictSelect,
    dictCheckbox
  }
}
export default tableDefine
