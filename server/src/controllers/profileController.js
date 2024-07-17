const prisma = require("../../prismaClient");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {

    const userId = req.userId; 
    console.log(userId)
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }, 
      select: { id: true, name: true, email: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

const updateProfile = async (req, res) => {
const userId = req.userId;
  const { name, email, password } = req.body;

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 8);

    const updatedUser = await prisma.user.update({
      where: { id: req.userId }, 
      data: updateData,
      select: { id: true, name: true, email: true }
    });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
