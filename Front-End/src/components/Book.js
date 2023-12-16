// Book component for displaying and editing book details.
// Props:
//  - book: Object containing the book's details.
//  - onEdit: Function to call when a book is edited.
//  - onViewMore: Function to call to view more details of the book.
//  - onDelete: Function to call when a book is deleted.
import './Book.css';
import React, { useState, useEffect} from "react";


function Book({ book, onEdit, onViewMore, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableBook, setEditableBook] = useState({
    ...book,
    //Initialize editable fields with book properties or default values 
    isbn: book.isbn || '', 
    datePurchased: book.datePurchased || '', 
    sold: book.sold || '', 
    cogs: book.cogs || '',
    payout: book.payout || '',
    profit: calculateProfit(book.cogs, book.payout) || '',
  });

  //Effect to recalculate profit wien cogs or payout changes
  useEffect(() => {
    const profit = calculateProfit(editableBook.cogs, editableBook.payout);
    setEditableBook(prevBook => ({ ...prevBook, profit }));
  }, [editableBook.cogs, editableBook.payout]);

  //Function to calculate profit from cogs and payout
  //Ensures cogs and payout are treated as numbers 
  function calculateProfit(cogs, payout) {
    const cogsValue = Number(cogs) || 0;
    const payoutValue = Number(payout) || 0;
    return payoutValue - cogsValue;
  }

  //Handles changes to the editable fields 
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditableBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  //Save edits and triggers onEdit prop function
  const saveEdits = () => {
    onEdit(editableBook);
    setIsEditing(false);
    console.log("Submitting the following book to the server:", editableBook);
  };

  //Handles the deletion of a book
  const handleDelete = async () => {
    //Outputs confirmation to delete a book
    if (window.confirm(`Are you sure you want to delete the book with ISBN: ${book.isbn}?`)) {
      try {
        //Sends a DELETE request to the server
        const response = await fetch(`http://localhost:8080/api/books/${book.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        onDelete(book.id); // Call the onDelete prop function to update the state in the parent component
      } catch (error) {
        console.error('Error deleting book:', error);
   
      }
    }
  };

  return (
    <tr>
      {isEditing ? (
        //When in edit mode, show input fields for book details
        <>
          <td><input type="text" name="isbn" value={editableBook.isbn} onChange={handleEditChange} /></td>
          <td><input type="date" name="datePurchased" value={editableBook.datePurchased} onChange={handleEditChange} /></td>
          <td><input type="number" name="cogs" value={editableBook.cogs} onChange={handleEditChange} /></td>
          <td><input type="number" name="payout" value={editableBook.payout} onChange={handleEditChange} /></td>
          <td><input type="date" name="sold" value={editableBook.sold} onChange={handleEditChange} /></td>
         {/* Make the profit input read-only since its value is calculated */}
          <td><input type="number" name="profit" value={editableBook.profit.toFixed(2)} readOnly /></td>

          {/* Action buttons for saving or canceling the edit */}
          <td className='edit-buttons'>
            <button className='save-button' onClick={saveEdits}>Save</button>
            <button className='cancel-button' onClick={() => setIsEditing(false)}>Cancel</button>
            <button className='delete-button' onClick={handleDelete}>Delete</button> {/* Add the delete button */}
          </td>
        </>
      ) : (
        //When not in edit mode, display the book details as text
        <>
        
          <td>{book.isbn}</td>
          <td>{book.datePurchased}</td>
          <td>{book.cogs}</td>
          <td>{book.payout}</td>
          <td>{book.sold}</td>
          <td>{book.profit}</td>
          {/* Button to view more details of the book */}
          <td>
              <button onClick={() => onViewMore(book.isbn)}>View More</button>
          </td>
          {/* Button to enable edit mode */}
          <td>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </td>
        </>
      )}

    </tr>
  );
}

export default Book;
