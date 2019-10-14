import {jsTPS} from './jsTPS';
import {AddToNum_Transaction} from './AddToNum_Transaction'
import { Num } from './Num';
import { AndMask_Transaction } from './AndMask_Transaction';
import { OrMask_Transaction } from './OrMask_Transaction';

var assert = require('assert');
export class jsTPS_Unit_Tests{
    testAdd(){
        let tps = new jsTPS();
        let num = new Num();
        assert(0===num.getNum());

        tps.addTransaction(new AddToNum_Transaction(num,5));
        assert(5===num.getNum());
        assert(1===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(1===tps.getUndoSize());

        tps.addTransaction(new AddToNum_Transaction(num,10));
        assert(15===num.getNum());
        assert(2===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(2===tps.getUndoSize());

        tps.addTransaction(new AddToNum_Transaction(num,20));
        assert(35===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());
        console.log('testAdd ran')
    }
    testAndMask(){
        let tps = new jsTPS();
        let num = new Num();
        assert(0===num.getNum());

        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        assert(4===num.getNum());
        assert(2===tps.getSize());

        tps.undoTransaction();
        assert(12===num.getNum());
        assert(2===tps.getSize());
        assert(1===tps.getRedoSize());
        assert(1===tps.getUndoSize());
        console.log("And Mask ran")
    }

    testOrMask(){
        let tps = new jsTPS();
        let num = new Num();
        assert(0===num.getNum()); 

        tps.addTransaction(new AddToNum_Transaction(num, 141));
        tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 87));
        assert(223===num.getNum());
        assert(2===tps.getSize());

        tps.undoTransaction();
        assert(141===num.getNum());
        assert(2===tps.getSize());
        assert(1===tps.getRedoSize());
        assert(1===tps.getUndoSize());
        console.log("Or Mask ran")
    }

    testUndo(){
        let tps = new jsTPS();
        let num = new Num();
        assert(0===num.getNum());
        assert(false===tps.hasTransactionToUndo());
        assert(false===tps.hasTransactionToRedo());

        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert(true===tps.hasTransactionToUndo());
        assert(false===tps.hasTransactionToRedo());
        assert(35===num.getNum());
        assert(true===tps.hasTransactionToUndo());
        assert(3=== tps.getSize());
        assert(0=== tps.getRedoSize());
        assert(3=== tps.getUndoSize());
        
        tps.undoTransaction();
        assert(true===tps.hasTransactionToUndo());
        assert(true===tps.hasTransactionToRedo());
        assert(15=== num.getNum());
        assert(3=== tps.getSize());
        assert(1=== tps.getRedoSize());
        assert(2=== tps.getUndoSize());
        
        tps.undoTransaction();
        assert(true===tps.hasTransactionToUndo());
        assert(true===tps.hasTransactionToRedo());
        assert(5=== num.getNum());
        assert(3=== tps.getSize());
        assert(2=== tps.getRedoSize());
        assert(1=== tps.getUndoSize());
        
        tps.undoTransaction();
        assert(false===tps.hasTransactionToUndo());
        assert(true===tps.hasTransactionToRedo());
        assert(0=== num.getNum());
        assert(3=== tps.getSize());
        assert(3=== tps.getRedoSize());
        assert(0=== tps.getUndoSize());
        
        tps.undoTransaction();
        assert(false===tps.hasTransactionToUndo());
        assert(true===tps.hasTransactionToRedo());
        assert(0=== num.getNum());
        assert(3=== tps.getSize());
        assert(3=== tps.getRedoSize());
        assert(0=== tps.getUndoSize());

        console.log("test undo ran")
    }

    testRedo(){
        let tps = new jsTPS();
        let num = new Num();
        assert(0===num.getNum());

        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert(true===tps.hasTransactionToUndo());
        assert(false===tps.hasTransactionToRedo());
        assert(35===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());
        
        tps.undoTransaction();
        tps.doTransaction();
        assert(true===tps.hasTransactionToUndo());
        assert(false===tps.hasTransactionToRedo());
        assert(35===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());
        
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert(true===tps.hasTransactionToUndo());
        assert(false===tps.hasTransactionToRedo());
        assert(35===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());
        
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert(true===tps.hasTransactionToUndo());
        assert(false===tps.hasTransactionToRedo());
        assert(35===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());
        
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert(true===tps.hasTransactionToUndo());
        assert(true===tps.hasTransactionToRedo());
        assert(15===num.getNum());
        assert(3===tps.getSize());
        assert(1===tps.getRedoSize());
        assert(2===tps.getUndoSize());
        
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert(true===tps.hasTransactionToUndo());
        assert(false===tps.hasTransactionToRedo());
        assert(35===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());

        console.log("test redo ran")
    }

    testClear(){
        let tps = new jsTPS();
        let num = new Num();
        assert(0===num.getNum());

        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert(35===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());
                
        tps.clearAllTransactions();
        assert(35===num.getNum());
        assert(0===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(0===tps.getUndoSize());
        
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert(70===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());
                
        tps.clearAllTransactions();
        assert(70===num.getNum());
        assert(0===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(0===tps.getUndoSize());
        
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert(105===num.getNum());
        assert(3===tps.getSize());
        assert(0===tps.getRedoSize());
        assert(3===tps.getUndoSize());

        console.log("test clear ran")
    }

}