
export class AndMask_Transaction{
    constructor(initNum, initIntNum, initMask){
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;

        console.log(initNum)
        console.log(this.intNum)
    }

    doTransaction() {
        this.num.andMask(this.mask);
    }

    undoTransaction() {
        this.num.setNum(this.intNum);
    }

    toString() {
        return "And Mask " + this.mask;
    }
}