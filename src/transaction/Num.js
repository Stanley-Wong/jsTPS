
export class Num{
    constructor() {
        this.num = 0;
    }

    setNum(initNum) {
        num = initNum;
    }

    getNum(){
        return this.num;
    }

    andMask(mask) {
        num = num & mask;
    }

    orMask(mask) {
        num = num | mask;
    }
}