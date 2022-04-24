"use strict";

process.title = "bitcoin-key-guesser by lukabuz";

const CoinKey = require("coinkey");
const Redis = require("ioredis");
const fs = require("fs");

async function generate(redisClient) {
  return new Promise(async (resolve) => {
    // generate random private key hex
    let privateKeyHex = r(64);

    // create new bitcoin key pairs
    let ck = new CoinKey(Buffer.from(privateKeyHex, "hex"));

    ck.compressed = false;

    // if generated wallet matches any known addresses file, tell us we won!
    const value = await redisClient.hget("addresses", ck.publicAddress);
    if (value == 1) {
      console.log("");
      process.stdout.write("\x07");
      console.log("\x1b[32m%s\x1b[0m", ">> Success: " + ck.publicAddress);
      var successString =
        "Wallet: " + ck.publicAddress + "\n\nSeed: " + ck.privateWif;

      // save the wallet and its private key (seed) to a Success.txt file in the same folder
      fs.writeFileSync("./Success.txt", successString, (err) => {
        if (err) throw err;
      });

      // close program after success
      process.exit();
    }
    resolve();
  });
}

// the function to generate random hex string
function r(l) {
  let randomChars = "ABCDF0123456789";
  let result = "";
  for (var i = 0; i < l; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

(async () => {
  console.log(
    "\x1b[32m%s\x1b[0m",
    ">> Program Started and is working silently (edit code if you want logs)"
  );
  const client = new Redis();
  while (true) {
    await generate(client);
  }
})();
