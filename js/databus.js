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
    this.enemys     = []
    this.animations = []
    this.gameStatus = DataBus.GameRunning
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    let temp = (enemy === undefined) ?
      this.enemys.shift() : this.enemys.splice(this.enemys.indexOf(enemy), 1)

    temp.visible = false

    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    //let temp = this.bullets.shift()  //原版的简化处理
    let temp = (bullet === undefined) ? 
      this.bullets.shift() : this.bullets.splice(this.bullets.indexOf(bullet), 1)

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }
}

DataBus.GameRunning = 0
DataBus.GameOver = 1
DataBus.GamePaused = 2
