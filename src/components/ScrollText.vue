<template>
  <div class="text-container">
    <span ref="scrollText" :class="{'scroll-text': isOverflow}">
      {{ content }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    scrollDuration: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      isOverflow: false, // 判断文字是否超出容器
    };
  },
  mounted() {
    this.checkOverflow();
  },
  methods: {
    checkOverflow() {
      const container = this.$el;
      const text = this.$refs.scrollText;

      this.$nextTick(() => {
        // 判断文本宽度是否超出容器宽度
        this.isOverflow = text.offsetWidth > container.offsetWidth;
        if (this.isOverflow) {
          container.style.setProperty('--scrollDuration', `${this.scrollDuration}s`);
        }
      });
    },
  },
};
</script>

<style scoped>
.text-container {
  width: 100%;
  max-width: 300px; /* 可以根据需要调整容器宽度 */
  overflow: hidden;
  /* border: 1px solid #ccc; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll-text {
  display: inline-block;
  white-space: nowrap;
  animation: marquee var(--scrollDuration) linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
