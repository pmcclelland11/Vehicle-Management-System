(function () {
  // Fetch elements once and reuse them
  const filterButton = document.getElementById("filter-button");
  const filterInput = document.getElementById("filter-input");
  const tableBody = document.querySelector(".table tbody");
  const addVehicleForm = document.getElementById("add-vehicle-form");
  const modal = document.getElementById("add-vehicle-modal");
  const addVehicleButton = document.getElementById("add-vehicle-button");
  const closeButton = document.querySelector(".close");
  const logoutButton = document.getElementById("logout-button");

  // Event listener for the filter button
  filterButton.addEventListener("click", applyFilter);

  // Event listener for the "Add New Vehicle" button
  addVehicleButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Event listener to close the modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Event listener to close the modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Event listener for the "Add New Vehicle" form submission
  addVehicleForm.addEventListener("submit", handleAddVehicle);

  // Logout Button Using SweetAlert2
  logoutButton.addEventListener("click", handleLogout);

  async function handleAddVehicle(event) {
    event.preventDefault();

    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;
    const mileage = document.getElementById("mileage").value;
    const type = document.getElementById("type").value;
    const price = document.getElementById("price").value;
    const isSold = document.getElementById("isSold").checked;

    const newVehicleData = {
      make,
      model,
      year,
      mileage,
      type,
      price,
      isSold,
    };

    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicleData),
      });

      if (response.ok) {
        // Vehicle added successfully, close the modal and update the table
        modal.style.display = "none";

        // Assuming the response contains the newly created vehicle data
        const newVehicle = await response.json();

        document.location.reload();
      } else {
        // Display an error message
        console.error("Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Clear the form fields after submission
    addVehicleForm.reset();
  }

  function applyFilter() {
    const filterValue = filterInput.value.toLowerCase();
    const tableRows = tableBody.querySelectorAll(".tableRow");
    tableRows.forEach((currentRow) => {
      const currentMake = currentRow.children[1].textContent.toLowerCase();
      const currentType = currentRow.children[5].textContent.toLowerCase();
      if (
        currentMake.includes(filterValue) ||
        currentType.includes(filterValue)
      ) {
        currentRow.style.display = "";
      } else {
        currentRow.style.display = "none";
      }
    });
  }

  async function handleLogout() {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, stay logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to logout URL
        window.location.href = "/";
      }
    });
  }
})();