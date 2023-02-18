// Define an array to store issued books
let issuedBooks = [];

// Get form elements
const bookNameInput = document.getElementById("book-name");
const issuedToInput = document.getElementById("issued-to");
const issueBookBtn = document.getElementById("issue-book-btn");

// Get table element
const issuedBooksTable = document.getElementById("issued-books-table");

// Function to add a new book to the issued books array and update the table
function addIssuedBook() {
  // Get book name and issued to values from the form
  const bookName = bookNameInput.value;
  const issuedTo = issuedToInput.value;

  // Create a new issued book object with default values
  const newIssuedBook = {
    id: issuedBooks.length + 1,
    book_name: bookName,
    issued_to: issuedTo,
    issued_time: new Date().toLocaleString(),
    status: "not returned"
  };

  // Add the new issued book to the issued books array
  issuedBooks.push(newIssuedBook);

  // Clear form inputs
  bookNameInput.value = "";
  issuedToInput.value = "";

  // Update issued books table
  updateIssuedBooksTable();
}

// Function to update the issued books table
function updateIssuedBooksTable() {
  // Clear the table body
 


  issuedBooksTable.innerHTML = "";

  // Add a row to the table for each issued book
  issuedBooks.forEach(function(issuedBook) {
    // Create a new row element
    const row = document.createElement("tr");

    // Add cells to the row for each property of the issued book object
    const idCell = document.createElement("td");
    idCell.textContent = issuedBook.id;
    row.appendChild(idCell);

    const bookNameCell = document.createElement("td");
    bookNameCell.textContent = issuedBook.book_name;
    row.appendChild(bookNameCell);

    const issuedToCell = document.createElement("td");
    issuedToCell.textContent = issuedBook.issued_to;
    row.appendChild(issuedToCell);

    const issuedTimeCell = document.createElement("td");
    issuedTimeCell.textContent = issuedBook.issued_time;
    row.appendChild(issuedTimeCell);

const statusCell = document.createElement("td");
const statusSpan = document.createElement("span");
statusSpan.textContent = issuedBook.status;
statusSpan.style.color = issuedBook.status === "returned" ? "green" : "red";
statusCell.appendChild(statusSpan);

const editButton = document.createElement("button");
editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`;

editButton.addEventListener("click", () => {
  const statusInput = document.createElement("input");
  statusInput.type = "text";
  statusInput.value = issuedBook.status;
  statusInput.style.color = issuedBook.status === "returned" ? "green" : "red";
  statusInput.addEventListener("input", () => {
    if (statusInput.value.toLowerCase() === "returned") {
      statusInput.style.color = "green";
    } else if (statusInput.value.toLowerCase() === "not returned") {
      statusInput.style.color = "red";
    } else {
      statusInput.style.color = "black";
    }
  });

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => {
    issuedBook.status = statusInput.value;
    statusSpan.textContent = issuedBook.status;
    statusSpan.style.color = issuedBook.status === "returned" ? "green" : "red";
    statusCell.replaceChild(statusSpan, statusInput);
    statusCell.removeChild(saveButton);
    statusCell.removeChild(editButton);
    updateIssuedBooksTable();
  });

  statusCell.replaceChild(statusInput, statusSpan);
  statusCell.appendChild(saveButton);
  statusInput.focus();
});

statusCell.appendChild(editButton);
row.appendChild(statusCell);

issuedBooksTable.appendChild(row);
  });

  // Add event listener to status select elements
  const statusSelects = document.querySelectorAll("#issued-books-table select");
  statusSelects.forEach(function(statusSelect) {
    statusSelect.addEventListener("change", function() {
      issuedBooks[statusSelect.dataset.index].status = statusSelect.value;
      updateIssuedBooksTable();
    });
  });
}


issueBookBtn.addEventListener("click", function(event) {
  // Prevent form submission and page refresh
  event.preventDefault();

  // Add issued book to array and update table
  addIssuedBook();
});
// Add event listener to issue book button
//issueBookBtn.addEventListener("click", addIssuedBook);
