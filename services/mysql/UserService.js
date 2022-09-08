const { Op } = require("sequelize");
const { User } = require("../../models");

const UserService = {
  getAllUsers: async function () {
    const users = await User.findAll({
      attributes: ["id", "fullName", "shortName", "photo"],
    });
    return users;
  },
  getUserById: async function (id) {
    const user = await User.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
  createUser: async function (user) {
    const newUser = await User.create(user);
    return {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      shortName: newUser.shortName,
      photo: newUser.photo,
      biodata: newUser.biodata,
      angkatan: newUser.angkatan,
      jabatan: newUser.jabatan,
    };
  },
  updateUser: async function (id, user) {
    const updatedUser = await User.findByPk(id);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    await updatedUser.update(user);

    return updatedUser;
  },
  deleteUser: async function (id) {
    const deletedUser = await User.destroy({
      where: {
        id: id,
      },
    });

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser;
  },
  getUserByFullName: async function (fullName) {
    const user = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      where: {
        fullName: {
          [Op.like]: `%${fullName}%`,
        },
      },
    });

    return user;
  },
};
module.exports = UserService;
