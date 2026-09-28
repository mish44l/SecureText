# SecureText — Cryptography Toolkit

SecureText is a browser-based cryptography toolkit developed as an Information Security project. It demonstrates encryption, decryption, hashing, and encoding through a simple interactive web interface.

## Features

- AES-256-GCM encryption and decryption
- RSA-OAEP encryption and decryption
- Caesar Cipher encryption and decryption
- SHA-256 hashing
- Base64 encoding and decoding
- Input validation and error handling
- Copy-to-clipboard functionality
- Client-side processing

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Web Crypto API
- GitHub Pages

## Cryptographic Methods

**AES-256-GCM** — Symmetric encryption using a password-derived 256-bit key.

**RSA-OAEP** — Asymmetric encryption using a generated 2048-bit public/private key pair.

**Caesar Cipher** — Classical substitution cipher using a configurable shift value.

**SHA-256** — One-way cryptographic hashing producing a 256-bit hash.

**Base64** — Text encoding and decoding. Base64 is an encoding method and does not provide encryption.

## How to Use

1. Enter text into the input field.
2. Select a cryptographic method.
3. Enter a password or shift value when required.
4. Click Encrypt, Decrypt, Generate Hash, Encode, or Decode.
5. View and copy the generated output.

## Project Structure

```text
SecureText/
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── aes.js
│   ├── caesar.js
│   ├── rsa.js
│   ├── hash.js
│   └── utils.js
├── index.html
├── README.md
└── .gitignore
```

## Security Note

SecureText was created for educational purposes. The AES-GCM implementation uses a fixed IV to provide deterministic results for demonstration purposes. A production implementation should generate a fresh random IV for every encryption operation.

RSA-OAEP uses randomized encryption, so encrypting the same plaintext multiple times can produce different ciphertexts.

## Running the Project

Clone or download the repository and open `index.html` in a modern web browser. No backend server or database is required.

## Purpose

This project demonstrates practical differences between symmetric encryption, asymmetric encryption, classical ciphers, cryptographic hashing, and data encoding.
