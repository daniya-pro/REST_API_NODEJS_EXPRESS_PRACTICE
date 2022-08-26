import joi from "joi";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const baseSchema = joi.object({
  name: joi.string().min(3).required(),
  author: joi.string().min(3).required(),
  image: joi.string().uri().required(),
});

const schemaId = joi.object({
  id: joi.string().required(),
});
const bookSchema = joi.object({}).concat(baseSchema).concat(schemaId);

export const editBookSchema = joi.object({
  name: joi.string().min(3),
  author: joi.string().min(3),
  image: joi.string().uri(),
});

export const validateBook = (book) => {
  return bookSchema.validate(book);
};

export const validateAddBook = (book) => {
  return baseSchema.validate(book);
};

const pathToBooksFile = path.resolve(path.dirname(""), "./src/data/books.json");

const readData = (pathToFile = pathToBooksFile) =>
  new Promise((res, rej) => {
    fs.readFile(pathToFile)
      .then((data) => {
        if (!data.length) return res([]);
        try {
          const parsedinfo = JSON.parse(data);
          res(parsedinfo);
        } catch (e) {
          res([]);
        }
      })
      .catch((e) => {
        rej(e);
      });
  });

const readDataByUniqueProperty = (
  value,
  uniqueProperty = "id",
  pathToFile = pathToBooksFile
) =>
  new Promise((res, rej) => {
    readData(pathToFile)
      .then((data) => {
        const found=data.find((d) => d[uniqueProperty] === value);
        if(!found)return rej(new Error ("record doesn't exist"));
        res(found)

      })
      .catch(rej);
  });

const addData = (newData, pathToFile = pathToBooksFile) =>
  new Promise((res, rej) => {
    readData(pathToFile)
      .then((prevData) => {
        const data = [...prevData, newData];

        fs.writeFile(pathToFile, JSON.stringify(data))

          .then((p) => res(data))
          .catch((e) => rej(e));
      })
      .catch((e) => {
        rej(e);
      });
  });

const editData = (
  data,
  uniqueProperty = "id",
  isDelete = false,
  pathToFile = pathToBooksFile
) =>
  new Promise((res, rej) => {
    readData(pathToFile)
      .then((prevData) => {
        const prevDataObj = prevData.find(
          (e) => e[uniqueProperty] === data[uniqueProperty]
        );
        const dataIndex = prevData.indexOf(prevDataObj);
        if (dataIndex === -1) return rej(new Error("the record doesn't exist"));

        const newData = { ...prevDataObj, ...data };

        isDelete
          ? prevData.splice(dataIndex, 1)
          : prevData.splice(dataIndex, 1, newData);

        fs.writeFile(pathToFile, JSON.stringify(prevData))
          .then(() => res(prevData))
          .catch(rej);
      })
      .catch(rej);
  });

const deleteData = (
  data,
  uniqueProperty = "id",
  pathToFile = pathToBooksFile
) => editData(data, uniqueProperty, true, pathToFile);

export const readBooks = () => readData(pathToBooksFile);
export const readBookById = (book) =>
  new Promise((res, rej) => {
    const { error } = schemaId.validate(book);
    if (error) return rej(error);

    readDataByUniqueProperty(book.id).then(res).catch(rej);
  });
export const addBook = (newBook) =>
  new Promise((res, rej) => {
    const { error } = validateAddBook(newBook);
    if (error) return rej(error);
    newBook.id = uuidv4();
    addData(newBook).then(res).catch(rej);
  });

export const editBook = (book) =>
  new Promise((res, rej) => {
    const { error } = editBookSchema.concat(schemaId).validate(book);
    if (error) return rej(error);

    editData(book).then(res).catch(rej);
  });

export const deleteBook = (book) =>
  new Promise((res, rej) => {
    const { error } = schemaId.validate(book);
    if (error) return rej(error);

    deleteData(book).then(res).catch(rej);
  });

export const errorObjGenerator = (e) => ({
  message: e.toString() || "Oops! something went wrong",
});
