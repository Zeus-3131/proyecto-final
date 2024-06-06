// // import { genSaltSync, hashSync, compareSync } from "bcrypt";

// // const createHash = (password) => hashSync(password, genSaltSync(10));

// // const verifyHash = (req, db) => compareSync(req, db);

// // export { createHash, verifyHash };

// import { genSaltSync, hashSync, compareSync } from "bcrypt";

// const createHash = (password) => hashSync(password, genSaltSync(10));

// // La función verifyHash debería tomar dos argumentos: la contraseña proporcionada y la contraseña almacenada
// // const verifyHash = (password, hashedPassword) => compareSync(password, hashedPassword);

// // export { createHash, verifyHash };


// const verifyHash = (password, hashedPassword) => {
//   console.log("Password:", password);
//   console.log("Hashed Password:", hashedPassword);
//   const result = compareSync(password, hashedPassword);
//   console.log("Hash Verification Result:", result);
//   return result;
// };

// export { verifyHash };





// import { genSaltSync, hashSync, compareSync } from "bcrypt";

// const createHash = (password) => hashSync(password, genSaltSync(10));

// const verifyHash = (password, hashedPassword) => {
//   console.log("Password:", password);
//   console.log("Hashed Password:", hashedPassword);
//   const result = compareSync(password, hashedPassword);
//   console.log("Hash Verification Result:", result);
//   return result;
// };

// export { createHash, verifyHash };



import { hashSync, genSaltSync, compare, compareSync } from "bcrypt";

function createHash(password) {
  const salt = genSaltSync(10);
  const hashPasword = hashSync(password, salt);
  return hashPasword;
}

function verifyHash(reqPass, dbPass) {
  const isValid = compareSync(reqPass, dbPass);
  return isValid;
}

export { createHash, verifyHash };
