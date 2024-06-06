// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// import { Strategy as GithubStrategy } from "passport-github2";
// import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"; 
// import { createHash, verifyHash } from "../utils/hash.util.js";
// import { createToken } from "../utils/token.util.js";
// import usersManager from "../data/mongo/users.mongo.js";   
// import User from "../data/mongo/models/user.model.js"; 
// import repository from "../repositories/users.rep.js";
// import dotenv from 'dotenv'; 

// dotenv.config();

// const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT, SECRET } = process.env;

// // passport.use(
// //   "register",
// //   new LocalStrategy(
// //     { passReqToCallback: true, usernameField: "email" },
// //     async (req, email, password, done) => {
// //       try {
// //         let one = await usersManager.readByEmail(email);
// //         if (!one) {
// //           let data = req.body;
// //           data.password = createHash(password);
// //           let user = await usersManager.create(data);
// //           return done(null, user);
// //         } else {
// //           return done(null, false, {
// //             message: "User already exists",
// //             statusCode: 400,
// //           });
// //         }
// //       } catch (error) {
// //         return done(error);
// //       }
// //     }
// //   )
// // );

// passport.use(
//   "register",
//   new LocalStrategy(
//     { passReqToCallback: true, usernameField: "email" },
//     async (req, email, password, done) => {
//       try {
//         let one = await repository.readByEmail(email);
//         if (one) {
//           return done(null, false, { statusCode: 401, message: "User already exists" });
//         } else {
//           const user = await repository.create(req.body);
//           console.log(user);
//           //winston.INFO(JSON.stringify(user));
//           return done(null, user);
//         }
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );


// // passport.use(
// //   "login",
// //   new LocalStrategy(
// //     { passReqToCallback: true, usernameField: "email" },
// //     async (req, email, password, done) => {
// //       try {
// //         const user = await usersManager.readByEmail(email);
// //         if (user && verifyHash(password, user.password)) {
// //           const token = createToken({ email, role: user.role });
// //           req.token = token;
// //           return done(null, user);
// //         } else {
// //           return done(null, false, { message: "Bad auth!!!" });
// //         }
// //       } catch (error) {
// //         return done(error);
// //       }
// //     }
// //   ) 
// // );

// passport.use(
//   "login",
//   new LocalStrategy(
//     { passReqToCallback: true, usernameField: "email" },
//     async (req, email, password, done) => {
//       try {
//         const user = await repository.readByEmail(email);
//         const verify = verifyHash(password, user.password);
//         if (user?.verified && verify) {
//           req.token = createToken({ _id: user._id, role: user.role });
//           return done(null, user);
//         } else {
//           return done(null, false, { statusCode: 401 });
//         }
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       passReqToCallback: true,
//       clientID: GOOGLE_ID,
//       clientSecret: GOOGLE_CLIENT,
//       callbackURL: "http://localhost:8080/api/sessions/google/callback",
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         //winston.INFO(JSON.stringify(profile));
//         console.log(profile);
//         let user = await usersManager.readByEmail(profile.id + "@gmail.com");
//         if (!user) {
//           user = new User({
//             email: profile.id + "@gmail.com",
//             username: profile.name.givenName,
//             lastName: profile.name.familyName,
//             photo: profile.coverPhoto,
//             password: createHash(profile.id),
//           });
//           user = await user.save();
//         }
//         req.session.email = user.email;
//         req.session.role = user.role;
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// passport.use(
//   "github",
//   new GithubStrategy(
//     {
//       passReqToCallback: true,
//       clientID: GITHUB_ID,
//       clientSecret: GITHUB_CLIENT,
//       callbackURL: "http://localhost:8080/api/sessions/github/callback",
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         console.log(profile);
//         let user = await usersManager.readByEmail(profile.id + "@github.com");
//         if (!user) {
//           user = new User({
//             email: profile.id + "@github.com",
//             username: profile.username,
//             photo: profile._json.avatar_url,
//             password: createHash(profile.id),
//           });
//           user = await user.save();
//         }
//         req.session.email = user.email;
//         req.session.role = user.role;
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )  
// ); 

// // passport.use(
// //   "jwt",
// //   new JwtStrategy(
// //     {
// //       jwtFromRequest: ExtractJwt.fromExtractors([
// //         (req) => req?.cookies["token"],
// //       ]),
// //       secretOrKey: SECRET,
// //     },
// //     async (payload, done) => {
// //       try {
// //         const user = await usersManager.readByEmail(payload.email);
// //         if (user) {
// //           user.password = null;
// //           return done(null, user);
// //         } else {
// //           return done(null, false);
// //         }
// //       } catch (error) {
// //         return done(error); 
// //       }
// //     }
// //   )
// // );

// passport.use(
//   "jwt",
//   new JwtStrategy(
//     {
//       secretOrKey: process.env.SECRET,
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => req?.cookies["token"],
//       ]),
//     },
//     async (payload, done) => {
//       try {
//         const user = await repository.readOne(payload._id);
//         if (user) {
//           return done(null, user);
//         } else {
//           return done(null, false, { statusCode: 403 });
//         }
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// export default passport;

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import repository from "../repositories/users.rep.js"; 
import { verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT, SECRET } = process.env;

passport.use(
  "register", 
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await repository.readByEmail(email);
        if (one) {
          return done(null, false, { statusCode: 401, message: "User already exists" });
        } else {
          const user = await repository.create(req.body);
          console.log(user);
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await repository.readByEmail(email);
        if (!user || !verifyHash(password, user.password)) {
          return done(null, false, { statusCode: 401, message: "Bad credentials" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await repository.readByEmail(profile.id + "@gmail.com");
        if (!user) {
          user = await repository.create({
            email: profile.id + "@gmail.com",
            username: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.photos[0]?.value,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: GITHUB_ID,
      clientSecret: GITHUB_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await repository.readByEmail(profile.id + "@github.com");
        if (!user) {
          user = await repository.create({
            email: profile.id + "@github.com",
            username: profile.username,
            photo: profile.photos[0]?.value,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
    },
    async (payload, done) => {
      try {
        const user = await repository.readOne(payload._id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { statusCode: 403 });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
