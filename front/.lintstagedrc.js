module.exports = {
  // TypeScript and TSX files
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write",
  ],
  
  // JSON, CSS, and Markdown files
  "*.{json,css,md}": [
    "prettier --write",
  ],
};
