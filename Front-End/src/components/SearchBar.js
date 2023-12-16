// SearchBar component for handling search functionality in the application.
// It allows users to input a search term, perform a search, and reset the search.
// Props:
//  - onSearch: Function to call when the search is performed.
//  - onAdd: Function to call to add a new item.
//  - onReset: Function to call to reset the search.
//  - isSearchActive: Boolean indicating if a search is currently active.
//  - searchTerm: The current search term.
//  - onSearchChange: Function to call when the search term changes.
import './SearchBar.css';

const SearchBar = ({ onSearch, onAdd, onReset, isSearchActive, searchTerm, onSearchChange }) => {
  
  // Handles changes to the search input field 
  const handleSearchChange = (event) => {
    // Use onSearchChange to update searchTerm in the parent component
    onSearchChange(event.target.value);
  };

  // Handles the search action when the search button is clicked 
  const handleSearchClick = () => {
    // Use searchTerm from props when performing a search
    onSearch(searchTerm);
  };

  // Render the search bar with input field and action buttons 
  return (
    <div className="search-bar-container">
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by ISBN..."
        className="search-input"
        value={searchTerm} // Use searchTerm from props
        onChange={handleSearchChange}
      />
      {/*Button to trigger the search */}
      <button onClick={handleSearchClick} className="search-button">Search</button>
      {/* Conditionally render the 'Add' button if a search is not active  */}
      {!isSearchActive && (
        <button onClick={onAdd} className="add-button">Add</button>
      )}
      {/* Conditionally render the 'Go back' button if a search is active */}
      {isSearchActive && (
        <button onClick={onReset} className={`go-back-button ${isSearchActive ? 'active' : ''}`}>Go Back</button>

      )}
    </div>
  );
};

export default SearchBar;
