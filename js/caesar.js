// =========================================
// SECURETEXT - Caesar Cipher
// =========================================


// Encrypt text using Caesar Cipher
function caesarEncrypt(text, shift) {

    return caesarTransform(text, shift);
}


// Decrypt text using Caesar Cipher
function caesarDecrypt(text, shift) {

    return caesarTransform(text, -shift);
}


// Main Caesar transformation
function caesarTransform(text, shift) {

    let result = "";

    // Keep shift within 0-25
    shift = ((shift % 26) + 26) % 26;


    for (let i = 0; i < text.length; i++) {

        const character = text[i];


        // Uppercase letters
        if (character >= "A" && character <= "Z") {

            const code =
                character.charCodeAt(0) - 65;

            const shiftedCode =
                (code + shift) % 26;

            result +=
                String.fromCharCode(
                    shiftedCode + 65
                );

        }


        // Lowercase letters
        else if (character >= "a" && character <= "z") {

            const code =
                character.charCodeAt(0) - 97;

            const shiftedCode =
                (code + shift) % 26;

            result +=
                String.fromCharCode(
                    shiftedCode + 97
                );

        }


        // Numbers, spaces and punctuation
        else {

            result += character;

        }

    }

    return result;
}