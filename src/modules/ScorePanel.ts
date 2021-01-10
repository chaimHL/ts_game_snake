// 定义表示记分牌的类
class ScorePanel {
    // 分数与等级
    score = 0
    level = 1
    // 分数与等级所在的dom元素
    scoreEle: HTMLElement
    levelEle: HTMLElement

    // 等级上限(默认设置为10)
    maxLevel: number
    // 升级需要的分数(默认设置为10)
    upScore: number

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 增加分数的方法
    addScore() {
        /* 
            ++要写在this.score之前，这样得到的结果才是增1之后的。
            后面的 + '' 是因为this.scoreEle.innerHTML类型要求是字符串，
            而this.score是数值，所以拼个''转成字符串
        */
        this.scoreEle.innerHTML = ++this.score + ''

        // 判断分数是足够升级
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    // 增加等级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

export default ScorePanel