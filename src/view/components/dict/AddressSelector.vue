<!--三级国标行业选择框-->
<template>
  <Row>
    <Col span="5">
      <Select v-model="firstAddress" @on-change="updateFirstValue" v-bind:disabled="disabled" clearable>
        <Option v-for="first in firstList" :value="first.itemKey" :key="first.itemKey + first.itemName">{{
          first.itemName
          }}
        </Option>
      </Select>
    </Col>
    <Col span="5" v-show="shouldShowSecondAddress">
      <Select v-model="secondAddress" @on-change="updateSecondValue" v-bind:disabled="disabled" clearable>
        <Option v-for="second in secondList" :value="second.itemKey" :key="second.itemKey + second.itemName">{{
          second.itemName
          }}
        </Option>
      </Select>
    </Col>
    <Col span="5" v-show="shouldShowThirdAddress">
      <Select v-model="thirdAddress" @on-change="updateThirdValue" v-bind:disabled="disabled" clearable>
        <Option v-for="third in thirdList" :value="third.itemKey" :key="third.itemKey + third.itemName">{{
          third.itemName
          }}
        </Option>
      </Select>
    </Col>
    <Col span="5" v-show="showFourthAddress">
      <Select v-model="fourthAddress" @on-change="updateFourthValue" v-bind:disabled="disabled" clearable>
        <Option v-for="fourth in fourthList" :value="fourth.itemKey" :key="fourth.itemKey + fourth.itemName">{{
          fourth.itemName
          }}
        </Option>
      </Select>
    </Col>
  </Row>
</template>
<script>
// import cfs from '@/utils/configs.js'
import requestUtils from '@/request/requestUtils.js'
import constants from '@/constants/constants'
import * as renderUtil from '@/libs/renderUtil.js'

let addrCacheMap = {}

/**
   * 加载地址信息
   * @param level
   * @param parentId
   * @param callback
   */
function loadAddress (_vue, level, parentId, callback, failcall, filterAuth) {
  if (level > 1 && parentId == null) {
    this.$Message.error('地址加载参数有误')
  }
  let param = {
    'type': level,
    'code': parentId,
    'filterAuth': filterAuth
  }
  let cacheKey = level + '_' + (parentId || '') + filterAuth
  let addrList = addrCacheMap[cacheKey]
  if (addrList != null) {
    callback.call(_vue, addrList)
    return
  }
  requestUtils.postSubmit(_vue, constants.urls.components.dict.addressSelector.area, param, function (response) {
    if (response.success) {
      addrList = _.map(response.data, function (v) {
        v.itemKey = v.id + ''
        v.itemName = v.name
        return v
      })
      addrCacheMap[cacheKey] = addrList
      callback.call(_vue, addrList)
    } else {
      failcall.call(_vue, '加载地址信息失败')
    }
  }, function (error) {
    failcall.call(_vue, '加载地址信息失败')
  }, false)
}

var _ = require('underscore')
export default {
  name: 'AddressSelector',
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    },
    filterAuth: {
      type: Boolean,
      default: false
    },
    shouldShowFourthAddress: {
      type: Boolean,
      default: true
    },
    shouldShowThirdAddress: {
      type: Boolean,
      default: true
    },
    hideFakeCity: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      gbAddress: this.value,
      firstAddress: '',
      secondAddress: '',
      thirdAddress: '',
      fourthAddress: '',
      firstList: [],
      secondList: [],
      thirdList: [],
      fourthList: [],
      shouldShowSecondAddress: true
    }
  },
  computed: {
    showFourthAddress () {
      return this.fourthList !== null && this.fourthList !== undefined && this.fourthList.length !== 0 && this.shouldShowFourthAddress
    }
  },
  watch: {
    value (val) {
    },
    firstAddress (newVal, oldVal) {
      if (!renderUtil.isEmptyString(oldVal)) {
        this.clearUpperLevel(1, false)
      }
      if (!renderUtil.isEmptyString(newVal)) {
        this.updateSecondList()
        // 隐藏假城市（直辖市的时候）
        if (this.hideFakeCity && (newVal == '1' || newVal == '2' || newVal == '3' || newVal == '4')) {
          this.shouldShowSecondAddress = false
        } else {
          this.shouldShowSecondAddress = true
        }
      }
    },
    secondAddress (newVal, oldVal) {
      if (!renderUtil.isEmptyString(oldVal)) {
        this.clearUpperLevel(2, false)
      }
      if (!renderUtil.isEmptyString(newVal)) {
        this.updateThirdList()
      }
    },
    thirdAddress (newVal, oldVal) {
      if (!renderUtil.isEmptyString(oldVal)) {
        this.clearUpperLevel(3, false)
      }
      if (!renderUtil.isEmptyString(newVal)) {
        this.updateFourthList()
      }
    }
  },
  beforeMount () {
    loadAddress(this, 1, null, function (addrList) {
      this.firstList = addrList
    }, function (msg) {
      this.$Message.error('加载一级地址信息失败')
    }, this.filterAuth)
  },
  methods: {
    getValue () {
      return {
        'provinceId': this.firstAddress,
        'cityId': this.secondAddress,
        'countyId': this.thirdAddress,
        'townId': this.fourthAddress
      }
    },
    updateFirstValue (value) {
      this.updateValue()
    },
    updateSecondValue (value) {
      this.updateValue()
    },
    updateThirdValue (value) {
      this.updateValue()
    },
    updateFourthValue (value) {
      this.updateValue()
    },
    clearUpperLevel (level, forceClear) {
      if (forceClear) {
        this.firstAddress = null
        this.secondAddress = null
        this.secondList = []
        this.thirdAddress = null
        this.thirdList = []
        this.fourthAddress = null
        this.fourthList = []
        this.initAddressInfo = {}
      } else {
        if (level < 2) {
          this.secondAddress = null
          this.secondList = []
        }
        if (level < 3) {
          this.thirdAddress = null
          this.thirdList = []
        }
        if (level < 4) {
          this.fourthAddress = null
          this.fourthList = []
        }
      }
    },
    updateValue () {
      this.$emit('input', [this.firstAddress, this.secondAddress, this.thirdAddress, this.fourthAddress])
      this.$emit('on-change', this.getValue())
    },
    updateSecondList (initAddressInfo) {
      let firstAddress = this.firstAddress
      if (initAddressInfo != null && initAddressInfo['firstAddress']) {
        firstAddress = initAddressInfo['firstAddress']
      }
      loadAddress(this, 2, firstAddress, function (addrList) {
        this.secondList = addrList
      }, function (msg) {
        this.$Message.error('加载二级地址信息失败')
      }, this.filterAuth)
    },
    updateThirdList (initAddressInfo) {
      let secondAddress = this.secondAddress
      if (initAddressInfo != null && initAddressInfo['secondAddress']) {
        secondAddress = initAddressInfo['secondAddress']
      }
      loadAddress(this, 3, secondAddress, function (addrList) {
        this.thirdList = addrList
      }, function (msg) {
        this.$Message.error('加载三级地址信息失败')
      }, this.filterAuth)
    },
    updateFourthList (initAddressInfo) {
      let thirdAddress = this.thirdAddress
      if (initAddressInfo != null && initAddressInfo['thirdAddress']) {
        thirdAddress = initAddressInfo['thirdAddress']
      }
      loadAddress(this, 4, this.thirdAddress, function (addrList) {
        if (addrList == null || addrList.length == 0) {

        } else {

        }
        this.fourthList = addrList
      }, function (msg) {
        this.$Message.error('加载四级地址信息失败')
      }, this.filterAuth)
    },
    initAddress (val) {
      let initAddressInfo = {}
      if (val && val.length > 0) {
        this.firstAddress = val[0] + ''
        initAddressInfo['firstAddress'] = this.firstAddress
      }
      if (val && val.length > 1) {
        this.secondAddress = val[1] + ''
        initAddressInfo['secondAddress'] = this.secondAddress
      }
      if (val && val.length > 2) {
        this.thirdAddress = val[2] + ''
        initAddressInfo['thirdAddress'] = this.thirdAddress
      }
      if (val.length > 3) {
        this.fourthAddress = val[3] + ''
        initAddressInfo['fourthAddress'] = this.fourthAddress
      }
      return initAddressInfo
    },
    clear () {
      this.clearUpperLevel(1, true)
    },
    resetAddress (val) {
      let initAddressInfo = this.initAddress(val)
      if (val.length > 1) {
        this.updateSecondList(initAddressInfo)
      }
      if (val.length > 2) {
        this.updateThirdList(initAddressInfo)
      }
      if (val.length > 3) {
        this.updateFourthList(initAddressInfo)
      }
      window.address = this
    },
    /**
       * 是否选择了最后一级地址
       */
    hasSelectLastArea () {
      if (renderUtil.isEmptyString(this.firstAddress) || renderUtil.isEmptyString(this.secondAddress) || renderUtil.isEmptyString(this.thirdAddress)) {
        return false
      }
      if (this.fourthList != null && this.fourthList.length > 0) {
        return !renderUtil.isEmptyString(this.fourthAddress)
      }
      return true
    },
    getAddressDictList (level) {
      if (level === 1) {
        return this.firstList
      }
      if (level === 2) {
        return this.secondList
      }
      if (level === 3) {
        return this.thirdList
      }
      if (level === 4) {
        return this.fourthList
      }
    },
    getAreaName (areaId, level) {
      let areaList = []
      if (level === 1) {
        areaList = this.firstList
      } else if (level === 2) {
        areaList = this.secondList
      } else if (level === 3) {
        areaList = this.thirdList
      } else if (level === 4) {
        areaList = this.fourthList
      }

      let dict = _.find(areaList, function (it) {
        return it.itemKey === areaId
      })
      return dict == null ? '' : dict.itemName
    }
  }
}
</script>
