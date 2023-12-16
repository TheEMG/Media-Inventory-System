// BookDetailsModal component for displaying detailed information about a book.
// Props:
//  - isOpen: Boolean to control the visibility of the modal.
//  - details: Object containing the book's details.
//  - onClose: Function to call when closing the modal.
//  - isLoading: Boolean indicating whether the book details are currently loading
import React from 'react';
import "./BookDetailsModal.css";

const BookDetailsModal = ({ isOpen, details, onClose,isLoading }) => {
  // If the modal isn't open, don't render anything
  if (!isOpen) return null; 

  // Provide a fallback UI while details are loading
  if (isLoading) {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <p>Loading details...</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  //Main model content 
  return (
    <div className="book-details-backdrop">
      <div className="book-details-modal">
        {/* Modal header with title and close button */}
        <div className="book-details-header">
          <h2 className="book-details-title">Book Details</h2>
          <button className="book-details-close-button" onClick={onClose}>✕</button>
        </div>
        {/*Modal content displaying book detials */}
        <div className="book-details-content">
          {/* Check if imageUrl exists before trying to display it */}
          {details.imageUrl ? (
            <img className="book-details-image" src={details.imageUrl} alt={details.title} />
          ) : (
            <p>No image available.</p> // Fallback text if no image URL is available
          )}
          {/*Display book details */}
          <div className="book-details-text">
            <p><strong>Title:</strong> {details.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BookDetailsModal;
