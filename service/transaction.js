const Round = require("../models/transaction");
const ethers = require("ethers");

// Set up the provider using Infura
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
);

// Create and sign a transaction
export const createAndSignTransaction = async ({
  sender,
  recipient,
  amount,
}) => {
  try {
    // Set up your wallet with the private key or mnemonic phrase
    const privateKey = sender;
    const wallet = new ethers.Wallet(privateKey, provider);

    // Set up transaction data
    const txObject = {
      to: recipient, // Recipient address
      value: ethers.utils.parseEther(amount), // Amount to send
    };

    // Create a signed transaction
    const signedTx = await wallet.sendTransaction(txObject);

    console.log("Signed transaction: ", signedTx);

    // Send the signed transaction to the network
    const txReceipt = await signedTx.wait();

    console.log("Transaction hash: ", txReceipt.transactionHash);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

const getAllRounds = async () => {
  const posts = await Round.find();
  return posts;
};

const getCurrentRound = async () => {
  try {
    const post = await Round.findOne({ status: "pending" });
    return post;
  } catch {
    return null;
  }
};

const getRoundsBy = async (payload) => {
  try {
    const post = await Round.find(payload);
    return post;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRoundBy = async (payload, sort1 = {}, sort2 = {}) => {
  try {
    const post = await Round.findOne(payload, sort1, sort2);
    return post;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateRound = async (id, payload) => {
  try {
    await Round.updateOne({ _id: id }, payload);
    return Round.findOne({ _id: id });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const makeRound = async (payload) => {
  try {
    const oldRounds = await Round.find({ status: "pending" });

    if (oldRounds) {
      oldRounds.map((el) => {
        el.status = "end";
        el.save();
      });
    }
    const round = new Round(payload);
    await round.save();
    return round;
  } catch {
    return null;
  }
};

module.exports = {
  getRoundBy,
  getRoundsBy,
  getAllRounds,
  getCurrentRound,
  updateRound,
  makeRound,
};
