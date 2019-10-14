
export class OrMask_Transaction{
    constructor(initNum, initIntNum, initMask) {
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    doTransaction() {
        this.num.orMask(this.mask);
    }

    undoTransaction() {
        console.log("this runs")
        this.num.setNum(this.intNum);
    }

    toString() {
        return "Or Mask " + this.mask;
    }
}