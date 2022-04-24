# Bitcoin Key Guesser

A node script that generates bitcoin keys and checks if they are funded by comparing against a list of known addresses with funds in them

## Acknowledgements

This project is heavily based on the Bitcoin-Stealer project by Michal2SAB.

- [Bitcoin-Stealer](https://github.com/Michal2SAB/Bitcoin-Stealer)

## Installation

1. Clone repository and install dependencies

```bash
  git clone https://github.com/lukabuz/bitcoin-key-guesser.git
  cd bitcoin-key-guesser
  npm install
```

2. Set up a local redis instance.
3. Acquire a list of funded addresses to check against. This list has to be named riches.txt with 1 line being 1 address. check the provided riches.txt file for an example.

> [this](http://addresses.loyce.club/?C=M;O=D) webpage has a frequently updated txt file list of all the funded bitcoin addresses that exist. The "List of all funded Bitcoin addresses
> (balance not shown, sorted in alphabetical order)" to the right is already in the format that the bitcoin-key-guesser can work with.

4. Prepare a file that will take these addresses and batch insert them into a redis hashset. The below command will generate a redis.txt file that you will use in step 5

```bash
chmod +x loadRedis.sh
./loadRedis.sh
```

5. Batch load the addresses into a redis hashset

```bash
cat redis.txt | redis-cli --pipe
```

6. Run the script

```bash
npm start
```

If the script finds a match, it will exit the process and generate a file called Success.txt that will contain the address and its seed.
