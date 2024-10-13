"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const activeIndex = common_vendor.p(0);
    const stepArr = common_vendor.T([
      {
        id: 1,
        text: "Height"
      },
      {
        id: 2,
        text: "BodyFat"
      },
      {
        id: 3,
        text: "Erwen"
      },
      {
        id: 4,
        text: "Oximeter"
      },
      {
        id: 5,
        text: "BloodPressure"
      },
      {
        id: 6,
        text: "RandomBloodSugar"
      },
      {
        id: 7,
        text: "HBA1C"
      },
      {
        id: 8,
        text: "HemoglobinTest"
      },
      {
        id: 9,
        text: "Lipid"
      },
      {
        id: 10,
        text: "SixLeadECG"
      },
      {
        id: 10,
        text: "Spirometry"
      },
      {
        id: 10,
        text: "CardiovascularSystemicExamination"
      },
      {
        id: 10,
        text: "SnellenChart"
      },
      {
        id: 10,
        text: "Audiometry"
      },
      {
        id: 10,
        text: "Dermascope"
      },
      {
        id: 10,
        text: "Otoscope"
      }
    ]);
    const handleClickStep = (item, index) => {
      activeIndex.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.M(stepArr.value, (item, index, i0) => {
          return common_vendor.P({
            a: common_vendor.R(item.text),
            b: activeIndex.value == index
          }, activeIndex.value == index ? {} : {}, {
            c: common_vendor.S(activeIndex.value == index ? "activeSetp" : ""),
            d: common_vendor.S(item.status == "pass" ? "doneStep" : ""),
            e: item.id,
            f: common_vendor.J(($event) => handleClickStep(item, index), item.id)
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-9020e834"]]);
wx.createComponent(Component);
//# sourceMappingURL=index.js.map
