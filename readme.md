# Description
rest api for book store
## Documentation

### How to start project
1. Install Dependencies using command `yarn install` or `npm install`
2. Start the project using command `yarn dev` or `npm run dev`

### API Routes

#### 1. Get all books
Route: `/api/books/` <br/>
Method: `GET`

#### 2. Get book by ID
Route: `/api/books/:id` <br/>
Method: `GET`


#### 3. Create book
Route: `/api/books/` <br/>
Method: `POST` <br/>
Body:
``` 
    {
  name: "Road to learn react",
  author: "Robin Wieruch",
  image: "https://0.academia-photos.com/attachment_thumbnails/60117167/mini_magick20190725-25426-1wv9n4n.png"
     }
  ```

#### 4. Update book by ID
Route: `/api/books/:id` <br/>
Method: `PUT` <br>
Body:
```  
    {
  name: "New Name"
     }
  ```

#### 5. Delete book by ID
Route: `/api/books/:id` <br/>
Method: `DELETE `

