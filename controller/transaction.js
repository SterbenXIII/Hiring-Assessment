const TransactionService = require("../service/transaction");

const signTx = async (req, res) => {
  try {
    const { sender, recipient, amount } = req.body;

    const newTransaction = await TransactionService.createAndSignTransaction(
      sender,
      recipient,
      amount
    );

    res.json({ transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ error: "Transaction creation failed" });
  }
};

const makeTransaction = async (req, res) => {};

const getWithdrawTransaction = async (req, res) => {};

const getDepositTransaction = async (req, res) => {};

const getTransactionByID = async (req, res) => {};

module.exports = {
  makeTransaction,
  getWithdrawTransaction,
  getDepositTransaction,
  getTransactionByID,
  signTx
};
