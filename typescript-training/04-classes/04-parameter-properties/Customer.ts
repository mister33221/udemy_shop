class Customer{


    constructor(private _firstName: string, 
                private _lastName: string){

    }

    /**
     * Getter firstName
     * @return {string}
     */
	public get firstName(): string {
		return this._firstName;
	}

    /**
     * Getter lastName
     * @return {string}
     */
	public get lastName(): string {
		return this._lastName;
	}

    /**
     * Setter firstName
     * @param {string} value
     */
	public set firstName(value: string) {
		this._firstName = value;
	}

    /**
     * Setter lastName
     * @param {string} value
     */
	public set lastName(value: string) {
		this._lastName = value;
	}



}

//let's create av instance
// let myCustomer1 = new Customer(); //這樣空白會跳錯誤 因為上面有兩個變數要填

// myCustomer1.firstName = "firstName1";
// myCustomer1.lastName = "lastName1";

// console.log(myCustomer1.firstName);
// console.log(myCustomer1.lastName);

//------------------------

let myCustomer2 = new Customer("firstName2", "lastName2");
console.log(myCustomer2.firstName);
console.log(myCustomer2.lastName);
