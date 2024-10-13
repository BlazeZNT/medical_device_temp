"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js"), uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.d({
  props: {
    // 给col添加间距，左右边距各占一半
    gutter: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.row.gutter
    },
    // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
    justify: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.row.justify
    },
    // 垂直对齐方式，可选值为top、center、bottom
    align: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.row.align
    }
  }
});
exports.p = props;
//# sourceMappingURL=props.js.map
