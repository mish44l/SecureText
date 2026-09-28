// =========================================
// SECURETEXT - RSA-OAEP
// =========================================

// Store generated RSA key pair
let rsaKeyPair = null;


// Generate RSA key pair
async function generateRSAKeys() {

    rsaKeyPair = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );

    return rsaKeyPair;
}


// RSA Encryption
async function rsaEncrypt(text) {

    if (!rsaKeyPair) {
        await generateRSAKeys();
    }

    const encoder = new TextEncoder();

    const data = encoder.encode(text);

    const encrypted =
        await crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            rsaKeyPair.publicKey,
            data
        );

    return bytesToBase64(
        new Uint8Array(encrypted)
    );
}


// RSA Decryption
async function rsaDecrypt(encryptedText) {

    if (!rsaKeyPair) {
        throw new Error(
            "RSA key pair is not available."
        );
    }

    const ciphertext =
        base64ToBytes(encryptedText);

    const decrypted =
        await crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            rsaKeyPair.privateKey,
            ciphertext
        );

    const decoder = new TextDecoder();

    return decoder.decode(decrypted);
}