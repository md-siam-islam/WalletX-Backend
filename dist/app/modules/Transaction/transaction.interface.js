"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactiontype = exports.transactionstatus = void 0;
var transactionstatus;
(function (transactionstatus) {
    transactionstatus["PENDING"] = "pending";
    transactionstatus["COMPLETED"] = "completed";
    transactionstatus["FAILED"] = "failed";
})(transactionstatus || (exports.transactionstatus = transactionstatus = {}));
var transactiontype;
(function (transactiontype) {
    transactiontype["ADD"] = "add";
    transactiontype["WITHDRAW"] = "withdraw";
    transactiontype["SEND"] = "send";
    transactiontype["RECEIVE"] = "receive";
    transactiontype["CASHIN"] = "Cash-in";
})(transactiontype || (exports.transactiontype = transactiontype = {}));
