import { Router } from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.controllers.js";
const router = Router();

router.route("/addUser").post(addUser);
router.route("/updateUser/:id").patch(updateUser);
router.route("/getUsers").get(getUsers);
router.route("/deleteUser/:id").delete(deleteUser);

export default router;
