
export class AddToNum_Transaction{
    constructor(initNum, initAmountToAdd){
        this.num = initNum;
        this.amountToAdd = initAmountToAdd;
    }

    doTransaction(){
        let oldNum = this.num.getNum();
        let newNum = oldNum+this.amountToAdd;
        this.num.setNum(newNum);
    }

    undoTransaction(){
        console.log("undo ran")
        let oldNum = this.num.getNum();
        let newNum = oldNum-this.amountToAdd;
        this.num.setNum(newNum);
    }

    toString(){
        return "Add" + this.amountToAdd;
    }
}