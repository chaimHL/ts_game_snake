// 定义食物类 Food
class Food {
	// 定义一个属性表示食物所对应的元素
	element: HTMLElement
	constructor() {
		// 获取页面中的 food 元素并赋值给 element
		// !是告诉 ts id为food的元素一定有，this.element 不会为null
		this.element = document.getElementById('food')!
	}
	// 获取食物X轴坐标
	get X() {
		return this.element.offsetLeft
	}
	// 获取食物y轴坐标
	get Y() {
		return this.element.offsetTop
	}
	// 修改食物的位置
	change() {
		/* 
		生成随机位置，
		因为舞台(#stage)的宽度为300，食物的宽度为10，
		所以食物的左上角那个点的范围应该在[0,290]。
		又因为蛇每移动一次的距离固定是10，
		所以食物的坐标应该是10的倍数。
		Math.random()产生一个[0，1)之间的随机数，
		不包括1，所以用Math.round确保最终可以取到290
		*/
		const top = Math.round(Math.random() * 29) * 10
		const left = Math.round(Math.random() * 29) * 10

		this.element.style.top = top + 'px'
		this.element.style.left = left + 'px'
	}
}

export default Food