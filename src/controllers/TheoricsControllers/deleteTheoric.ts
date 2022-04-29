import { Response, Request } from "express";
const Theoric = require("../../models/Theoric");

/*Este es el controller para borrar contenido teórico.*/

export const DELETE_THEORIC = async (req: Request, res: Response) => {
  try{
    const { id } = req.body;
    if(id){
      await Theoric.deleteOne({ _id: id });
      res.json("Se ha eliminado este contenido teórico con id: " + id);
    } else {
      res
        .status(404)
        .json({ error: "Por favor, indique el contenido que quiere eliminar" });
    }
  } catch(err){
    console.log("Algo salió mal en el controller deleteTheoric: ", err);
  }
};