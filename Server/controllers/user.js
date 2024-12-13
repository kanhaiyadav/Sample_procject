import User from "../Models/user.js";

export const signUp = async (req, res) => {
    try {
        const { email, password, username} = req.body;
        const newUser = new User({ email, password, username: username });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist" });
        if (existingUser.password !== password)
            return res.status(400).json({ message: "Invalid credentials" });
        res.status(200).json(existingUser);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}