 // =========================================
 // SECURETEXT - SHA-256 HASHING
 // =========================================

 // Convert bytes to hexadecimal
 function bytesToHex(bytes) {
     return Array.from(bytes)
         .map(byte => byte.toString(16).padStart(2, "0"))
         .join("");
 }


 // Generate SHA-256 hash
 async function sha256Hash(text) {

     const encoder = new TextEncoder();

     const data = encoder.encode(text);

     const hashBuffer = await crypto.subtle.digest(
         "SHA-256",
         data
     );

     return bytesToHex(
         new Uint8Array(hashBuffer)
     );
 }