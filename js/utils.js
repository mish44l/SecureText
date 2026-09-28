// =========================================
// SECURETEXT - Utility Functions
// =========================================


// Show toast notification
function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// Copy text to clipboard
function copyToClipboard(text) {

    if (!text) {
        showToast("Nothing to copy");
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {

        navigator.clipboard.writeText(text)
            .then(() => {
                showToast("Copied to clipboard");
            })
            .catch(() => {
                showToast("Unable to copy text");
            });

        return;
    }

    // Fallback for local testing
    const textArea = document.createElement("textarea");

    textArea.value = text;

    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {

        const successful =
            document.execCommand("copy");

        if (successful) {
            showToast("Copied to clipboard");
        }
        else {
            showToast("Unable to copy text");
        }

    }
    catch (error) {

        showToast("Unable to copy text");

    }

    document.body.removeChild(textArea);
}

// Convert text to Base64
function encodeBase64(text) {

    const bytes =
        new TextEncoder().encode(text);

    let binary = "";

    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary);
}


// Convert Base64 back to text
function decodeBase64(base64) {

    const binary = atob(base64);

    const bytes =
        new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return new TextDecoder().decode(bytes);
}