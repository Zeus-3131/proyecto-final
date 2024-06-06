import Comment from "../data/mongo/models/comment.model.js";
import CommentDTO from "../dto/comment.dto.js";
import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class CommentsController {
  async create(req, res) {
    try {
      const commentDTO = new CommentDTO(req.body); // Usar CommentDTO para procesar los datos de entrada
      const comment = await Comment.create(commentDTO);
      res.status(201).json({ status: 201, comment, message: "Comentario creado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async read(req, res) {
    try {
      const comments = await Comment.find();
      res.status(200).json({ status: 200, comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async readOne(req, res) {
    try {
      const comment = await Comment.findById(req.params.cid);
      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const commentDTO = new CommentDTO(req.body); // Usar CommentDTO para procesar los datos de entrada
      const { text, ...rest } = commentDTO;
      const updateData = { ...rest };
  
      const comment = await Comment.findByIdAndUpdate(req.params.cid, { text, ...updateData }, { new: true });
      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
  
      res.status(200).json({ status: 200, comment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  async destroy(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.cid);
      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
      res.status(200).json({
        comment,
        message: "Comentario eliminado satisfactoriamente",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const controller = new CommentsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
