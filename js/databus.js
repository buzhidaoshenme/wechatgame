import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.bullets    = []
    this.bullets2   = []
    this.enemys     = []
    this.animations = []
    this.gameOver   = false
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    let temp = this.enemys.shift()

    temp.visible = false

    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    let temp = this.bullets.shift()  //原版的简化处理

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }
  
  removeBullets2(bullet2) {
    let temp = this.bullets2.shift()  //原版的简化处理

    temp.visible = false

    this.pool.recover('bullet2', bullet2)
  }
}
