// =========================================
// SECURETEXT - Main Application
// =========================================


// =========================================
// DOM ELEMENTS
// =========================================

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const characterCount = document.getElementById("characterCount");
const outputLength = document.getElementById("outputLength");

const keyInput = document.getElementById("keyInput");
const toggleKey = document.getElementById("toggleKey");

const encryptButton = document.getElementById("encryptButton");
const decryptButton = document.getElementById("decryptButton");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");

const outputStatus = document.getElementById("outputStatus");

const algorithmTitle = document.getElementById("algorithmTitle");
const algorithmDescription =
    document.getElementById("algorithmDescription");
const algorithmSelect =
    document.getElementById("algorithmSelect");
const algorithmCards =
    document.querySelectorAll(".algorithm-card");


// =========================================
// APPLICATION STATE
// =========================================

let selectedAlgorithm = "aes";


// =========================================
// ALGORITHM INFORMATION
// =========================================
const algorithmInfo = {

    aes: {
        title: "AES-256-GCM",
        description:
            "Advanced Encryption Standard with 256-bit keys. Provides strong symmetric encryption using a password."
    },

    rsa: {
        title: "RSA-OAEP",
        description:
            "Asymmetric encryption using a public and private key pair. Suitable for secure key exchange and encryption."
    },

    caesar: {
        title: "Caesar Cipher",
        description:
            "A classical substitution cipher that shifts letters by a selected number of positions."
    },

    sha256: {
        title: "SHA-256",
        description:
            "A one-way cryptographic hash function that converts text into a fixed 256-bit hash."
    },

    base64: {
        title: "Base64 Encoding",
        description:
            "Encodes text into Base64 format for safe data representation. Base64 is encoding, not encryption, and does not require a key."
    }

};

// =========================================
// ALGORITHM SELECTION
// =========================================

algorithmCards.forEach(card => {

    card.addEventListener("click", () => {

        const algorithm = card.dataset.algorithm;

        selectedAlgorithm = algorithm;

  // Keep dropdown synchronized with selected card
        algorithmSelect.value = selectedAlgorithm;


        // Remove active state from all cards
        algorithmCards.forEach(item => {
            item.classList.remove("active");
        });


        // Activate selected card
        card.classList.add("active");

       updateAlgorithmInterface();

    });

});
function updateAlgorithmInterface() {

    // Update algorithm information
    algorithmTitle.textContent =
        algorithmInfo[selectedAlgorithm].title;

    algorithmDescription.textContent =
        algorithmInfo[selectedAlgorithm].description;


    // Update key section
    updateKeySection();


    // Update active card
    algorithmCards.forEach(card => {

        card.classList.toggle(
            "active",
            card.dataset.algorithm ===
            selectedAlgorithm
        );

    });


    // Update button labels
    if (selectedAlgorithm === "sha256") {

        encryptButton.textContent =
            "🔐 Generate Hash";

        decryptButton.style.display =
            "none";

    }

    else if (selectedAlgorithm === "base64") {

        encryptButton.textContent =
            "↔ Encode";

        decryptButton.textContent =
            "↔ Decode";

        decryptButton.style.display =
            "inline-flex";

    }

    else {

        encryptButton.textContent =
            "🔒 Encrypt";

        decryptButton.textContent =
            "🔓 Decrypt";

        decryptButton.style.display =
            "inline-flex";
    }
}

function updateAlgorithmInfo(algorithm) {

    const info = algorithmInfo[algorithm];

    if (!info) {
        return;
    }

    algorithmTitle.textContent = info.title;

    algorithmDescription.textContent =
        info.description;
}


// =========================================
// KEY SECTION
// =========================================
function updateKeySection() {

    // SHA-256 and Base64
    if (
        selectedAlgorithm === "sha256" ||
        selectedAlgorithm === "base64"
    ) {

        keySection.style.display = "none";

        return;
    }


    // Caesar Cipher
    if (selectedAlgorithm === "caesar") {

        keySection.style.display = "block";

        keyInput.type = "number";

        keyInput.placeholder =
            "Enter shift value (1–25)";

        keyInput.value = "";

        keyHelp.textContent =
            "Choose a shift value between 1 and 25.";

        return;
    }


    // RSA
    if (selectedAlgorithm === "rsa") {

        keySection.style.display = "block";

        keyInput.type = "text";

        keyInput.value = "";

        keyInput.placeholder =
            "No key required";

        keyInput.disabled = true;

        keyHelp.textContent =
            "RSA automatically generates a 2048-bit key pair in your browser.";

        return;
    }


    // AES
    if (selectedAlgorithm === "aes") {

        keySection.style.display = "block";

        keyInput.disabled = false;

        keyInput.type = "password";

        keyInput.value = "";

        keyInput.placeholder =
            "Enter encryption password";

        keyHelp.textContent =
            "Your password is used to generate the AES-256 encryption key.";

        return;
    }
}

// =========================================
// CLEAR BUTTON
// =========================================

clearButton.addEventListener("click", () => {

    inputText.value = "";

    outputText.value = "";

    keyInput.value = "";

    characterCount.textContent =
        "0 characters";

    outputLength.textContent =
        "0 characters";

    outputStatus.textContent =
        "Ready to process";

    showToast("Workspace cleared");

});

// =========================================
// COPY BUTTON
// =========================================

copyButton.addEventListener("click", () => {

    copyToClipboard(outputText.value);

});


// =========================================
// ENCRYPT BUTTON
// =========================================

encryptButton.addEventListener("click", async () => {
    outputText.value = "";
    outputStatus.textContent = "Processing...";
    outputLength.textContent = "0 characters";

    const text = inputText.value.trim();


    // Validate input
    if (!text) {

        showToast("Please enter some text first");

        inputText.focus();

        return;
    }


    // =====================================
    // CAESAR
    // =====================================

    if (selectedAlgorithm === "caesar") {

        const shift =
            Number(keyInput.value);


        if (
            !Number.isInteger(shift) ||
            shift < 1 ||
            shift > 25
        ) {

            showToast(
                "Enter a shift value between 1 and 25"
            );

            keyInput.focus();

            return;
        }


        const encrypted =
            caesarEncrypt(
                text,
                shift
            );


        outputText.value =
            encrypted;

        outputLength.textContent =
            `${encrypted.length} characters`;

        outputStatus.textContent =
            "Encryption completed";

        showToast(
            "Text encrypted successfully"
        );

        return;
    }

// =====================================
// AES
// =====================================

if (selectedAlgorithm === "aes") {

    const password = keyInput.value.trim();

    if (!password) {

        showToast(
            "Please enter an encryption password"
        );

        keyInput.focus();

        return;
    }

   

    try {

        encryptButton.disabled = true;

        encryptButton.textContent =
            "⏳ Encrypting...";


        const encrypted =
            await aesEncrypt(
                text,
                password
            );


        outputText.value =
            encrypted;

        outputLength.textContent =
            `${encrypted.length} characters`;

        outputStatus.textContent =
            "AES-256 encryption completed";


        showToast(
            "AES-256 encryption successful"
        );

    }

    catch (error) {

        console.error(error);

        showToast(
            "Encryption failed"
        );

    }

    finally {

        encryptButton.disabled = false;

        encryptButton.textContent =
            "🔒 Encrypt";
    }

    return;
}

        // SHA-256
    if (selectedAlgorithm === "sha256") {

        try {
            encryptButton.disabled = true;
            encryptButton.textContent = "⏳ Hashing...";

            const hashed = await sha256Hash(text);

            outputText.value = hashed;
            outputLength.textContent =
                `${hashed.length} characters`;
            outputStatus.textContent =
                "SHA-256 hashing completed";

            showToast(
                "SHA-256 hash generated successfully"
            );
        }
        catch (error) {
            console.error(error);
            showToast("Hashing failed");
        }
         finally {
             encryptButton.disabled = false;
            encryptButton.textContent = "🔐 Generate Hash";
        }
        return;
    }

    // RSA
    if (selectedAlgorithm === "rsa") {

        try {
            encryptButton.disabled = true;
            encryptButton.textContent = "⏳ Encrypting...";

            const encrypted = await rsaEncrypt(text);

            outputText.value = encrypted;
            outputLength.textContent =
                `${encrypted.length} characters`;
            outputStatus.textContent =
                "RSA encryption completed";

            showToast(
                "RSA encryption successful"
            );
        }
        catch (error) {
            console.error(error);
            showToast("RSA encryption failed");
        }
        finally {
            encryptButton.disabled = false;
            encryptButton.textContent = "🔒 Encrypt";
        }

        return;
    }

        // BASE64
    if (selectedAlgorithm === "base64") {

        try {

            const encoded =
                encodeBase64(text);

            outputText.value = encoded;

            outputLength.textContent =
                `${encoded.length} characters`;

            outputStatus.textContent =
                "Base64 encoding completed";

            showToast(
                "Text encoded successfully"
            );

        }
        catch (error) {

            console.error(error);

            showToast(
                "Base64 encoding failed"
            );
        }

        return;
    }
    // =====================================
    // OTHER ALGORITHMS
    // =====================================

    showToast(
        `${algorithmInfo[selectedAlgorithm].title} is coming next`
    );

});


// =========================================
// DECRYPT BUTTON
// =========================================

decryptButton.addEventListener("click", async () => {


    outputText.value = "";
    outputStatus.textContent = "Processing...";
    outputLength.textContent = "0 characters";

    const text = inputText.value.trim();


    // Validate input
    if (!text) {

        showToast(
            "Please enter ciphertext first"
        );

        inputText.focus();

        return;
    }


    // =====================================
    // CAESAR
    // =====================================

    if (selectedAlgorithm === "caesar") {

        const shift =
            Number(keyInput.value);


        if (
            !Number.isInteger(shift) ||
            shift < 1 ||
            shift > 25
        ) {

            showToast(
                "Enter a shift value between 1 and 25"
            );

            keyInput.focus();

            return;
        }


        const decrypted =
            caesarDecrypt(
                text,
                shift
            );


        outputText.value =
            decrypted;


        outputLength.textContent =
            `${decrypted.length} characters`;


        outputStatus.textContent =
            "Decryption completed";


        showToast(
            "Text decrypted successfully"
        );

        return;
    }


    // =====================================
// AES
// =====================================

if (selectedAlgorithm === "aes") {

    const password = keyInput.value.trim();

    if (!password) {

        showToast(
            "Please enter your password"
        );

        keyInput.focus();

        return;
    }

   

    try {

        decryptButton.disabled = true;

        decryptButton.textContent =
            "⏳ Decrypting...";


        const decrypted =
            await aesDecrypt(
                text,
                password
            );


        outputText.value =
            decrypted;

        outputLength.textContent =
            `${decrypted.length} characters`;

        outputStatus.textContent =
            "AES-256 decryption completed";


        showToast(
            "AES-256 decryption successful"
        );

    }

    catch (error) {

        console.error(error);

        outputText.value = "";

        outputStatus.textContent =
            "Decryption failed";


        showToast(
            "Wrong password or invalid ciphertext"
        );

    }

    finally {

        decryptButton.disabled = false;

        decryptButton.textContent =
            "🔓 Decrypt";
    }

    return;
}
    // SHA-256
    if (selectedAlgorithm === "sha256") {

        showToast(
            "SHA-256 is a one-way hash and cannot be decrypted"
        );

        return;
    }
        // RSA
    if (selectedAlgorithm === "rsa") {

        try {
            decryptButton.disabled = true;
            decryptButton.textContent = "⏳ Decrypting...";

            const decrypted = await rsaDecrypt(text);

            outputText.value = decrypted;
            outputLength.textContent =
                `${decrypted.length} characters`;
            outputStatus.textContent =
                "RSA decryption completed";

            showToast(
                "RSA decryption successful"
            );
        }
        catch (error) {
            console.error(error);
            outputText.value = "";
            outputStatus.textContent =
                "RSA decryption failed";

            showToast(
                "Invalid RSA ciphertext"
            );
        }
        finally {
            decryptButton.disabled = false;
            decryptButton.textContent = "🔓 Decrypt";
        }

        return;
    }
    
        // BASE64
    if (selectedAlgorithm === "base64") {

        try {

            const decoded =
                decodeBase64(text);

            outputText.value = decoded;

            outputLength.textContent =
                `${decoded.length} characters`;

            outputStatus.textContent =
                "Base64 decoding completed";

            showToast(
                "Base64 decoded successfully"
            );

        }
        catch (error) {

            console.error(error);

            outputText.value = "";

            outputStatus.textContent =
                "Invalid Base64 input";

            showToast(
                  "Invalid Base64 input. Check the ciphertext."
            );
        }

        return;
    }

    // =====================================
    // OTHER ALGORITHMS
    // =====================================

    showToast(
        `${algorithmInfo[selectedAlgorithm].title} decryption is coming next`
    );

});