import { Router } from "express";
import { registerUser, loginUser } from "./../controllers/user.controller.js";

// multer
import { upload } from "./../middlewares/multer.middleware.js";

const router = Router();

// http://localhost:3000/users/register
router.route("/register").post(
  upload.fields([
    // ita array
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);

// http://localhost:3000/users/login
router.route("/login").post(loginUser);

// router.route is not working
// router.route("/login").post(loginUser); // router.route is not working

export default router;
