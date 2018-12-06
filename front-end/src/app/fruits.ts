import {Comment} from './comment'
export class Fruits{
    name: String;
    descript: String;
    price: Number;
    quantity: Number;
    purchase:Number;
    comments:Comment[]
    
    constructor(name,descript,price,quantity,purchase,comments){
        this.name=name;
        this.descript=descript;
        this.price=price;
        this.quantity=quantity;
        this.purchase=purchase;
        this.comments=comments
    }
}

