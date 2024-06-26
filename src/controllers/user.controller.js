import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { User } from "./../models/user.models.js";
import { uploadOnCloudinary } from "./../utils/cloudinary.js";
import { ApiResponse } from "./../utils/ApiErrorResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  // get  details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images , check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  //1) get  details from frontend
  const { fullName, email, username, password } = req.body;

  console.log({
    email: email,
  });

  // if (fullName === "") {
  //   // if the fullName is empty string
  //   throw new ApiError(400, "FullName is required");
  // }

  //2) validation - not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields is required");
  }

  //3) check if user already exists: username, email
  const existedUser = User.findOne({
    $or: [{ username, email }],
  });

  if (!existedUser) {
    throw new ApiError(400, "User with email or username is already exist");
  }

  //4) check for images , check for avatar
  // console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0].path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //5) upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //6) create user object - create entry in db

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //7) remove password and refresh token field from response

  const createdUser = User.findById(user._id).select(
    // selecting a particular filed =  registering the user
    "-password",
    "-refreshToken",
  );

  //8) check for user creation

  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while registering a user");
  }

  //9) return res

  return res
    .status(201)
    .json(
      new ApiResponse(200, { createdUser: "User registered successfully" }),
    );
  // return res.status(200).json({
  //   message: "ok",
  // });
});

const loginUser = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    message: "ok",
  });
});

export { registerUser, loginUser };
