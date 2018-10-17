const { mnemonicGenerate } = require('@polkadot/util-crypto');
const { mnemonicValidate } = require('@polkadot/util-crypto');
const { toSecret } = require('@polkadot/util-crypto');
const { naclKeypairFromSeed } = require('@polkadot/util-crypto');

async function main () {
  // Create mnemonic string for Alice using BIP39
  const mnemonicAlice = mnemonicGenerate();

  // Validate the mnemic string that was generated
  const isValidMnemonic = mnemonicValidate(mnemonicAlice);

  console.log(`isValidMnemonic: ${isValidMnemonic}`);

  // Create valid seed from mnemonic as u8a and convert it to a string
  // FIXME - Replace with mnemonicToSeed once exposed
  const seedAlice = toSecret(mnemonicAlice).subarray(0, 32);

  // Generate new public/secret keypair for Alice from the supplied seed
  const { secretKey, publicKey } = naclKeypairFromSeed(seedAlice);

  // Encrypt, Sign and Validate the message. See Example 'Sign & Verify Message'
}

main().catch(console.error).finally(_ => process.exit());
