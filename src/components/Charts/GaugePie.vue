<template>
  <view class="charts">
    <view style="width: 100%; height: 100%"
      ><l-echart ref="chartRef"></l-echart
    ></view>
  </view>
</template>

<script setup>
import {
  onMounted,
  ref,
  nextTick,
  reactive,
  onBeforeUnmount,
  watch,
} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
});

const myChart = ref(null);
const chartRef = ref(null);

watch(
  () => props.value,
  () => {
    setTimeout(async () => {
        myChart.value && myChart.value.setOption(option.value);
    }, 300);
  }
);

onMounted(() => {
  setTimeout(async () => {
    if (!chartRef.value) return;
    myChart.value = await chartRef.value.init(echarts);
    myChart.value.setOption(option.value);
  }, 300);
});

onBeforeUnmount( () => {
	if(myChart.value) {
		myChart.value.dispose()
	}
})

const option = computed(() => {
  return {
    title: {
      text: props.title,
      left: "center",
      top: "10%",
      textStyle: {
        fontSize: 30,
        color: "rgba(6, 255, 184, 1)",
        fontFamily: "FB",
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: props.subTitle,
        type: "gauge",
        center: ["50%", "50%"],
        roundCap: true,
        splitNumber: 0, //刻度数量
        startAngle: 269,
        endAngle: -90,
        radius: "85%",
        min: props.min,
        max: props.max,
        axisLine: {
          show: true,
          lineStyle: {
            width: 40,
            color: [
              [
                1,
                new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(6, 255, 184, 0.2)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(64, 133, 225, 0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(4, 236, 170, 0.2)",
                  },
                ]),
              ],
            ],
          },
        },
        axisTick: {
          show: 0,
        },
        splitLine: {
          show: 0,
        },
        axisLabel: {
          show: 0,
        },
        pointer: {
          show: 0,
        },
        detail: {
          show: 0,
        },
      },
      {
        name: props.subTitle,
        type: "gauge",
        center: ["50%", "50%"],
        splitNumber: 0, //刻度数量
        startAngle: 269,
        endAngle: -90,
        radius: "80%",
        min: props.min,
        max: props.max,
        z: 2,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: 0,
        },
        splitLine: {
          show: 0,
        },
        axisLabel: {
          show: 0,
        },
        pointer: {
          show: true,
          icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAB0CAYAAACfQfLZAAABP2lDQ1BzUDMAAHicY2BgfJCTnFvMosDAkJtXUhTk7qQQERmlwP6IgZlBhIGTgY9BNjG5uMA32C2EAQiKE8uLk0uKchhQwLdrDIwg+rJuRmJeSuBGvvA5PAySFjsnd7Al7qhhwA+4UlKLk4H0HyBWSi4oKmFgYFQAsctLCkBsFyBbJDkjMQXIjgCydYqADgSyW0Di6RD2DBA7CcJeA2IXhQQ5A9kHgGyFdCR2EhI7N6c0GeoGkOt5UvNCg4E0GxDLMBQzBDAYA8MEnxpnIDRgUASFF3o4FKcZG0F08TgxMLDe+///syoDA/tkBoa/E/7//73w//+/ixgYmO8wMBzIQ+hvvs/AYLv/////uxFiXvsZGDaaA4NpJ0JMw4KBQZCLgeHEzoLEokSwEDMQM6VlMjB8Ws7AwBvJwCB8AagnGgDgnl/JCHJJ9gAAAARzQklUCAgICHwIZIgAAAHzSURBVGiB7Zo9bhsxEIXfkDShYgvXqpRmAUGNj2DfwI3OkeQE5g3knEONb5BcQliAjX0CwcUCVnZJTooogiAjlg1pZNDmNIOFVu/D/EHDXRF2rGmakdb6hpkvAIwAnO/es2OPAB6J6C7G+GM8Hj9sf0jbF977GTN/2yP4ohHRbV3X358BvPc/mfnyEPEtyK+6rq8AQK3FZ8cSBwBmvvTezwCAmqYZKaXujyW+bSmlL0pr/VVCHAC01jeKma+lAMx8obC/DQ+xkTTgXAmKA1i3aQEUQAEUQAEUQAEUQAHAAGBRQEopigKYWRYgHgEA8RQFUcBJikxEYGZIeMPMkfnvKEj4DzAH+Q/aKVIkO2ilBu8PKCl6DSDzOShd9AkAp6hBEF1bAJS15WWAeAT5pwjlAPLuAEjXIP8IYoyiALVOUZTyZn0BAJDwKqUUiChIeQNgUwYJn38XfYC9KP8UEVHmBxBIz0Hf95kXOf/VMf85yH/xEgdorTOPQPz3QBwQQpAFDAYD2UETj6Bt22Ctpf23vt26rmNjjOmttVoCYK1NJoTQrVYrKwFYLpe/TVVVTwBEIhgOhysCAOecbdv27JjiVVX1zrluU1znnMXx3i8n51wH7PyhdTqd6slkclBHLRYLns/nm9b/nxj9e2r1FiOiZ1/6A6VUptoFTzbAAAAAAElFTkSuQmCC",
          length: 80,
          width: 13,
          showAbove: true,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        detail: {
          show: 0,
        },
        data: [
          {
            value: props.value,
          },
        ],
      },
      // 内侧指针、数值显示
      {
        name: props.subTitle,
        type: "gauge",
        center: ["50%", "50%"],
        splitNumber: 0, //刻度数量
        startAngle: 269,
        endAngle: -90,
        radius: "80%",
        min: props.min,
        max: props.max,
        z: 1,
        axisLine: {
          show: true,
          lineStyle: {
            width: 0,
            color: [
              [
                1,
                new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(35,42,49,0.9)",
                  },
                  {
                    offset: 1,
                    color: "rgba(27,32,40,0.9)",
                  },
                ]),
              ],
            ],
          },
        },
        axisTick: {
          show: 0,
        },
        splitLine: {
          show: 0,
        },
        axisLabel: {
          show: 0,
        },
        pointer: {
          show: false,
          icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAB0CAYAAACfQfLZAAABP2lDQ1BzUDMAAHicY2BgfJCTnFvMosDAkJtXUhTk7qQQERmlwP6IgZlBhIGTgY9BNjG5uMA32C2EAQiKE8uLk0uKchhQwLdrDIwg+rJuRmJeSuBGvvA5PAySFjsnd7Al7qhhwA+4UlKLk4H0HyBWSi4oKmFgYFQAsctLCkBsFyBbJDkjMQXIjgCydYqADgSyW0Di6RD2DBA7CcJeA2IXhQQ5A9kHgGyFdCR2EhI7N6c0GeoGkOt5UvNCg4E0GxDLMBQzBDAYA8MEnxpnIDRgUASFF3o4FKcZG0F08TgxMLDe+///syoDA/tkBoa/E/7//73w//+/ixgYmO8wMBzIQ+hvvs/AYLv/////uxFiXvsZGDaaA4NpJ0JMw4KBQZCLgeHEzoLEokSwEDMQM6VlMjB8Ws7AwBvJwCB8AagnGgDgnl/JCHJJ9gAAAARzQklUCAgICHwIZIgAAAHzSURBVGiB7Zo9bhsxEIXfkDShYgvXqpRmAUGNj2DfwI3OkeQE5g3knEONb5BcQliAjX0CwcUCVnZJTooogiAjlg1pZNDmNIOFVu/D/EHDXRF2rGmakdb6hpkvAIwAnO/es2OPAB6J6C7G+GM8Hj9sf0jbF977GTN/2yP4ohHRbV3X358BvPc/mfnyEPEtyK+6rq8AQK3FZ8cSBwBmvvTezwCAmqYZKaXujyW+bSmlL0pr/VVCHAC01jeKma+lAMx8obC/DQ+xkTTgXAmKA1i3aQEUQAEUQAEUQAEUQAHAAGBRQEopigKYWRYgHgEA8RQFUcBJikxEYGZIeMPMkfnvKEj4DzAH+Q/aKVIkO2ilBu8PKCl6DSDzOShd9AkAp6hBEF1bAJS15WWAeAT5pwjlAPLuAEjXIP8IYoyiALVOUZTyZn0BAJDwKqUUiChIeQNgUwYJn38XfYC9KP8UEVHmBxBIz0Hf95kXOf/VMf85yH/xEgdorTOPQPz3QBwQQpAFDAYD2UETj6Bt22Ctpf23vt26rmNjjOmttVoCYK1NJoTQrVYrKwFYLpe/TVVVTwBEIhgOhysCAOecbdv27JjiVVX1zrluU1znnMXx3i8n51wH7PyhdTqd6slkclBHLRYLns/nm9b/nxj9e2r1FiOiZ1/6A6VUptoFTzbAAAAAAElFTkSuQmCC",
          length: 80,
          width: 13,
          showAbove: true,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        progress: {
          show: true,
          width: 10,
          roundCap: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#06FFB8" }, // 红色
              { offset: 0.5, color: "#4085E1" }, // 黄色
              { offset: 1, color: "#04ECAA" }, // 绿色
            ]),
          },
        },
        title: {
          show: true,
          offsetCenter: [0, "-40%"],
          color: "rgba(6, 255, 184, 1)",
          fontSize: 24,
          fontFamily: "FB",
          borderRadius: 21,
          padding: 5,
        },
        detail: {
          show: true,
          offsetCenter: [0, "0"],
          textStyle: {
            fontSize: 40,
            color: "#fff",
          },
          formatter: `{a|{value}} {b|${props.unit}}`,
          rich: {
            a: {
              fontSize: 40,
              lineHeight: 40,
              color: "#ddd",
              padding: [30, 0, 0, 0],
            },
            b: {
              fontSize: 20,
              lineHeight: 10,
              color: "#ddd",
              padding: [30, 0, 0, 0],
            },
          },
        },
        itemStyle: {
          normal: {
            color: "#FFED8B",
            borderWidth: 20,
          },
        },
        data: [
          {
            value: props.value,
            name: props.subTitle,
          },
        ],
      },
    ],
  };
});
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>