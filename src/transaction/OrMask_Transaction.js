
export class OrMask_Transaction{
    constructor(initNum, initIntNum, initMask) {
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    doTransaction() {
        this.num.orMask(mask);
    }

    undoTransaction() {
        this.num.setNum(intNum);
    }

    toString() {
        return "Or Mask " + mask;
    }
}