<template>
  <div>

    <Form ref="formSearch" :model="formSearch" :rules="searchFormRules" :label-width="80">
      <Row>

        <Col span="6">
          <FormItem label="平台" prop="platform">
            <dict-select v-model="formSearch.platform"
                         :kind="this.constants.dicts.dictKinds.STD_PLATFORM_DICT"
                         :clearable="false"></dict-select>
          </FormItem>
        </Col>

        <Col span="6">
          <FormItem label="用户bPin" prop="bPin">
            <Input v-model="formSearch.bPin" placeholder="请输入bPin"></Input>
          </FormItem>
        </Col>

        <Col span="6">
          <FormItem label="b2bPin" prop="b2bPin">
            <Input v-model="formSearch.b2bPin" placeholder="请输入b2bPin"></Input>
          </FormItem>
        </Col>

        <Col span="6">
          <FormItem label="原始企业id" prop="originalCompanyId">
            <Input v-model="formSearch.originalCompanyId" placeholder="请输入原始企业id"></Input>
          </FormItem>
        </Col>

      </Row>
      <Row>

        <Col span="6">
          <FormItem label="数据有效性" prop="status">
            <dict-select v-model="formSearch.status"
                         :kind="this.constants.dicts.dictKinds.STD_STATUS"
                         :clearable="true"></dict-select>
          </FormItem>
        </Col>

        <Col span="6">
          <FormItem label="userStatus" prop="userStatus">
            <Input v-model="formSearch.userStatus" placeholder="请输入userStatus"></Input>
          </FormItem>
        </Col>

        <Col span="6">
          <FormItem label="经营行业id" prop="industryId">
            <Input v-model="formSearch.industryId" placeholder="请输入经营行业id"></Input>
          </FormItem>
        </Col>

      </Row>

      <Collapse simple>
        <Panel name="1">
          更多条件
          <p slot="content">

            <Row>
              <Col span="6">
                <FormItem label="accountId" prop="accountId">
                  <Input v-model="formSearch.accountId" placeholder="请输入accountId"></Input>
                </FormItem>
              </Col>

              <Col span="6">
                <FormItem label="分销渠道" prop="channelType">
                  <Input v-model="formSearch.channelType" placeholder="请输入分销渠道"></Input>
                </FormItem>
              </Col>

              <Col span="6">
                <FormItem label="渠道业务类型" prop="channelBizType">
                  <Input v-model="formSearch.channelBizType" placeholder="请输入渠道业务类型"></Input>
                </FormItem>
              </Col>

              <Col span="6">
                <FormItem label="accountId Greater" prop="accountIdGreater">
                  <Input v-model="formSearch.accountIdGreater"
                         placeholder="请输入accountIdGreater"></Input>
                </FormItem>
              </Col>
            </Row>

            <Row>

              <Col span="4">
                <FormItem label="省Id" prop="provinceId">
                  <Input v-model="formSearch.provinceId" placeholder="请输入省Id"></Input>
                </FormItem>
              </Col>

              <Col span="4">
                <FormItem label="市Id" prop="cityId">
                  <Input v-model="formSearch.cityId" placeholder="请输入市Id"></Input>
                </FormItem>
              </Col>

              <Col span="4">
                <FormItem label="县ID" prop="countyId">
                  <Input v-model="formSearch.countyId" placeholder="请输入县ID"></Input>
                </FormItem>
              </Col>

              <Col span="4">
                <FormItem label="镇Id" prop="townId">
                  <Input v-model="formSearch.townId" placeholder="请输入镇Id"></Input>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="6">
                <FormItem label="创建时间start" prop="createdStart">
                  <DatePicker v-model="formSearch.createdStart" type="date" placeholder="创建时间start"
                              style="width: 200px"></DatePicker>
                </FormItem>
              </Col>

              <Col span="6">
                <FormItem label="创建时间end" prop="createdEnd">
                  <DatePicker v-model="formSearch.createdEnd" type="date" placeholder="创建时间end"
                              style="width: 200px"></DatePicker>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="20">
                <FormItem label="pinList" prop="pinList">
                  <Input v-model="formSearch.pinList" :maxlength="500" type="textarea" placeholder="用户bPin,请使用逗号分隔"
                         :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="20">
                <FormItem label="extQueryJson" prop="extQueryJson">
                  <Input v-model="formSearch.extQueryJson" :maxlength="500" type="textarea"
                         placeholder="extQueryJson,请使用json查询扩展字段"
                         :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
              </Col>
            </Row>

          </p>
        </Panel>
      </Collapse>

      <Row>
        <Col span="4" offset="20">
          <Form-item>
            <Button type="primary" @click="loadPageNoChange(1)" :loading="loading">
              <Icon type="search"></Icon>
              查询
            </Button>
          </Form-item>
        </Col>
      </Row>

    </Form>
    <Button type="primary" @click="exportData(1)"> 导出原始数据</Button>

    <Table border :columns="columns" :data="queryResult.dataList" :loading="loading" ref="table"></Table>

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="queryResult.pageQuery.totalCount" :pageSize="queryResult.pageQuery.pageSize"
              :current="queryResult.pageQuery.currentPageNo" @on-page-size-change="loadPageSizeChange"
              :page-size-opts="[10,50,100,200,500]"
              @on-change="loadPageNoChange" show-total show-elevator show-sizer></Page>
      </div>
    </div>
  </div>
</template>
<script>
import add from './add.vue'
import edit from './edit.vue'
import dictSelect from '@/view/components/dict/DictSelect'
import dictCheckbox from '@/view/components/dict/DictCheckBox'
import dictRadio from '@/view/components/dict/DictRadio'

import tableDefine from './tableDefine.js'
import requestUtils from '@/request/requestUtils.js'
import constants from '@/constants/constants'

export default {
  mixins: [tableDefine],
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

      let pageQuery = this.queryResult.pageQuery
      if (pageQuery.pageSize * pageQuery.currentPageNo > 10000) {
        this.$Message.error('ES搜索不能超过1W条!')
        return
      }

      this.$refs['formSearch'].validate((valid) => {
        if (valid) {
          var searchParam = requestUtils.serializeObject(this.formSearch, true, true)
          searchParam['pageSize'] = _this.queryResult.pageQuery.pageSize
          searchParam['page'] = _this.queryResult.pageQuery.currentPageNo
          requestUtils.postSubmit(_this, constants.urls.userCenter.b2bUserInfo.list, searchParam, function (data) {
            _this.queryResult.dataList = data.value
            _this.queryResult.pageQuery = data.pageQuery
          }, null, true)
        } else {
          this.$Message.error('参数验证失败!')
        }
      })
    },
    editItem: function (item) {
      this.$refs.editModal.editItem(item)
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '用户信息列表'
      })
    }
  },
  components: {
    add,
    edit,
    dictSelect,
    dictCheckbox,
    dictRadio
  }
}

</script>
