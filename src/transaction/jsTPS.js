

class jsTPS{

    constructor() {
        this.transactions = new Array();
        this.performingDo = false;
        this.performingUndo = false;
        this.mostRecentTransaction = -1;
    }

    isPerformingDo() {
        return this.performingDo;
    }

    isPerformingUndo() {
        return this.performingUndo;
    }

    addTransaction(transaction) {
        if((this.mostRecentTransaction<0)||(this.mostRecentTransaction <(this.transactions.size()-1))) {
            for(i=transactions.size()-1; i>this.mostRecentTransaction; i--) {
                this.transactions.splice(i,1);
            }
        }
        this.transactions.push(transaction);
        doTransaction();
    }

    doTransaction() {
        if(this.hasTransactionRedo()) {
            this.performingDo = true;
            let transaction = transactions.get(this.mostRecentTransaction+1);
            //this doTransaction is the transaction that belongs to the object, not this class
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }

    peekUndo() {
        if(this.hasTransactionToUndo()) {
            return this.transactions.get(this.mostRecentTransaction);
        } else {
            return null;
        }
    }

    peekDo() {
        if(this.hasTransactionToRedo()) {
            return this.transactions.get(this.mostRecentTransaction+1);
        } else {
            return null;
        }
    }

    undoTransaction() {
        if(this.hasTransactionToUndo()) {
            this.performingUndo = true;
            let transaction = transactions.get(this.mostRecentTransaction); 
            //this undoTransaction is the transaction that belongs to the object, not this class
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }

    clearAllTransactions() {
        this.transactions = new Array();
        this.mostRecentTransaction = -1;
    }

    getSize() {
        return this.transactions.size();
    }

    getRedoSize() {
        return this.getSize()-this.mostRecentTransaction-1;
    }

    getUndoSize() {
        return this.mostRecentTransaction+1;
    }

    hasTransactionToUndo() {
        return this.mostRecentTransaction>=0;
    }

    hasTransactionToRedo() {
        return this.mostRecentTransaction < (this.transactions.size()-1);
    }

    toString() {
        let text = "--Number of Transactions: " + this.transactions.size() + "\n";
        text = text+"--Current Index on Stack: " + this.mostRecentTransaction + "\n";
        text = text+"--Current Transaction Stack:\n";
        for (i = 0; i <= this.mostRecentTransaction; i++) {
            jsT = this.transactions.get(i);
            text = text+"----" + jsT.toString() + "\n";
        }
        return text;
    }


}