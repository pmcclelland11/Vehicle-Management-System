var filterInput = document.getElementById("filter-input");
var filterButton = document.getElementById("filter-button");
var tableRows = document.querySelectorAll(".tableRow");

filterButton.addEventListener("click", function () {
  var filterValue = filterInput.value.toLowerCase();

  for (var i = 0; i < tableRows.length; i++) {
    var currentRow = tableRows[i];
    var currentMake = currentRow.children[1].textContent.toLowerCase();
    var currentType = currentRow.children[5].textContent.toLowerCase();

    if (currentMake.includes(filterValue) || currentType.includes(filterValue)) {
      currentRow.style.display = ""; // Show the row if it matches the filter
    } else {
      currentRow.style.display = "none"; // Hide the row if it doesn't match the filter
    }
  }
});

// Get the modal and buttons
const modal = document.getElementById("add-vehicle-modal");
const addVehicleButton = document.getElementById("add-vehicle-button");
const closeButton = document.querySelector(".close");

// Open the modal when the "Add New Vehicle" button is clicked
addVehicleButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});



// filterButton.addEventListener("click", function () {
//     var filterValue = filterInput.value.toLowerCase();
  
//     for (var i = 0; i < tableRows.length; i++) {
//       var currentRow = tableRows[i];
//       var currentMake = currentRow.children[1].textContent.toLowerCase();
//       var currentYear = currentRow.currentRow.children[3].textContent.toLowerCase();
//       var currentId = currentRow.currentRow.children[0].textContent.toLowerCase();
  
//       var makeMatch = currentMake.includes(filterValue);
//       var yearMatch = currentYear.includes(filterValue);
//       var idMatch = currentId.includes(filterValue);
  
//       if (makeMatch || yearMatch || idMatch) {
//         currentRow.style.display = ""; // Show the row if it matches the filter
//       } else {
//         currentRow.style.display = "none"; // Hide the row if it doesn't match the filter
//       }
//     }
//   });

// // Define your event listeners
// document.addEventListener("DOMContentLoaded", function () {
//     // Add event listeners for Edit and Delete buttons
//     var editButtons = document.querySelectorAll(".edit-button");
//     var deleteButtons = document.querySelectorAll(".delete-button");

//     editButtons.forEach(function (button) {
//         button.addEventListener("click", function () {
//             var vehicleId = button.getAttribute("data-vehicle-id");
//             // Open the edit modal and load data for the selected vehicle for editing
//             openEditModal(vehicleId);
//         });
//     });

//     deleteButtons.forEach(function (button) {
//         button.addEventListener("click", function () {
//             var vehicleId = button.getAttribute("data-vehicle-id");
//             // Open the delete confirmation modal
//             openDeleteModal(vehicleId);
//         });
//     });
// });

// // Functions to open modals and perform actions
// function openEditModal(vehicleId) {
//     // Implement logic to fetch vehicle data and populate the edit form in the modal
//     // Show the edit modal
// }

// function openDeleteModal(vehicleId) {
//     // Show the delete confirmation modal
//     // Implement logic to delete the vehicle upon confirmation
// }