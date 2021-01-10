import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './snake'

// 游戏控制器，控制其他所有类
class GamoControl {
    // 食物
    food: Food
    // 记分牌
    scorePanel: ScorePanel
    // 蛇
    snake: Snake
    // 蛇的移动方向（按键方向）
    direction: string = ''
    // 蛇是否存活(游戏是否继续)
    isLive = true

    constructor() {
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.snake = new Snake()

        this.init()
    }

    // 游戏初始化
    init() {
        /* 绑定键盘按下事件
        .bind(this)是为了让keydownHandler里的this指向的是GamoControl
        bind 返回的是一个新的函数，要调用它才会被执行，所以这里不用call，用call就直接执行了 */
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        // 让蛇移动
        this.run()
    }

    // 键盘按下响应函数
    keydownHandler(event: KeyboardEvent) {
        /*  
            console.log(event.key);
            上：ArrowUp      IE中则为  Up
            下：ArrowDown              Down
            左：ArrowLeft              Left
            右：ArrowRight             Right
        */
        // 检查event.key是否是上下左右四个按键之一
        this.direction = event.key
    }

    // 让蛇移动的方法
    run() {
        // 获取蛇现在的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        // 根据按键方向改变X和Y
        // switch-case，可以好几个case做同一个处理
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10
                break;
        }
		
		// 检测蛇是否吃到食物了
		this.checkEat(X, Y)
		
        // 修改蛇的X和Y
		try {
			this.snake.X = X
			this.snake.Y = Y
		} catch(e) {
			// 进入异常，说明蛇撞墙了
			alert(e)
			this.isLive = false
		}

        /* 
        初始化里调用run之后，移动一次，执行到这，300ms后又移动一次，然后不断循环，就会一直动。
        这里this.run函数作为另一个的参数了，所以bind(this)保证this的指向正确。
        300 - (this.scorePanel.level - 1) * 30是让移动速度随等级增长变快
        */
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }
	
	// 检测蛇吃到食物
	checkEat(X: number, Y: number) {
		if(X === this.food.X && Y === this.food.Y) {
			// 食物位置改变
			this.food.change()
			// 分数增加
			this.scorePanel.addScore()
			// 蛇身体增加
			this.snake.addBody()
		} 
	}
}

export default GamoControl