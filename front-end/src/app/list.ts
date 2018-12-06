export class List{
    user:String;
    name: String;
    descript: String;
    items:[{fruit:String,quantity:String}]
    
    constructor(user,name,descript,items){
        this.user=user;
        this.name=name;
        this.descript=descript;
        this.items=items
    }
}