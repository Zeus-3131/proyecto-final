// function isValidPass(formPassword, dbPassword) {
//     if (formPassword !== dbPassword) {
//       const error = new Error("Credenciales invalidas");
//       error.statusCode = 401;
//       throw error;
//     }
//   }
  
//   export default isValidPass;

import bcrypt from "bcrypt";

const isValidPass = async (formPassword, dbPassword) => {
  const isMatch = await bcrypt.compare(formPassword, dbPassword);
  if (!isMatch) {
    const error = new Error("Credenciales invalidas");
    error.statusCode = 401;
    throw error;
  }
};

export default isValidPass;
