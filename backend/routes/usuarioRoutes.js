import express from "express";
import { registrar } from "../controllers/usuarioController.js";

const router = express.Router();

// Creacion, registro y confirmacion de usuarios
router.post("/", registrar); // Crea un nuevo usuario
export default router;