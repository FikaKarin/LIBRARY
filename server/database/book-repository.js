const { toHaveDisplayValue } = require("@testing-library/jest-dom/dist/matchers");

class BookRepository {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    } 

    get pool() {
        return this.connectionPool.getPool();
    }

    save(book, callback) {

        // book object without the_comment
        let newBook = {
            title: book.title,
            author: book.author,
            published: book.published
        }

        // query for inserting only book
        let insertBookQ = "insert into books set ?; ";
        // query for getting inserted book id
        let getIdQ = "select max(id) as id from books"
        // query for inserting only comment
        let insertCommentQ = "insert into comments set ?;"

        // first, insert book without any comment
        this.pool.query(insertBookQ, newBook, (err, result) => {
            // then get the ID from the book we previously inserted
            this.pool.query(getIdQ, newBook, (err, result) => {
                let id = result[0].id
                let p = {
                    books_id: id,
                    the_comment: book.the_comment
                }
                // then insert a comment with a reference to the book we inserted
                this.pool.query(insertCommentQ, p, (err, result) => {
                    console.log(err, result)
                    callback(err, result)
                })
            })
        });
    }

    get(id, callback) {
        this.pool.query("select books.id, books.author, books.title, books.published, comments.the_comment from books left join comments on books.id = comments.books_id where books.id = ? ", id, callback);
    }

    getAll(callback) {
        this.pool.query('select books.id, books.author, books.title, books.published, comments.the_comment from books left join comments on books.id = comments.books_id', callback);

    }

    update(id, book, callback) {
        let newBook = {
            author: book.author,
            title: book.title,
            published: book.published
        }

        this.pool.query("update books set ? where id = ?", [newBook, id], callback);
    }

    delete(id, callback) {
        this.pool.query('delete from books where id = ?', id, callback);
    }
}

module.exports = BookRepository;