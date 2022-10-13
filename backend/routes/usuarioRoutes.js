import express from "express";
import { registrar, autenticar } from "../controllers/usuarioController.js";

const router = express.Router();

// Creacion, registro y confirmacion de usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar);

export default router;