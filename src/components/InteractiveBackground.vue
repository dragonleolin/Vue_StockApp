<template>
  <div ref="p5Container" class="p5-canvas-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import p5 from 'p5'

const p5Container = ref(null)
let myp5 = null

const sketch = (p) => {
  let particles = []
  const maxParticles = 60
  // 街機/科技風粒子顏色
  const colors = ['#00F0FF', '#39FF14', '#4A90E2', '#333333']

  class PixelParticle {
    constructor() {
      this.x = p.random(p.windowWidth)
      this.y = p.random(p.windowHeight)
      this.vx = p.random(-0.5, 0.5)
      this.vy = p.random(-0.5, 0.5)
      this.size = p.random([3, 4, 6]) 
      this.color = p.random(colors)
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      if (this.x < 0) this.x = p.windowWidth
      if (this.x > p.windowWidth) this.x = 0
      if (this.y < 0) this.y = p.windowHeight
      if (this.y > p.windowHeight) this.y = 0
    }

    draw() {
      p.noStroke()
      p.fill(this.color)
      p.rect(this.x, this.y, this.size, this.size) // 畫方形粒子
    }
  }

  p.setup = () => {
    // 強制使用視窗寬高，確保畫布一定會長出來
    p.createCanvas(p.windowWidth, p.windowHeight)
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new PixelParticle())
    }
  }

  p.draw = () => {
    // 帶有透明度的背景，製造殘影效果
    p.background(5, 7, 10, 80)

    // 畫背景淡淡的網格
    p.stroke('rgba(0, 240, 255, 0.05)')
    p.strokeWeight(1)
    for (let x = 0; x < p.width; x += 50) p.line(x, 0, x, p.height)
    for (let y = 0; y < p.height; y += 50) p.line(0, y, p.width, y)

    // 更新粒子
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
      
      // 粒子之間的連線 (科技感來源)
      for (let j = i + 1; j < particles.length; j++) {
        let d = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
        if (d < 100) {
          p.stroke('rgba(0, 240, 255, 0.2)')
          p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
        }
      }
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}

onMounted(() => {
  if (p5Container.value) {
    myp5 = new p5(sketch, p5Container.value)
  }
})

onUnmounted(() => {
  if (myp5) myp5.remove()
})
</script>

<style scoped>
/* 絕對定位的畫布容器，設定 z-index 為 0，並鋪滿全螢幕 */
.p5-canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0; 
  background-color: #05070A; /* 極深底色 */
  pointer-events: none; /* 確保不會干擾滑鼠點擊 */
}

/* 確保畫布不會產生卷軸 */
:deep(canvas) {
  display: block;
}
</style>