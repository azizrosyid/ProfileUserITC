const UserService = require("../../services/mysql/UserService");
const bcrypt = require("bcrypt");

const handler = {
  handlerGetUsers: async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        status: "success",
        message: "Successfully get all users",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.status(200).json({
        status: "success",
        message: "Successfully get user by id",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostUser: async (req, res, next) => {
    try {
      const {
        email,
        password,
        fullName,
        shortName,
        biodata,
        angkatan,
        jabatan,
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserService.createUser({
        email,
        password: hashedPassword,
        fullName,
        shortName,
        biodata,
        angkatan,
        jabatan,
      });
      res.status(201).json({
        status: "success",
        message: "Successfully create user",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullName, shortName, biodata, angkatan, jabatan } = req.body;

      await UserService.updateUser(id, {
        fullName,
        shortName,
        biodata,
        angkatan,
        jabatan,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully update user",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.status(200).json({
        status: "success",
        message: "Successfully delete user",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetUserByFullName: async (req, res, next) => {
    try {
      const { name } = req.query;
      const user = await UserService.getUserByFullName(name);
      res.status(200).json({
        status: "success",
        message: "Successfully get user by name",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = handler;
