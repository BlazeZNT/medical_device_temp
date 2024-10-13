"use strict";
const common_vendor = require("../../common/vendor.js"), common_assets = require("../../common/assets.js"), slibrary_index = require("../../slibrary/index.js");
if (!Array) {
  const _easycom_up_input2 = common_vendor.K("up-input");
  const _easycom_up_form_item2 = common_vendor.K("up-form-item");
  const _easycom_up_col2 = common_vendor.K("up-col");
  const _easycom_up_row2 = common_vendor.K("up-row");
  const _easycom_up_icon2 = common_vendor.K("up-icon");
  const _easycom_up_form2 = common_vendor.K("up-form");
  const _easycom_up_button2 = common_vendor.K("up-button");
  const _easycom_up_action_sheet2 = common_vendor.K("up-action-sheet");
  (_easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_col2 + _easycom_up_row2 + _easycom_up_icon2 + _easycom_up_form2 + _easycom_up_button2 + _easycom_up_action_sheet2)();
}
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_col = () => "../../uni_modules/uview-plus/components/u-col/u-col.js";
const _easycom_up_row = () => "../../uni_modules/uview-plus/components/u-row/u-row.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_action_sheet = () => "../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_up_input + _easycom_up_form_item + _easycom_up_col + _easycom_up_row + _easycom_up_icon + _easycom_up_form + _easycom_up_button + _easycom_up_action_sheet)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const state = common_vendor.N({
      showSex: false,
      model1: {
        userInfo: {
          name: "",
          sex: ""
        }
      },
      actions: [
        {
          name: "男"
        },
        {
          name: "女"
        },
        {
          name: "保密"
        }
      ],
      rules: {
        "userInfo.name": {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"]
        },
        "userInfo.sex": {
          type: "string",
          max: 1,
          required: true,
          message: "请选择男或女",
          trigger: ["blur", "change"]
        }
      },
      radio: "",
      switchVal: false
    });
    const formRef = common_vendor.p(null);
    function sexSelect(e) {
      state.model1.userInfo.sex = e.name;
      if (formRef.value) {
        formRef.value.validateField("userInfo.sex");
      }
    }
    const handleClickGotiRegister = () => {
      slibrary_index.s.$router.go("/pages/health/index");
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._,
        b: common_vendor.J(($event) => state.model1.userInfo.name = $event),
        c: common_vendor.L({
          placeholder: "Name",
          modelValue: state.model1.userInfo.name
        }),
        d: common_vendor.O("item1", "25a04030-3,25a04030-2"),
        e: common_vendor.L({
          label: "Name",
          prop: "userInfo.name",
          borderBottom: true
        }),
        f: common_vendor.L({
          span: "6"
        }),
        g: common_vendor.J(($event) => state.model1.userInfo.name = $event),
        h: common_vendor.L({
          placeholder: "Email",
          modelValue: state.model1.userInfo.name
        }),
        i: common_vendor.O("item1", "25a04030-6,25a04030-5"),
        j: common_vendor.L({
          label: "Gender",
          prop: "userInfo.name",
          borderBottom: true
        }),
        k: common_vendor.L({
          span: "6"
        }),
        l: common_vendor.L({
          gutter: 40
        }),
        m: common_vendor.L({
          name: "arrow-down"
        }),
        n: common_vendor.J(($event) => state.model1.userInfo.sex = $event),
        o: common_vendor.L({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "请选择性别",
          modelValue: state.model1.userInfo.sex
        }),
        p: common_vendor.O("item1", "25a04030-10,25a04030-9"),
        q: common_vendor.J(($event) => {
          state.showSex = true;
        }),
        r: common_vendor.L({
          label: "Gender",
          prop: "userInfo.name",
          borderBottom: true
        }),
        s: common_vendor.L({
          span: "6"
        }),
        t: common_vendor.J(($event) => state.model1.userInfo.name = $event),
        v: common_vendor.L({
          placeholder: "Email",
          modelValue: state.model1.userInfo.name
        }),
        w: common_vendor.O("item1", "25a04030-14,25a04030-13"),
        x: common_vendor.L({
          label: "Aadhar Card",
          prop: "userInfo.name",
          borderBottom: true
        }),
        y: common_vendor.L({
          span: "6"
        }),
        z: common_vendor.L({
          gutter: 40
        }),
        A: common_vendor.J(($event) => state.model1.userInfo.name = $event),
        B: common_vendor.L({
          placeholder: "Name",
          modelValue: state.model1.userInfo.name
        }),
        C: common_vendor.O("item1", "25a04030-18,25a04030-17"),
        D: common_vendor.L({
          label: "Date of Birth",
          prop: "userInfo.name",
          borderBottom: true
        }),
        E: common_vendor.L({
          span: "6"
        }),
        F: common_vendor.J(($event) => state.model1.userInfo.name = $event),
        G: common_vendor.L({
          placeholder: "Email",
          modelValue: state.model1.userInfo.name
        }),
        H: common_vendor.O("item1", "25a04030-21,25a04030-20"),
        I: common_vendor.L({
          label: "Unique ID",
          prop: "userInfo.name",
          borderBottom: true
        }),
        J: common_vendor.L({
          span: "6"
        }),
        K: common_vendor.L({
          gutter: 40
        }),
        L: common_vendor.J(($event) => state.model1.userInfo.name = $event),
        M: common_vendor.L({
          placeholder: "Name",
          modelValue: state.model1.userInfo.name
        }),
        N: common_vendor.O("item1", "25a04030-25,25a04030-24"),
        O: common_vendor.L({
          label: "Phone Number",
          prop: "userInfo.name",
          borderBottom: true
        }),
        P: common_vendor.L({
          span: "6"
        }),
        Q: common_vendor.J(($event) => state.model1.userInfo.name = $event),
        R: common_vendor.L({
          placeholder: "Email",
          modelValue: state.model1.userInfo.name
        }),
        S: common_vendor.O("item1", "25a04030-28,25a04030-27"),
        T: common_vendor.L({
          label: "Abha",
          prop: "userInfo.name",
          borderBottom: true
        }),
        U: common_vendor.L({
          span: "6"
        }),
        V: common_vendor.L({
          gutter: 40
        }),
        W: common_vendor.O("form1", "25a04030-0"),
        X: common_vendor.L({
          labelWidth: 100,
          labelPosition: "top",
          model: state.model1,
          rules: state.rules
        }),
        Y: common_vendor.J(handleClickGotiRegister),
        Z: common_vendor.L({
          type: "primary",
          size: "mini",
          text: "Register",
          customStyle: {
            width: "240rpx"
          }
        }),
        aa: common_vendor.J(($event) => state.showSex = false),
        ab: common_vendor.J(sexSelect),
        ac: common_vendor.L({
          show: state.showSex,
          actions: state.actions,
          title: "请选择性别",
          description: "如果选择保密会报错"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-25a04030"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
