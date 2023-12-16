import React, { useState,useEffect } from "react";
import Book from "../components/Book"; 
import '../components/Book.css';
import '../components/SearchBar';
import SearchBar from "../components/SearchBar";
import AddBookModal from '../components/AddBookModal';
import FilterByMonth from '../components/FilterByMonth'; 
import BookDetailsModal from '../components/BookDetailsModal';

// The Books component displays a list of books and includes functionality 
// for searching, filtering, and adding new books.

function Books() {
  // State variables for component functionality
  const [books, setBooks] = useState([]); // Stores the list of books
  const [hasMore, setHasMore] = useState(true); // Indicates if more books can be loaded
  const [page, setPage] = useState(0); // Current page for pagination
  const [filteredBooks, setFilteredBooks] = useState([]); // Stores the filtered list of books
  const [isModalVisible, setIsModalVisible] = useState(false); // Controls visibility of the add book modal
  const [searchTerm, setSearchTerm] = useState(''); // Stores the current search term
  const [isSearchActive, setIsSearchActive] = useState(false); // Indicates if search is active
  const [isLoading, setIsLoading] = useState(false); // Indicates if books are being loaded
  const [modalBookDetails, setModalBookDetails] = useState(null); // Stores details for the book modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls visibility of the book details modal
  
  // Function to fetch books from the backend 
  const fetchBooks = async () => {

    // Prevent fetching is already loading or no more books to load 
    if (isLoading || !hasMore) return;
  
    setIsLoading(true);
    try {
      // Fetch request  to the backend for books 
      const response = await fetch(`http://localhost:8080/api/books/all-books?page=${page}&limit=20`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      //Process the response 
      const newBooks = await response.json();
      setBooks(prevBooks => {
        // Create a set of IDs to ensure there are no duplicates
        const bookIds = new Set(prevBooks.map(book => book.id));
        // Add only new books that don't already exist in the state
        const uniqueBooks = newBooks.content.filter(book => !bookIds.has(book.id));
        return [...prevBooks, ...uniqueBooks];
      });

      //Update pagination and loading state 
      setHasMore(newBooks.content.length === 20);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false); //Reset loading state 
    }
  };
  
  // useEffect for initial fetch
  useEffect(() => {
    console.log('Component mounted, initiating initial fetch');
    fetchBooks();
  }, []); // Empty dependency array ensures this effect only runs once after the component mounts
  
  // UseEffect to handle infinite scrolloing 
  useEffect(() => {
    // Function to handle scroll event 
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page 
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
      fetchBooks(); //Fetch more books if the bottom of the page is reached 
    };
  
    //Add event listener for scroll 
    window.addEventListener('scroll', handleScroll);
    //Clean up function to remove the even listner 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]); // Add isLoading to the dependency array to re-bind the event when isLoading changes 
  
  // Function to handle the editing of a book's details
  const handleEdit = (editedBook) => {
    console.log('Submitting the following book to the server:', editedBook);
    fetch(`http://localhost:8080/api/books/${editedBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBook),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(updatedBook => {
      // Update the books array with the updated book data
      const updatedBooks = books.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      );
      setBooks(updatedBooks);
  
      // Update filteredBooks array if there's an active search 
      if (!searchTerm) {
        setFilteredBooks(updatedBooks);
      } else {
        // Additional logic may be required here for search functionality 
      }
    })
    .catch(error => {
      console.error('Error updating book:', error);
      // Handle the error appropriately
    });
  };

 
  // handleSearch function for searching books by ISBN
  const handleSearch = async (isbn) => {
    console.log('Search initiated for ISBN:', isbn);
    setSearchTerm(isbn);
  
    if (!isbn) {
      console.log('Empty search term, resetting filtered books.');
      setFilteredBooks([]);
      setIsSearchActive(false);
      return;
    }
  
    try {
      //Fetch request to search for books by ISBN
      const response = await fetch(`http://localhost:8080/api/books/search?isbn=${isbn}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Since the backend now returns an array of books, you don't need to wrap it
      const searchResults = await response.json();
      console.log('Search results:', searchResults);
      setFilteredBooks(searchResults);
      setIsSearchActive(true);
    } catch (error) {
      console.error('Error searching books:', error);
      setFilteredBooks([]);
      setIsSearchActive(false);
    }
  };

  // handleAddBook function for adding a new book   
  const handleAddBook = (newBook) => {
    // Send the new book data to the backend (POST)
    fetch('http://localhost:8080/api/books/create-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON data from the response
    })
    .then(addedBook => {
      // Ensure addedBook has an 'id' returned from the server
      console.log("Book added with ID:", addedBook.id);
      // Update the main books state with the new book returned from the backend
      setBooks(prevBooks => [...prevBooks, addedBook]);
  
      // If there is no active search, also update the filteredBooks state
      if (!searchTerm) {
        setFilteredBooks(prevBooks => [...prevBooks, addedBook]);
      }
    })
    .catch(error => {
      console.error('Error adding book:', error);
    });
  };
  

   // toggleModal function to open or close the AddBookModal
  const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
    
    // resetFilteredBooks function to reset the filtered books list
  const resetFilteredBooks = () => {
     setFilteredBooks(books);
     setIsSearchActive(false);
     setSearchTerm(''); // Add this line to reset the searchTerm
    };

    // filterBooksByMonth function to filter books based on month and year
    const filterBooksByMonth = async (year, month) => {
      try {
        console.log(`Filtering books for year: ${year}, month: ${month}`);
        const response = await fetch(`http://localhost:8080/api/books/sold-in-month?year=${year}&month=${month}`);
        if (!response.ok) throw new Error('Network response not ok');
        const data = await response.json();
        setFilteredBooks(data);
        setIsSearchActive(true);
      } catch (error) {
        console.error('Error fetching filtered books:', error);
        setFilteredBooks([]);
        setIsSearchActive(false);
      }
    };

    // handleViewMore function for fetching and displaying detailed book information
    const handleViewMore = async (isbn) => {
      setIsLoading(true); // Start loading
      const cachedDetails = sessionStorage.getItem(`bookDetails-${isbn}`);
    
      if (cachedDetails) {
        setModalBookDetails(JSON.parse(cachedDetails));
        setIsModalOpen(true);
        setIsLoading(false); // Stop loading since we have the details
      } else {
        try {
          const response = await fetch(`http://localhost:8080/api/books/book-details?isbn=${isbn}`);
          if (!response.ok) throw new Error('Network response not ok');
          const data = await response.json();
          setModalBookDetails(data);
          sessionStorage.setItem(`bookDetails-${isbn}`, JSON.stringify(data)); // Cache the fetched details
          setIsModalOpen(true);
        } catch (error) {
          console.error('Error fetching book details:', error);
        } finally {
          setIsLoading(false); // Stop loading regardless of the outcome
        }
      }
    };
    
    
    // handleDeleteBook function to delete a book from the list
    const handleDeleteBook = (id) => {
      setBooks(books.filter(book => book.id !== id)); // Remove the book from the books state
      if (isSearchActive) {
        setFilteredBooks(filteredBooks.filter(book => book.id !== id)); // Update filteredBooks if needed
      }
    };

  return (
    <div className='Book-Table'>
    {/* Search bar component with search, add, and reset functionalities */}
    <SearchBar onSearch={handleSearch}
     onAdd={toggleModal}
      onReset={resetFilteredBooks} 
      isSearchActive={isSearchActive}
      searchTerm={searchTerm} // Pass the searchTerm state as a prop
      onSearchChange={setSearchTerm}
       />
      {/* Modal for adding a new book */}
      <AddBookModal
        isVisible={isModalVisible}
        onClose={toggleModal} 
        onAddBook={handleAddBook}
       />
       {/* Component for filtering books by month */}
       <FilterByMonth onFilter={filterBooksByMonth} />

      {/* Modal for displaying detailed book information */}
       <BookDetailsModal
       isOpen={isModalOpen}
       details={modalBookDetails}
       isLoading={isLoading} 
       onClose={()=> setIsModalOpen(false)}
       />

      {/* Table to display books */}
      <table>
        <thead>
          <tr>
             {/* Table headers */}
            <th className="header-name">ISBN</th>
            <th  className="header-name">Date of Purchase</th>
            <th className="header-name">COGS</th>
            <th className="header-name">Payout</th>
            <th className="header-name">Date Sold</th>
            <th className="header-name">Profit</th>
            <th className="header-name">View More</th>
            <th className="header-name">Edit</th>
          </tr>
        </thead>
      <tbody>
        {/* Rendering either filtered books or all books based on search activity */}
          {isSearchActive
            ? filteredBooks.map(book => (
                <Book key={book.id} book={book} onEdit={handleEdit}  onViewMore={handleViewMore}  onDelete={handleDeleteBook}  />
              ))
            : books.map(book => (
                <Book key={book.id} book={book} onEdit={handleEdit}  onViewMore={handleViewMore}   onDelete={handleDeleteBook} />
              ))
          }
      </tbody>
     </table>
    </div>
  );
}

export default Books;
