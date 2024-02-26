import React from 'react'
import { Route, Link, BrowserRouter, Routes } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import SearchComponent from './modules/SearchModule.js'
import BookShelfComponent from './modules/BookShelfModule.js'
import './css/App.css'
//import { getAll } from './BooksAPI.js';

class BooksApp extends React.Component {
state = {
  books: [],
  message: "You dont have any books on this shelf"
}

handleChangeShelve(book, shelf) {
  BooksAPI.update(book, shelf).then(() => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  })
}

componentDidMount() {
  BooksAPI.getAll()
  .then(books => this.setState({ books }))
  .catch(err => console.log('this is an error in the book API', err))
}

render() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
      <Route exact path="/search" element={ (
        <SearchComponent message={this.state.message} bookList={this.state.books} handleChangeShelve={this.handleChangeShelve.bind(this)}/>
      )}/>
      <Route exact path="/" element={ (
        <div>
          <div className="list-books">  
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelfComponent headline={'Currently Reading'} message={this.state.message} handleChangeShelve={this.handleChangeShelve.bind(this)} books={this.state.books.filter( book => book.shelf === "currentlyReading")} />
                <BookShelfComponent headline={'Want To Read'} message={this.state.message} handleChangeShelve={this.handleChangeShelve.bind(this)} books={this.state.books.filter( book => book.shelf === "wantToRead")} />
                <BookShelfComponent headline={'Read Books'} message={this.state.message} handleChangeShelve={this.handleChangeShelve.bind(this)} books={this.state.books.filter( book => book.shelf === "read")} />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
      </div>
      )}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
}

export default BooksApp

