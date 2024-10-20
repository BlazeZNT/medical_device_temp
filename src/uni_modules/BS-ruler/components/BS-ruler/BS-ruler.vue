<template>
	<div class="horizontal-container">
		<div class="standard-line" :style="{'transform': `translateX(${placeholder-6}px)`}"></div>
		<div class="scroll-wrapper" ref="scale">
			<div class="scroll-content" :style="silderStyle">
				<div class="scroll-item" v-for="(item, index) in list" :key="index" :class="[ group===16 ? 'inchb' : 'limb', index === 1 ? 'first-li' : null, index === 2 ? 'second-li' : null]" :style="item.itemStyle">
					<span class="limb-number" :style="item.numberStyle" >{{ item.number }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from '@better-scroll/core';
export default {
  props: {
    // 当前刻度value
    value: {
      type: Number,
      default: 0,
    },
    // 最大数
    max: {
      type: Number,
      default: 100,
    },
    // 最小数
    min: {
      type: Number,
      default: 0,
    },
    // 刻度与刻度之间的距离
    interval: {
      type: Number,
      default: 8,
    },
    // 左右两边留白的空间，px
    placeholder: {
      type: Number,
      default: 0,
    },
    // 刻度组合，多少刻度为一组
    group: {
      type: Number,
      default: 10,
    },
    // 垂直翻转
    flipVertical: Boolean,
    // 刻度数格式
    format: {
      type: Function,
      default: e => e,
    },
  },
  data() {
    return {
      ratio: 1, // 一刻度的值
      bs: null,
      list: [],
	  silderStyle: null,
	  isFlag: false,
    };
  },
  created() {
    this.ratio = this.group == 16 ? 0.625 : 1;
	this.scaleList();
  },
  mounted() {
	this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    init() {
	  this.setItemStyle();
      const x = this.calcScrollX();
      const scrollX = true;
      const scrollY = false;
      const startX = x;
      const startY = 0;
      const preventDefault =false;
      this.bs = new BScroll(this.$refs.scale, {
        scrollX,
        scrollY,
        startX,
        startY,
        preventDefault,
        probeType: 3, // 实时派发
      });
      this.bs.on('scrollStart', e => {
        // console.log('scrollStart-', e);
      });
      this.bs.on('scroll', e => {
        // console.log('scrolling-', e);
      });
      this.bs.on('scrollEnd', e => {
		if (this.isFlag) {
			return;
		}
		this.isFlag = true;
		let position = this.calculatePosition(e);
		let value = this.calcValue(e);
		position = position ? ((position).toFixed(0))*1 : 0;
		position = this.group === 16 ? Math.abs(((position * this.ratio).toFixed(4))*1) : Math.abs(position);
		position = position > this.max ? this.max : position;
		const valueN = position - this.min;
		const x = (valueN * this.interval) / this.ratio;
		this.setScrollTo(x * -1);
		setTimeout(() => {
			this.$emit("scrollEnd", Math.abs(position));
		    this.isFlag = false;
		}, 500);
      });
    },
	setScrollTo(x) {
		this.bs.scrollTo(x, 0, 300);
	},
    calcScrollX() {
      const value = this.value - this.min;
      const x = (value * this.interval) / this.ratio;
      return -x;
    },
	calcValue({ x, y }) {
		const xy = this.direction ? x : y
		const round = Math.round(xy / this.interval)
		const value = Math.abs(round * this.ratio) + this.min
		const num = Number(this.limbNumber(value))
		return num
	},
	limbNumber(num) {
		return Number.isInteger(num) ? parseInt(num) : num.toFixed(1)
	},
	setItemStyle() {
		const value = (this.max - this.min) / this.ratio;
		const width = value * this.interval + this.placeholder * 2;
		const height = value * this.interval + this.placeholder * 2;
		const flipVertical = "rotateX(0deg)";
		
		// silder样式
		this.silderStyle = {
		  width: `${width}px`,
		  height: "inherit"
		};
	},
	calculatePosition(e) {
		 return e.x / this.interval;
	},
    scaleList() {
	  const firstLiStyle = {
	  	 width: `${this.placeholder}px`,
	  	 height: "inherit"
	  };
	  const liWidth = this.interval * this.group;
	  const widthGroup = this.group * this.interval;
	  const max = this.max / this.ratio / this.group;
	  const min = this.min / this.ratio / this.group;
	  const bsx = liWidth - this.interval + 1;
	  const bsy = (liWidth - this.interval + 1) / 2;
	  const x = bsx;
	  const y = bsy;
	  let list = [];
	  for (let i = min; i <= max; i++) {
		  const value = i * this.ratio * this.group;
		  const ifs = i === min;
		  const width = ifs ? `${this.interval}px` : `${widthGroup}px`;
		  const item = {
			  number: this.format(this.limbNumber(value)),
		  };
		  item.itemStyle = {
			  width: width,
			  height: "120upx",
			  "background-size": `${x}px ${y}px`
		  }
		  item.numberStyle = {
			  width: i === 0 ? width : liWidth + "px",
			  left: i === 0 ? '-5upx' : `${(widthGroup/2 - 8)}px`,
		  }
		  list.push(item);
	  }
	  list.unshift({ itemStyle: firstLiStyle }) // 左边空白区域
	  list.push({ itemStyle: firstLiStyle }) // 右边空白区域
	  this.list = list;
    },
  },
};
</script>
<style lang="scss" scoped>
	.horizontal-container{
		position: relative;
		.standard-line{
			position: absolute;
			z-index: 99;
			border-top: 16px #333333 dashed;
			border-left: 6px transparent dashed;
			border-bottom: 6px transparent dashed;
			border-right: 6px transparent solid;
			top: -38upx;
		}
		.scroll-wrapper {
			position: relative;
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			.scroll-content {
			  display: inline-block;
			}
			.scroll-item {
			  height: 120upx;
			  line-height: 120upx;
			  font-size: 34upx;
			  display: inline-block;
			  text-align: right;
			}
			
			.limb {
				display: inline-block;
				height: inherit;
				background-image: url(./scale-h2.png);
				background-repeat: no-repeat;
				position: relative;
				> .limb-number {
					position: absolute;
					top: 50upx;
					font-style: normal;
					text-align: center;
				}
			}
			.limb.first-li {
				background-image: url(./scale-h1.png);
			}
			
			.inchb {
				display: inline-block;
				height: inherit;
				background-image: url(./inch.png);
				background-repeat: no-repeat;
				position: relative;
				> .limb-number {
					position: absolute;
					top: 50upx;
					font-style: normal;
					text-align: center;
				}
			}
			.inchb.first-li {
				background-image: url(./inch-first.png)!important;
			}
		}
	}
</style>
