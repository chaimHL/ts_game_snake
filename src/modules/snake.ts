// 定义表示蛇的类 Snake
class Snake {
    // 装载蛇身体的容器
    element: HTMLElement
    // 蛇头
    head: HTMLElement
    // 蛇身,包括蛇头(HTMLCollection 是“活”的；如果基本的文档改变时，那些改变通过所有 HTMLCollection 对象会立即显示出来)
    body: HTMLCollection

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div') as HTMLElement
        /* 这里不用 document.querySelectorAll('#snake > div') 因为这种方法获取到的元素是固定的，
        每次添加body后都要重新获取 */
        this.body = this.element.getElementsByTagName('div')
    }

    // 获取蛇头坐标
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    // 设置蛇头的坐标
    set X(value: number) {
		// 如果新旧值相同则直接返回
		if (this.X === value) {
			return
		}
		// X值的合法范围在0-290
		if (value < 0 || value > 290) {
			// 进入此判断说明蛇撞墙了
			throw new Error('蛇撞墙了')
		}
		
		// 禁止掉头(注意语句执行顺序)
		if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
			if (value > this.X) { // 说明向左时按了向右键
				// 让蛇继续向左移动
				value = this.X - 10
			} else {
				value = this.X + 10
			}
		}
		
		// 移动身体（注意要写在设置舌头位置的前面）
		this.moveBody()
		
        this.head.style.left = value + 'px' 
		
		// 检查碰撞
		this.checkCollision()
    }
    set Y(value: number) {
		if (this.Y === value) {
			return
		}
		// Y值的合法范围在0-290
		if (value < 0 || value > 290) {
			// 进入此判断说明蛇撞墙了
			throw new Error('蛇撞墙了')
		}
		
		// 禁止掉头(注意语句执行顺序)
		if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
			if (value > this.Y) { // 说明向上时按了向下键
				// 让蛇继续向上移动Y
				value = this.Y - 10
			} else {
				value = this.Y + 10
			}
		}
		
		// 移动身体
		this.moveBody()
        
		this.head.style.top = value + 'px'
		
		// 检查碰撞
		this.checkCollision()
    }

    // 蛇增加身体的方法
    addBody() {
        /* insertAdjacentHTML 将指定的文本解析为 Element 元素，
        并将结果节点插入到DOM树中的指定位置 */
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
	
	// 蛇移动身体的方法
	moveBody() {
		// 将后面的身体的位置设置为前一个身体的位置
		// this.body.length - 1 > 0才开始运行循环代码块，也就是至少有一个身体
		for (let i = this.body.length - 1; i > 0; i--) { 
			// 获取前边身体的位置
			let X = (this.body[i-1] as HTMLElement).offsetLeft
			let Y = (this.body[i-1] as HTMLElement).offsetTop
			// 将值设置到当前身体上
			if (this.body[i]) {
				(this.body[i] as HTMLElement).style.left = X + 'px'
			}
			if (this.body[i]) {
				(this.body[i] as HTMLElement).style.top = Y + 'px'
			}
		}
	}
	
	// 检查蛇头是否和身体发生碰撞
	checkCollision() {
		for (let i = 1; i < this.body.length; i++) {
			let bd = this.body[i] as HTMLElement
			if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
				throw new Error('蛇撞到自己了')
			}
		}
	}
}

export default Snake