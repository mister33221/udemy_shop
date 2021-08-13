import { Shape } from "./Shape";

export class Circle extends Shape{




	constructor(theX: number, 
                theY: number, 
                private _radius:number) {
        super(theX, theY);
	}


    /**
     * Getter radius
     * @return {number}
     */
	public get radius(): number {
		return this._radius;
	}

    /**
     * Setter radius
     * @param {number} value
     */
	public set radius(value: number) {
		this._radius = value;
	}

    getInfo(): string{
        return super.getInfo() + `, radius=${this._radius}`;
    }

}