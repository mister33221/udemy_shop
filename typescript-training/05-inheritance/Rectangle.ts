import { Shape } from "./Shape";

export class Rectangle extends Shape{



    constructor(theX: number,
                theY: number,
                private _width: number,
                private _length: number){
        super(theX,theY)
                }

    /**
     * Getter width
     * @return {number}
     */
	public get width(): number {
		return this._width;
	}

    /**
     * Getter length
     * @return {number}
     */
	public get length(): number {
		return this._length;
	}

    /**
     * Setter width
     * @param {number} value
     */
	public set width(value: number) {
		this._width = value;
	}

    /**
     * Setter length
     * @param {number} value
     */
	public set length(value: number) {
		this._length = value;
	}

    getInfo(): string{
        return super.getInfo() + `, width=${this._width}, length=${this._length}`;
    }
}