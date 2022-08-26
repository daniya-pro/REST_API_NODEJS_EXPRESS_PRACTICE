import joi from "joi";
import fs from "fs/promises";
import path from "path";
import {errorObjGenerator, editBook, readBooks, addBook ,baseSchema, editBookSchema,deleteBook,readBookById} from "../helpers";


export const getAllBooks = (req, res) => {
  readBooks()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(400).json(errorObjGenerator(e));
    });
};

export const getBookByID=(req,res)=>{

  readBookById(req.params)
  .then((data) => {
    res.json(data);
  })
  .catch((e) => {
    res.status(400).json(errorObjGenerator(e));
  });


}


export const createBook = (req, res) => {
  addBook(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(400).json(errorObjGenerator(e));
    });

};


 export const updateBookById = (req, res) => {
 const {error}= editBookSchema.validate(req.body)
 if(error)   return res.status(400).json(errorObjGenerator(error));
const book={id:req.params.id,...req.body}

 editBook(book)
  .then((data) => {
    res.json(data);
  })
  .catch((e) => {
    res.status(400).json(errorObjGenerator(e));
  });


};

export const deleteBookById = (req, res) => {
  deleteBook(req.params)
  .then((data) => {
    res.json(data);
  })
  .catch((e) => {
    res.status(400).json(errorObjGenerator(e));
  });
};
