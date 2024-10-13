"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
require("./config.js");
const uni_modules_uviewPlus_components_uActionSheet_actionSheet = require("../../components/u-action-sheet/actionSheet.js"), uni_modules_uviewPlus_components_uAlbum_album = require("../../components/u-album/album.js"), uni_modules_uviewPlus_components_uAlert_alert = require("../../components/u-alert/alert.js"), uni_modules_uviewPlus_components_uAvatar_avatar = require("../../components/u-avatar/avatar.js"), uni_modules_uviewPlus_components_uAvatarGroup_avatarGroup = require("../../components/u-avatar-group/avatarGroup.js"), uni_modules_uviewPlus_components_uBackTop_backtop = require("../../components/u-back-top/backtop.js"), uni_modules_uviewPlus_components_uBadge_badge = require("../../components/u-badge/badge.js"), uni_modules_uviewPlus_components_uButton_button = require("../../components/u-button/button.js"), uni_modules_uviewPlus_components_uCalendar_calendar = require("../../components/u-calendar/calendar.js"), uni_modules_uviewPlus_components_uCarKeyboard_carKeyboard = require("../../components/u-car-keyboard/carKeyboard.js"), uni_modules_uviewPlus_components_uCell_cell = require("../../components/u-cell/cell.js"), uni_modules_uviewPlus_components_uCellGroup_cellGroup = require("../../components/u-cell-group/cellGroup.js"), uni_modules_uviewPlus_components_uCheckbox_checkbox = require("../../components/u-checkbox/checkbox.js"), uni_modules_uviewPlus_components_uCheckboxGroup_checkboxGroup = require("../../components/u-checkbox-group/checkboxGroup.js"), uni_modules_uviewPlus_components_uCircleProgress_circleProgress = require("../../components/u-circle-progress/circleProgress.js"), uni_modules_uviewPlus_components_uCode_code = require("../../components/u-code/code.js"), uni_modules_uviewPlus_components_uCodeInput_codeInput = require("../../components/u-code-input/codeInput.js"), uni_modules_uviewPlus_components_uCol_col = require("../../components/u-col/col.js"), uni_modules_uviewPlus_components_uCollapse_collapse = require("../../components/u-collapse/collapse.js"), uni_modules_uviewPlus_components_uCollapseItem_collapseItem = require("../../components/u-collapse-item/collapseItem.js"), uni_modules_uviewPlus_components_uColumnNotice_columnNotice = require("../../components/u-column-notice/columnNotice.js"), uni_modules_uviewPlus_components_uCountDown_countDown = require("../../components/u-count-down/countDown.js"), uni_modules_uviewPlus_components_uCountTo_countTo = require("../../components/u-count-to/countTo.js"), uni_modules_uviewPlus_components_uDatetimePicker_datetimePicker = require("../../components/u-datetime-picker/datetimePicker.js"), uni_modules_uviewPlus_components_uDivider_divider = require("../../components/u-divider/divider.js"), uni_modules_uviewPlus_components_uEmpty_empty = require("../../components/u-empty/empty.js"), uni_modules_uviewPlus_components_uForm_form = require("../../components/u-form/form.js"), uni_modules_uviewPlus_components_uFormItem_formItem = require("../../components/u-form-item/formItem.js"), uni_modules_uviewPlus_components_uGap_gap = require("../../components/u-gap/gap.js"), uni_modules_uviewPlus_components_uGrid_grid = require("../../components/u-grid/grid.js"), uni_modules_uviewPlus_components_uGridItem_gridItem = require("../../components/u-grid-item/gridItem.js"), uni_modules_uviewPlus_components_uIcon_icon = require("../../components/u-icon/icon.js"), uni_modules_uviewPlus_components_uImage_image = require("../../components/u-image/image.js"), uni_modules_uviewPlus_components_uIndexAnchor_indexAnchor = require("../../components/u-index-anchor/indexAnchor.js"), uni_modules_uviewPlus_components_uIndexList_indexList = require("../../components/u-index-list/indexList.js"), uni_modules_uviewPlus_components_uInput_input = require("../../components/u-input/input.js"), uni_modules_uviewPlus_components_uKeyboard_keyboard = require("../../components/u-keyboard/keyboard.js"), uni_modules_uviewPlus_components_uLine_line = require("../../components/u-line/line.js"), uni_modules_uviewPlus_components_uLineProgress_lineProgress = require("../../components/u-line-progress/lineProgress.js"), uni_modules_uviewPlus_components_uLink_link = require("../../components/u-link/link.js"), uni_modules_uviewPlus_components_uList_list = require("../../components/u-list/list.js"), uni_modules_uviewPlus_components_uListItem_listItem = require("../../components/u-list-item/listItem.js"), uni_modules_uviewPlus_components_uLoadingIcon_loadingIcon = require("../../components/u-loading-icon/loadingIcon.js"), uni_modules_uviewPlus_components_uLoadingPage_loadingPage = require("../../components/u-loading-page/loadingPage.js"), uni_modules_uviewPlus_components_uLoadmore_loadmore = require("../../components/u-loadmore/loadmore.js"), uni_modules_uviewPlus_components_uModal_modal = require("../../components/u-modal/modal.js"), uni_modules_uviewPlus_components_uNavbar_navbar = require("../../components/u-navbar/navbar.js"), uni_modules_uviewPlus_components_uNoNetwork_noNetwork = require("../../components/u-no-network/noNetwork.js"), uni_modules_uviewPlus_components_uNoticeBar_noticeBar = require("../../components/u-notice-bar/noticeBar.js"), uni_modules_uviewPlus_components_uNotify_notify = require("../../components/u-notify/notify.js"), uni_modules_uviewPlus_components_uNumberBox_numberBox = require("../../components/u-number-box/numberBox.js"), uni_modules_uviewPlus_components_uNumberKeyboard_numberKeyboard = require("../../components/u-number-keyboard/numberKeyboard.js"), uni_modules_uviewPlus_components_uOverlay_overlay = require("../../components/u-overlay/overlay.js"), uni_modules_uviewPlus_components_uParse_parse = require("../../components/u-parse/parse.js"), uni_modules_uviewPlus_components_uPicker_picker = require("../../components/u-picker/picker.js"), uni_modules_uviewPlus_components_uPopup_popup = require("../../components/u-popup/popup.js"), uni_modules_uviewPlus_components_uRadio_radio = require("../../components/u-radio/radio.js"), uni_modules_uviewPlus_components_uRadioGroup_radioGroup = require("../../components/u-radio-group/radioGroup.js"), uni_modules_uviewPlus_components_uRate_rate = require("../../components/u-rate/rate.js"), uni_modules_uviewPlus_components_uReadMore_readMore = require("../../components/u-read-more/readMore.js"), uni_modules_uviewPlus_components_uRow_row = require("../../components/u-row/row.js"), uni_modules_uviewPlus_components_uRowNotice_rowNotice = require("../../components/u-row-notice/rowNotice.js"), uni_modules_uviewPlus_components_uScrollList_scrollList = require("../../components/u-scroll-list/scrollList.js"), uni_modules_uviewPlus_components_uSearch_search = require("../../components/u-search/search.js"), uni_modules_uviewPlus_components_uSection_section = require("../../components/u-section/section.js"), uni_modules_uviewPlus_components_uSkeleton_skeleton = require("../../components/u-skeleton/skeleton.js"), uni_modules_uviewPlus_components_uSlider_slider = require("../../components/u-slider/slider.js"), uni_modules_uviewPlus_components_uStatusBar_statusBar = require("../../components/u-status-bar/statusBar.js"), uni_modules_uviewPlus_components_uSteps_steps = require("../../components/u-steps/steps.js"), uni_modules_uviewPlus_components_uStepsItem_stepsItem = require("../../components/u-steps-item/stepsItem.js"), uni_modules_uviewPlus_components_uSticky_sticky = require("../../components/u-sticky/sticky.js"), uni_modules_uviewPlus_components_uSubsection_subsection = require("../../components/u-subsection/subsection.js"), uni_modules_uviewPlus_components_uSwipeAction_swipeAction = require("../../components/u-swipe-action/swipeAction.js"), uni_modules_uviewPlus_components_uSwipeActionItem_swipeActionItem = require("../../components/u-swipe-action-item/swipeActionItem.js"), uni_modules_uviewPlus_components_uSwiper_swiper = require("../../components/u-swiper/swiper.js"), uni_modules_uviewPlus_components_uSwiperIndicator_swipterIndicator = require("../../components/u-swiper-indicator/swipterIndicator.js"), uni_modules_uviewPlus_components_uSwitch_switch = require("../../components/u-switch/switch.js"), uni_modules_uviewPlus_components_uTabbar_tabbar = require("../../components/u-tabbar/tabbar.js"), uni_modules_uviewPlus_components_uTabbarItem_tabbarItem = require("../../components/u-tabbar-item/tabbarItem.js"), uni_modules_uviewPlus_components_uTabs_tabs = require("../../components/u-tabs/tabs.js"), uni_modules_uviewPlus_components_uTag_tag = require("../../components/u-tag/tag.js"), uni_modules_uviewPlus_components_uText_text = require("../../components/u-text/text.js"), uni_modules_uviewPlus_components_uTextarea_textarea = require("../../components/u-textarea/textarea.js"), uni_modules_uviewPlus_components_uToast_toast = require("../../components/u-toast/toast.js"), uni_modules_uviewPlus_components_uToolbar_toolbar = require("../../components/u-toolbar/toolbar.js"), uni_modules_uviewPlus_components_uTooltip_tooltip = require("../../components/u-tooltip/tooltip.js"), uni_modules_uviewPlus_components_uTransition_transition = require("../../components/u-transition/transition.js"), uni_modules_uviewPlus_components_uUpload_upload = require("../../components/u-upload/upload.js");
const defProps = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, uni_modules_uviewPlus_components_uActionSheet_actionSheet.A), uni_modules_uviewPlus_components_uAlbum_album.A), uni_modules_uviewPlus_components_uAlert_alert.A), uni_modules_uviewPlus_components_uAvatar_avatar.A), uni_modules_uviewPlus_components_uAvatarGroup_avatarGroup.A), uni_modules_uviewPlus_components_uBackTop_backtop.B), uni_modules_uviewPlus_components_uBadge_badge.B), uni_modules_uviewPlus_components_uButton_button.B), uni_modules_uviewPlus_components_uCalendar_calendar.C), uni_modules_uviewPlus_components_uCarKeyboard_carKeyboard.C), uni_modules_uviewPlus_components_uCell_cell.C), uni_modules_uviewPlus_components_uCellGroup_cellGroup.C), uni_modules_uviewPlus_components_uCheckbox_checkbox.C), uni_modules_uviewPlus_components_uCheckboxGroup_checkboxGroup.C), uni_modules_uviewPlus_components_uCircleProgress_circleProgress.C), uni_modules_uviewPlus_components_uCode_code.C), uni_modules_uviewPlus_components_uCodeInput_codeInput.C), uni_modules_uviewPlus_components_uCol_col.C), uni_modules_uviewPlus_components_uCollapse_collapse.C), uni_modules_uviewPlus_components_uCollapseItem_collapseItem.C), uni_modules_uviewPlus_components_uColumnNotice_columnNotice.C), uni_modules_uviewPlus_components_uCountDown_countDown.C), uni_modules_uviewPlus_components_uCountTo_countTo.C), uni_modules_uviewPlus_components_uDatetimePicker_datetimePicker.D), uni_modules_uviewPlus_components_uDivider_divider.D), uni_modules_uviewPlus_components_uEmpty_empty.E), uni_modules_uviewPlus_components_uForm_form.F), uni_modules_uviewPlus_components_uFormItem_formItem.G), uni_modules_uviewPlus_components_uGap_gap.G), uni_modules_uviewPlus_components_uGrid_grid.G), uni_modules_uviewPlus_components_uGridItem_gridItem.G), uni_modules_uviewPlus_components_uIcon_icon.I), uni_modules_uviewPlus_components_uImage_image.I), uni_modules_uviewPlus_components_uIndexAnchor_indexAnchor.I), uni_modules_uviewPlus_components_uIndexList_indexList.I), uni_modules_uviewPlus_components_uInput_input.I), uni_modules_uviewPlus_components_uKeyboard_keyboard.K), uni_modules_uviewPlus_components_uLine_line.L), uni_modules_uviewPlus_components_uLineProgress_lineProgress.L), uni_modules_uviewPlus_components_uLink_link.L), uni_modules_uviewPlus_components_uList_list.L), uni_modules_uviewPlus_components_uListItem_listItem.L), uni_modules_uviewPlus_components_uLoadingIcon_loadingIcon.L), uni_modules_uviewPlus_components_uLoadingPage_loadingPage.L), uni_modules_uviewPlus_components_uLoadmore_loadmore.L), uni_modules_uviewPlus_components_uModal_modal.M), uni_modules_uviewPlus_components_uNavbar_navbar.N), uni_modules_uviewPlus_components_uNoNetwork_noNetwork.N), uni_modules_uviewPlus_components_uNoticeBar_noticeBar.N), uni_modules_uviewPlus_components_uNotify_notify.N), uni_modules_uviewPlus_components_uNumberBox_numberBox.N), uni_modules_uviewPlus_components_uNumberKeyboard_numberKeyboard.N), uni_modules_uviewPlus_components_uOverlay_overlay.O), uni_modules_uviewPlus_components_uParse_parse.P), uni_modules_uviewPlus_components_uPicker_picker.P), uni_modules_uviewPlus_components_uPopup_popup.P), uni_modules_uviewPlus_components_uRadio_radio.R), uni_modules_uviewPlus_components_uRadioGroup_radioGroup.R), uni_modules_uviewPlus_components_uRate_rate.R), uni_modules_uviewPlus_components_uReadMore_readMore.R), uni_modules_uviewPlus_components_uRow_row.R), uni_modules_uviewPlus_components_uRowNotice_rowNotice.R), uni_modules_uviewPlus_components_uScrollList_scrollList.S), uni_modules_uviewPlus_components_uSearch_search.S), uni_modules_uviewPlus_components_uSection_section.S), uni_modules_uviewPlus_components_uSkeleton_skeleton.S), uni_modules_uviewPlus_components_uSlider_slider.S), uni_modules_uviewPlus_components_uStatusBar_statusBar.S), uni_modules_uviewPlus_components_uSteps_steps.S), uni_modules_uviewPlus_components_uStepsItem_stepsItem.S), uni_modules_uviewPlus_components_uSticky_sticky.S), uni_modules_uviewPlus_components_uSubsection_subsection.S), uni_modules_uviewPlus_components_uSwipeAction_swipeAction.S), uni_modules_uviewPlus_components_uSwipeActionItem_swipeActionItem.S), uni_modules_uviewPlus_components_uSwiper_swiper.S), uni_modules_uviewPlus_components_uSwiperIndicator_swipterIndicator.S), uni_modules_uviewPlus_components_uSwitch_switch.S), uni_modules_uviewPlus_components_uTabbar_tabbar.T), uni_modules_uviewPlus_components_uTabbarItem_tabbarItem.T), uni_modules_uviewPlus_components_uTabs_tabs.T), uni_modules_uviewPlus_components_uTag_tag.T), uni_modules_uviewPlus_components_uText_text.T), uni_modules_uviewPlus_components_uTextarea_textarea.T), uni_modules_uviewPlus_components_uToast_toast.T), uni_modules_uviewPlus_components_uToolbar_toolbar.T), uni_modules_uviewPlus_components_uTooltip_tooltip.T), uni_modules_uviewPlus_components_uTransition_transition.T), uni_modules_uviewPlus_components_uUpload_upload.U);
exports.d = defProps;
//# sourceMappingURL=props.js.map
