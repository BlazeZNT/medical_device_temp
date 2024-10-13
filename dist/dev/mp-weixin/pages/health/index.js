"use strict";
const common_vendor = require("../../common/vendor.js"), common_assets = require("../../common/assets.js"), slibrary_index = require("../../slibrary/index.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.K("up-button");
  const _easycom_up_col2 = common_vendor.K("up-col");
  const _easycom_up_row2 = common_vendor.K("up-row");
  (_easycom_up_button2 + _easycom_up_col2 + _easycom_up_row2)();
}
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_col = () => "../../uni_modules/uview-plus/components/u-col/u-col.js";
const _easycom_up_row = () => "../../uni_modules/uview-plus/components/u-row/u-row.js";
if (!Math) {
  (_easycom_up_button + _easycom_up_col + _easycom_up_row)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const generalHealthCheckupTags = common_vendor.p([
      {
        label: "Height"
      },
      {
        label: "Blood Pressure"
      },
      {
        label: "SP02"
      },
      {
        label: "Hemoglobin"
      },
      {
        label: "SP02"
      },
      {
        label: "Body Fat"
      },
      {
        label: "Height"
      },
      {
        label: "Body Fat"
      },
      {
        label: "Hemoglobin"
      },
      {
        label: "Vision"
      }
    ]);
    common_vendor.p([
      {
        label: "Height"
      },
      {
        label: "Blood Pressure"
      },
      {
        label: "SP02"
      },
      {
        label: "Hemoglobin"
      },
      {
        label: "SP02"
      },
      {
        label: "Body Fat"
      },
      {
        label: "Height"
      },
      {
        label: "Body Fat"
      },
      {
        label: "Hemoglobin"
      },
      {
        label: "Vision"
      }
    ]);
    const selectTags = common_vendor.p([]);
    const handleClickItem = (item) => {
      if (selectTags.value.includes(item.label)) {
        selectTags.value = selectTags.value.filter((s) => s == item.label);
        return;
      }
      selectTags.value.push(item.label);
    };
    const handleClickGotiRegister = () => {
      slibrary_index.s.$router.go("/pages/health/detection");
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._,
        b: common_vendor.L({
          type: "default",
          size: "mini",
          text: "Select All",
          customStyle: {
            width: "100rpx",
            border: "1px solid #333"
          },
          shape: "circle"
        }),
        c: common_vendor.M(generalHealthCheckupTags.value, (item, index, i0) => {
          return {
            a: common_vendor.J(($event) => handleClickItem(item), index),
            b: "f9bb84ee-3-" + i0 + "," + ("f9bb84ee-2-" + i0),
            c: common_vendor.L({
              type: selectTags.value.includes(item.label) ? "primary" : "default",
              size: "mini",
              text: item.label,
              customStyle: {
                border: "1px solid #333"
              },
              shape: "circle"
            }),
            d: index,
            e: "f9bb84ee-2-" + i0 + ",f9bb84ee-1"
          };
        }),
        d: common_vendor.L({
          span: "3"
        }),
        e: common_vendor.L({
          gutter: "30"
        }),
        f: common_vendor.M(generalHealthCheckupTags.value, (item, index, i0) => {
          return {
            a: common_vendor.J(($event) => handleClickItem(item), index),
            b: "f9bb84ee-6-" + i0 + "," + ("f9bb84ee-5-" + i0),
            c: common_vendor.L({
              type: selectTags.value.includes(item.label) ? "primary" : "default",
              size: "mini",
              text: item.label,
              customStyle: {
                border: "1px solid #333"
              },
              shape: "circle"
            }),
            d: index,
            e: "f9bb84ee-5-" + i0 + ",f9bb84ee-4"
          };
        }),
        g: common_vendor.L({
          span: "3"
        }),
        h: common_vendor.L({
          gutter: "30"
        }),
        i: common_vendor.J(handleClickGotiRegister),
        j: common_vendor.L({
          type: "primary",
          size: "mini",
          text: "Submit",
          customStyle: {
            width: "240rpx"
          }
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-f9bb84ee"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
