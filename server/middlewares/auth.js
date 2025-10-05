// import jwt from "jsonwebtoken";

// // Middleware Function to decode jwt toke to get clerkid

// const authUser = async (req, res, next) => {

//     try {

//         const {token} = req.headers
//         if (!token) {
//             return res.json({success:false, message:"Not Authrized Login Again"})
//         } 

//         const token_decode = jwt.decode(token)
//         console.log("Decoded token:", token_decode);
//         req.body.clerkId = token_decode.clerkId
//         console.log("✅ clerkId set in req.body:", req.body.clerkId);
        
//         next()
        
//     } catch (error) {
//         console.log(error.message);
//         res.json({success:false, message:error.message})
        
//     }

// }


// export default authUser



import jwt from "jsonwebtoken";

// Middleware Function to decode jwt token to get clerkId
const authUser = async (req, res, next) => {
  try {
    // Read token either from Authorization or custom token header
    const authHeader = req.headers["authorization"] || req.headers["token"];
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // console.log("🔹 Extracted token:", token);

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const token_decode = jwt.decode(token);
    // console.log("🔹 Decoded token payload:", token_decode);

    if (!token_decode || !token_decode.clerkId) {
      return res.json({ success: false, message: "Invalid or missing clerkId" });
    }

    // Store clerkId in req.user (safer than req.body)
    req.user = { clerkId: token_decode.clerkId };

    // console.log("✅ clerkId set:", req.user.clerkId);

    next();
  } catch (error) {
    console.log("❌ Middleware error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
