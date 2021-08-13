export class Shape{



    constructor(private _x: number,
                private _y: number){  
    }

    /**
     * Getter x
     * @return {number}
     */
	public get x(): number {
		return this._x;
	}

    /**
     * Getter y
     * @return {number}
     */
	public get y(): number {
		return this._y;
	}

    /**
     * Setter x
     * @param {number} value
     */
	public set x(value: number) {
		this._x = value;
	}

    /**
     * Setter y
     * @param {number} value
     */
	public set y(value: number) {
		this._y = value;
	}

    getInfo(): string{
        return `x=${this._x}, y=${this._y}`;
    }

}