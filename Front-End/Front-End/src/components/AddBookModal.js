// AddBookModal component for adding a new book.
// This modal provides a form to input book details like ISBN, Date of Purchase, and COGS.
// Props:
//  - isVisible: Boolean indicating if the modal should be visible.
//  - onClose: Function to call when closing the modal.
//  - onAddBook: Function to call with the form data when a book is added.
import React, { useState } from 'react';
import "./AddBookModal.css";

function AddBookModal({ isVisible, onClose, onAddBook }) {
  // State for displaying success messafe post book addition. 
  const [successMessage, setSuccessMessage] = useState('');

  //State for managing from field values.
  const [formFields, setFormFields] = useState({
    isbn: '',
    datePurchased: '', 
    cogs: 0,
  });

  //State for managing sticky fields (retaining certain fields' values after submission).
  const [stickyFields, setStickyFields] = useState({
    datePurchased: false,
    cogs: false,
  });

  //Handles form submission logic.
  const submitForm = () => {
    if (formFields.isbn.length === 13) {
      //Call prop function to add book with current form fields
      onAddBook(formFields);

      //Display success message.
      setSuccessMessage('Book added successfully!'); 

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 500); 
      //Comeback
      // Reset only non-sticky fields
      setFormFields({
        isbn: '',
        datePurchased: stickyFields.datePurchased ? formFields.datePurchased : '',
        cogs: stickyFields.cogs ? formFields.cogs : 0,
      });
    }
  };

  //Handles changes to input fields 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    //Update form fields based on input name and value
    setFormFields(prevFields => ({ ...prevFields, [name]: value }));

    //Auto-submit form when ISBN reaches 13 characters 
    if (name === 'isbn' && value.length === 13) {
      submitForm();
    }
  };

  //Handles sticky checkboxes change 
  const handleStickyChange = (e) => {
    const { name, checked } = e.target;

    //Update sticky fields to maintain their values after form submission. 
    setStickyFields(prevFields => ({ ...prevFields, [name]: checked }));
  };

  //Handles form submission preventing default form behaviour
  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm();
  };

  //Render nothing if the modal is not visible
  if (!isVisible) return null;
  
  return (
    <div className="modal">
      {/* Model content */}
      <div className="modal-content">
         {/* Close Button */}
        <span className="close" onClick={() => {
          //Reset fields and close modal on click
          setFormFields({ isbn: '', datePurchased: '', cogs: 0 });
          onClose(); // Close the modal
        }}>&times;</span>
         {/* Success Message Display */}
         {successMessage && <div className="success-message">{successMessage}</div>}
          {/* Book Addition Form */}
        <form onSubmit={handleSubmit}>
          <h3>ISBN</h3>
          <input type="text" name="isbn" value={formFields.isbn} onChange={handleInputChange} placeholder="ISBN" /><br />
          <h3>Date of Purchase</h3>
          <input type="date" name="datePurchased" value={formFields.datePurchased} onChange={handleInputChange} placeholder="Date of Purchase" /> 
          <input type="checkbox" name="datePurchased" checked={stickyFields.datePurchased} onChange={handleStickyChange} /> Stick<br />
          <h3>COGS</h3>
          <input type="number" name="cogs" value={formFields.cogs} onChange={handleInputChange} placeholder="COGS" />
          <input type="checkbox" name="cogs" checked={stickyFields.cogs} onChange={handleStickyChange} /> Stick<br />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBookModal;
