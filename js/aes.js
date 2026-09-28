// =========================================
// SECURETEXT - AES-256-GCM
// =========================================

// Convert bytes to Base64
function bytesToBase64(bytes) {
    let binary = "";

    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary);
}

// Convert Base64 to bytes
function base64ToBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}


// Convert password into a 256-bit AES key
async function createAESKey(password) {

    const encoder = new TextEncoder();

    const passwordData = encoder.encode(password);

    const hash = await crypto.subtle.digest(
        "SHA-256",
        passwordData
    );

    return crypto.subtle.importKey(
        "raw",
        hash,
        {
            name: "AES-GCM"
        },
        false,
        ["encrypt", "decrypt"]
    );
}


// Fixed IV for deterministic classroom/demo results
const AES_IV = new TextEncoder().encode(
    "SecureTextIV1234"
);


// AES Encryption
async function aesEncrypt(text, password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(text);

    const key = await createAESKey(password);

    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: AES_IV
        },
        key,
        data
    );

    return bytesToBase64(
        new Uint8Array(encrypted)
    );
}


// AES Decryption
async function aesDecrypt(encryptedText, password) {

    try {

        const key = await createAESKey(password);

        const ciphertext =
            base64ToBytes(encryptedText);

        const decrypted =
            await crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: AES_IV
                },
                key,
                ciphertext
            );

        const decoder = new TextDecoder();

        return decoder.decode(decrypted);

    }
    catch (error) {

        throw new Error(
            "Decryption failed. Check your password or ciphertext."
        );
    }
}