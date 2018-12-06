export class Comment{
    user: String;
    item: String;
    value:String;
    rating:Number;
    
    constructor(user,item,value,rating){
        this.user=user;
        this.item=item;
        this.value=value;
        this.rating=rating;
    
    }
}
