import {Comment} from './comment'
export class Fruits{
    name: String;
    descript: String;
    price: Number;
    tax:Number;
    quantity: Number;
    purchase:Number;
    comments:Comment[]
    
    constructor(name,descript,price,tax,quantity,purchase,comments){
        this.name=name;
        this.descript=descript;
        this.price=price;
        this.tax=tax;
        this.quantity=quantity;
        this.purchase=purchase;
        this.comments=comments
    }
}

