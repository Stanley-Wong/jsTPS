
export class AndMask_Transaction{
    constructor(initNum, initIntNum, initMask){
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    doTransaction() {
        this.num.andMask(mask);
    }

    undoTransaction() {
        this.num.setNum(intNum);
    }

    toString() {
        return "And Mask " + this.mask;
    }
}