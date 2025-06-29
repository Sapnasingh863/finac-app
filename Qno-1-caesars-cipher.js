function specialCipher(str, rotation) {
  // Step 1: Caesar Cipher
  let shifted = '';
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (/[A-Z]/i.test(char)) {
      let base = 'A'.charCodeAt(0);
      let newChar = String.fromCharCode((char.toUpperCase().charCodeAt(0) - base + rotation) % 26 + base);
      shifted += newChar;
    } else {
      shifted += char;
    }
  }

  // Step 2: Run-Length Encoding (RLE)
  let encoded = '';
  let i = 0;
  while (i < shifted.length) {
    let count = 1;
    while (i + 1 < shifted.length && shifted[i] === shifted[i + 1]) {
      count++;
      i++;
    }
    encoded += shifted[i];
    if (count > 1) {
      encoded += count;
    }
    i++;
  }

  return encoded;
}

// Example usage
console.log(specialCipher("AABCCC", 3));  // Output: D2EF3
