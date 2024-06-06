// import { verifytoken } from "../utils/token.util.js";

// export default (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     const userData = verifytoken(token);
//     if (userData) {
//       return next();
//     } else {
//       const error = new Error("Bad auth from middleware");
//       error.statusCode = 401;
//       throw error;
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

// import { verifytoken } from "../utils/token.util.js";

// export default (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       const error = new Error("Token not provided");
//       error.statusCode = 401;
//       throw error;
//     }
//     const userData = verifytoken(token);
//     if (userData) {
//       req.user = userData; // Asigna los datos del usuario al objeto req
//       return next();
//     } else {
//       const error = new Error("Bad auth from middleware");
//       error.statusCode = 401;
//       throw error;
//     }
//   } catch (error) {
//     return next(error);
//   }
// };



// import { verifytoken } from "../utils/token.util.js";

// export default (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       const error = new Error("Token not provided");
//       error.statusCode = 401;
//       throw error;
//     }
//     const userData = verifytoken(token);
//     if (userData) {
//       req.user = userData; // Asigna los datos del usuario al objeto req
//       return next();
//     } else {
//       const error = new Error("Bad auth from middleware");
//       error.statusCode = 401;
//       throw error;
//     }
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return next(error);
//   }
// };




// import { verifytoken } from "../utils/token.util.js";

// export default (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       const error = new Error("Token not provided");
//       error.statusCode = 401;
//       throw error;
//     }
//     const userData = verifytoken(token);
//     if (userData && userData._id) { // Verifica si userData tiene un _id
//       req.user = userData; // Asigna los datos del usuario al objeto req
//       return next();
//     } else {
//       const error = new Error("Bad auth from middleware");
//       error.statusCode = 401;
//       throw error;
//     }
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return next(error);
//   }
// };


// import { verifytoken } from "../utils/token.util.js";

// export default (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (token) {
//       const userData = verifytoken(token);
//       if (userData) {
//         req.user = userData;
//       } else {
//         throw new Error("Invalid token");
//       }
//     }
//     // No necesitas verificar el token para solicitudes GET
//     if (req.method === 'GET') {
//       return next();
//     }
//     if (!req.user || !req.user._id) {
//       throw new Error("User not authenticated or has no valid _id");
//     }
//     return next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(401).json({ message: "Authentication failed" });
//   }
// };


import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("Token not provided");
      error.statusCode = 401;
      throw error;
    }
    const userData = verifytoken(token);
    if (userData) {
      req.user = userData; // Asigna los datos del usuario al objeto req
      return next();
    } else {
      const error = new Error("Bad auth from middleware");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return next(error);
  }
};
