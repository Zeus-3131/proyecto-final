// import jwt from "jsonwebtoken";

// function createToken(data) {
//   const token = jwt.sign(data, process.env.SECRET, {
//     expiresIn: 60 * 60 * 24 * 7,
//   });
//   return token;
// }

// function verifytoken(token) {
//   if (token) {
//     const data = jwt.verify(token, process.env.SECRET);
//     return data;
//   }
//   const error = new Error("bad auth token");
//   error.statusCode = 401;
//   throw error;
// }

// export { createToken, verifytoken };


import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
}

function verifytoken(token) {
  try {
    if (token) {
      const data = jwt.verify(token, process.env.SECRET);
      return data;
    } else {
      throw new Error("Token not provided");
    }
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
}

export { createToken, verifytoken };

