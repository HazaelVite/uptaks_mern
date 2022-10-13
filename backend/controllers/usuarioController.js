import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if(existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.error(error);
  }
};

const autenticar = async (req, res) => {
  // Comprobar si el usuario existe
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if(!usuario) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({ msg: "El usuario no existe" });
  }
  // Comprobar si el usuario esta confirmado
  if(!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada")
    return res.status(403).json({ msg: "Tu cuenta no ha sido confirmada" });
  }

  // Comprobar si el pass es correcto
  if(await usuario.comprobarPassword) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
    })
    console.log("Es Correcto");
  } else {
    const error = new Error("El password es incorrecto")
    return res.status(403).json({ msg: "El password es incorrecto" });
  }
}


export {
  registrar,
  autenticar
}