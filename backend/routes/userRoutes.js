const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Set up storage for avatar uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Route to upload avatar
router.post("/upload-avatar", authenticateToken, upload.single("avatar"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl });

        res.status(200).json({ success: true, avatarUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Route to sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        if (password.length <= 7) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, address });

        await newUser.save();
        res.status(201).json({ message: "Signup Successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});



// User Sign-In Route (Login with Username)
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists by username
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: existingUser._id, username: existingUser.username, role: existingUser.role },
            process.env.JWT_SECRET || "Shashank@2024",
            { expiresIn: "60d" }
        );

        // Send response with user info and token
        res.status(200).json({
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



//  Route to get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { address: req.body.address });
        res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//  Route to update username
router.put("/update-username", authenticateToken, async (req, res) => {
    try {
        const { username } = req.body;
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        await User.findByIdAndUpdate(req.user.id, { username });
        res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to update email
router.put("/update-email", authenticateToken, async (req, res) => {
    try {
        const { email } = req.body;
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        await User.findByIdAndUpdate(req.user.id, { email });
        res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to update password
router.put("/update-password", authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Both current and new passwords are required" });
        }
        if (newPassword.length <= 7) {
            return res.status(400).json({ message: "New password must be at least 8 characters long" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user.id, { password: hashedNewPassword });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
