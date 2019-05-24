<template>
  <div>
    <Modal v-model="showModal"
           title="修改用户信息"
           @on-ok="save"
           @on-cancel="cancel">
      <Form ref="formItems" :model="formItems" :rules="formRules" :label-width="120" inline>

        <Row>
          <Col span="24">
            <Form-item label="主键id" prop="id" style="width: 90%">
              <Input v-model="formItems.id" :maxlength="20" :disabled="true"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="分库字段" prop="router" style="width: 90%">
              <Input v-model="formItems.router" :maxlength="64" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="平台" prop="platform" style="width: 90%">
              <Input v-model="formItems.platform" :maxlength="3" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="原始企业id" prop="originalCompanyId" style="width: 90%">
              <Input v-model="formItems.originalCompanyId" :maxlength="19"
                     :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="b2b平台pin" prop="b2bPin" style="width: 90%">
              <Input v-model="formItems.b2bPin" :maxlength="32" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="主站cpin" prop="cPin" style="width: 90%">
              <Input v-model="formItems.cPin" :maxlength="32" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="主站bpin" prop="bPin" style="width: 90%">
              <Input v-model="formItems.bPin" :maxlength="32" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="用户名称" prop="name" style="width: 90%">
              <Input v-model="formItems.name" :maxlength="128" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="用户昵称" prop="nick" style="width: 90%">
              <Input v-model="formItems.nick" :maxlength="128" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="用户类型" prop="type" style="width: 90%">
              <Input v-model="formItems.type" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="来源" prop="source" style="width: 90%">
              <Input v-model="formItems.source" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="注册来源" prop="regSource" style="width: 90%">
              <Input v-model="formItems.regSource" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="来源明细" prop="sourceDetail" style="width: 90%">
              <Input v-model="formItems.sourceDetail" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="1、表示是主账号" prop="leader" style="width: 90%">
              <Input v-model="formItems.leader" :maxlength="3" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="经营行业id" prop="industryId" style="width: 90%">
              <Input v-model="formItems.industryId" :maxlength="19" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="认领人" prop="claimant" style="width: 90%">
              <Input v-model="formItems.claimant" :maxlength="64" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="认领时间" prop="claimTime" style="width: 90%">
              <Input v-model="formItems.claimTime" :maxlength="19" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="推广人员" prop="pushErp" style="width: 90%">
              <Input v-model="formItems.pushErp" :maxlength="64" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="推广来源" prop="pushSource" style="width: 90%">
              <Input v-model="formItems.pushSource" :maxlength="3" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="运营人员" prop="bizErp" style="width: 90%">
              <Input v-model="formItems.bizErp" :maxlength="64" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="分销-用户群组，大客-项目编号" prop="groupCode" style="width: 90%">
              <Input v-model="formItems.groupCode" :maxlength="32" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="200位0-9数字组合，每一位对应相应的业务标示" prop="userMark" style="width: 90%">
              <Input v-model="formItems.userMark" :maxlength="200" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="" prop="orgLevelCode" style="width: 90%">
              <Input v-model="formItems.orgLevelCode" :maxlength="60" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="销售所在小组id" prop="groupId" style="width: 90%">
              <Input v-model="formItems.groupId" :maxlength="200" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="所属区域id" prop="areaId" style="width: 90%">
              <Input v-model="formItems.areaId" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="注册时间" prop="registTime" style="width: 90%">
              <Input v-model="formItems.registTime" :maxlength="19" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="大客" prop="projectId" style="width: 90%">
              <Input v-model="formItems.projectId" :maxlength="19" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="省Id" prop="provinceId" style="width: 90%">
              <Input v-model="formItems.provinceId" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="市Id" prop="cityId" style="width: 90%">
              <Input v-model="formItems.cityId" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="县ID" prop="countyId" style="width: 90%">
              <Input v-model="formItems.countyId" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="镇Id" prop="townId" style="width: 90%">
              <Input v-model="formItems.townId" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="详细地址" prop="address" style="width: 90%">
              <Input v-model="formItems.address" :maxlength="500" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="1" prop="userStatus" style="width: 90%">
              <Input v-model="formItems.userStatus" :maxlength="3" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="分销渠道" prop="channelType" style="width: 90%">
              <Input v-model="formItems.channelType" :maxlength="3" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="渠道业务类型" prop="channelBizType" style="width: 90%">
              <Input v-model="formItems.channelBizType" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="是否被联系" prop="contacted" style="width: 90%">
              <Input v-model="formItems.contacted" :maxlength="3" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="上次成单时间" prop="lastOrderTime" style="width: 90%">
              <Input v-model="formItems.lastOrderTime" :maxlength="19" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="扩展信息1" prop="ext1" style="width: 90%">
              <Input v-model="formItems.ext1" :maxlength="100" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="扩展信息2" prop="ext2" style="width: 90%">
              <Input v-model="formItems.ext2" :maxlength="100" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="比较大的扩展信息" prop="extm" style="width: 90%">
              <Input v-model="formItems.extm" :maxlength="2000" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="创建人" prop="creator" style="width: 90%">
              <Input v-model="formItems.creator" :maxlength="64" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="修改人" prop="operator" style="width: 90%">
              <Input v-model="formItems.operator" :maxlength="64" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="数据有效性；1" prop="status" style="width: 90%">
              <Input v-model="formItems.status" :maxlength="3" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="并发版本号，从1开始" prop="concurrentVersion" style="width: 90%">
              <Input v-model="formItems.concurrentVersion" :maxlength="10"
                     :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="数据版本号" prop="dataVersion" style="width: 90%">
              <Input v-model="formItems.dataVersion" :maxlength="10" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <Form-item label="唯一的id" prop="accountId" style="width: 90%">
              <Input v-model="formItems.accountId" :maxlength="19" :disabled="disableInput"></Input>
            </Form-item>
          </Col>
        </Row>

      </Form>
      <div slot="footer">
        <Button type="default" @click="cancel">取消</Button>
        <Button type="primary" @click="save" :loading="loading">
          <Icon type="android-done"></Icon>
          保存
        </Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import constants from '@/constants/constants.js'
import requestUtils from '@/request/requestUtils.js'

var _ = require('underscore')

var validateSet = {
  router: [{ type: 'string', required: false, message: '分库字段不能为空', trigger: 'blur' }],
  platform: [{ type: 'string', required: false, message: '平台不能为空', trigger: 'blur' }],
  originalCompanyId: [{ type: 'integer', required: true, message: '原始企业id不能为空', trigger: 'blur' }],
  b2bPin: [{ type: 'string', required: false, message: 'b2b平台pin不能为空', trigger: 'blur' }],
  cPin: [{ type: 'string', required: false, message: '主站cpin不能为空', trigger: 'blur' }],
  bPin: [{ type: 'string', required: false, message: '主站bpin不能为空', trigger: 'blur' }],
  name: [{ type: 'string', required: false, message: '用户名称不能为空', trigger: 'blur' }],
  nick: [{ type: 'string', required: false, message: '用户昵称不能为空', trigger: 'blur' }],
  type: [{ type: 'integer', required: false, message: '用户类型不能为空', trigger: 'blur' }],
  source: [{ type: 'integer', required: false, message: '来源不能为空', trigger: 'blur' }],
  regSource: [{ type: 'integer', required: false, message: '注册来源不能为空', trigger: 'blur' }],
  sourceDetail: [{ type: 'integer', required: false, message: '来源明细不能为空', trigger: 'blur' }],
  leader: [{ type: 'integer', required: false, message: '1、表示是主账号不能为空', trigger: 'blur' }],
  industryId: [{ type: 'integer', required: false, message: '经营行业id不能为空', trigger: 'blur' }],
  claimant: [{ type: 'string', required: false, message: '认领人不能为空', trigger: 'blur' }],
  claimTime: [{ type: 'string', required: false, message: '认领时间不能为空', trigger: 'blur' }],
  pushErp: [{ type: 'string', required: false, message: '推广人员不能为空', trigger: 'blur' }],
  pushSource: [{ type: 'integer', required: false, message: '推广来源不能为空', trigger: 'blur' }],
  bizErp: [{ type: 'string', required: false, message: '运营人员不能为空', trigger: 'blur' }],
  groupCode: [{ type: 'string', required: false, message: '分销-用户群组，大客-项目编号不能为空', trigger: 'blur' }],
  userMark: [{ type: 'string', required: false, message: '200位0-9数字组合，每一位对应相应的业务标示不能为空', trigger: 'blur' }],
  orgLevelCode: [{ type: 'string', required: false, message: '不能为空', trigger: 'blur' }],
  groupId: [{ type: 'string', required: false, message: '销售所在小组id不能为空', trigger: 'blur' }],
  areaId: [{ type: 'integer', required: false, message: '所属区域id不能为空', trigger: 'blur' }],
  registTime: [{ type: 'string', required: false, message: '注册时间不能为空', trigger: 'blur' }],
  projectId: [{ type: 'integer', required: false, message: '大客不能为空', trigger: 'blur' }],
  provinceId: [{ type: 'integer', required: false, message: '省Id不能为空', trigger: 'blur' }],
  cityId: [{ type: 'integer', required: false, message: '市Id不能为空', trigger: 'blur' }],
  countyId: [{ type: 'integer', required: false, message: '县ID不能为空', trigger: 'blur' }],
  townId: [{ type: 'integer', required: false, message: '镇Id不能为空', trigger: 'blur' }],
  address: [{ type: 'string', required: false, message: '详细地址不能为空', trigger: 'blur' }],
  userStatus: [{ type: 'integer', required: false, message: '1不能为空', trigger: 'blur' }],
  channelType: [{ type: 'integer', required: false, message: '分销渠道不能为空', trigger: 'blur' }],
  channelBizType: [{ type: 'integer', required: false, message: '渠道业务类型不能为空', trigger: 'blur' }],
  contacted: [{ type: 'integer', required: false, message: '是否被联系不能为空', trigger: 'blur' }],
  lastOrderTime: [{ type: 'string', required: false, message: '上次成单时间不能为空', trigger: 'blur' }],
  ext1: [{ type: 'string', required: false, message: '扩展信息1不能为空', trigger: 'blur' }],
  ext2: [{ type: 'string', required: false, message: '扩展信息2不能为空', trigger: 'blur' }],
  extm: [{ type: 'string', required: false, message: '比较大的扩展信息不能为空', trigger: 'blur' }],
  creator: [{ type: 'string', required: false, message: '创建人不能为空', trigger: 'blur' }],
  operator: [{ type: 'string', required: false, message: '修改人不能为空', trigger: 'blur' }],
  status: [{ type: 'integer', required: false, message: '数据有效性；1不能为空', trigger: 'blur' }],
  concurrentVersion: [{ type: 'string', required: false, message: '并发版本号，从1开始不能为空', trigger: 'blur' }],
  dataVersion: [{ type: 'integer', required: false, message: '数据版本号不能为空', trigger: 'blur' }],
  accountId: [{ type: 'integer', required: false, message: '唯一的id不能为空', trigger: 'blur' }]
}
export default {
  data () {
    return {
      formItems: {},
      formRules: validateSet,
      // formRules: constants.rules.b2bUserInfo.edit,
      showModal: false,
      loading: false,
      disableInput: false
    }
  },

  methods: {
    save: function () {
      this.$refs['formItems'].validate((valid) => {
        if (!valid) {
          return false
        }
        requestUtils.postSubmit(this, constants.urls.userCenter.b2bUserInfo.update, this.formItems, function (data) {
          this.$Message.success({
            content: '修改成功',
            duration: 3
          })
          this.showModal = false
          this.$emit(constants.actions.common.refreshList)
        })
      })
    },
    'cancel': function () {
      this.$refs['formItems'].resetFields()
      this.showModal = false
    },
    'show': function (isShow) {
      this.showModal = isShow
    },
    'editItem': function (item) {
      this.formItems = _.clone(item)
      this.show(true)
    }
  }
}
</script>
