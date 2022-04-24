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
3. Acquire a list of funded addresses to check against.
