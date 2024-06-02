//import dependencias

const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');


//defiinindo a rede
//bitcoin redeprincipal = mainnet
//testnet = a rede de teste = testnet

const network = bitcoin.networks.testnet

//Derivação de endereços de carteiras /HD:
const path = `m/49'/1'/0'/0`

//onst path = `m/49'/1'/0'/0` = testet
//onst path = `m/49'/0'/0'/0` = mainnet

//mmnemonic é conjunto de palavras q se torna  a seed
//criando o menmonico para a seed(palavras de senhha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira hd
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
//criando o nó?
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,

}).address

//escrever os dados da carteira

console.log("Carteira gerada!! ")
console.log("Endereço:", btcAddress);
console.log("chave privada:", node.toWIF())
console.log("Seed:", mnemonic);