import fs from "fs";
import Comment from "../mongo/models/comment.model.js";  // Ajusta la ruta según sea necesario
import CommentDTO from "../../dto/comment.dto.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class CommentsManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.comments = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      throw error;
    }
  }

  constructor(path) {
    this.path = path;
    this.comments = [];
    this.init();
  }

  async create(data) {
    try {
      const commentDTO = new CommentDTO(data);
      const comment = new Comment(commentDTO);
      await comment.save();
      console.log("Comentario creado:", comment);
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const comments = await Comment.find();
      if (!comments || comments.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return comments;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return comment;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(cid, data) {
    try {
      const commentDTO = new CommentDTO(data);
      const { text, ...rest } = commentDTO;
      const updateData = { ...rest };
  
      const updatedComment = await Comment.findByIdAndUpdate(cid, { text, ...updateData }, { new: true });
      if (!updatedComment) {
        throw new Error(`Comentario con id ${cid} no encontrado`);
      }
  
      return updatedComment;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const comment = await Comment.findByIdAndDelete(id);
      notFoundOne(comment);
      return comment;
    } catch (error) {
      throw error;
    }
  }
}

const commentsManager = new CommentsManager("./src/data/fs/files/comments.json");
export default commentsManager;
