
export class CoffeeTypeArray{
    public coffeeTypeArray: any = {
        "hot": [1,2,3],
        "cold": [4,5,6]
    }

    getCoffeeTypesArray():any[] {
        return this.coffeeTypeArray;
    }
}
