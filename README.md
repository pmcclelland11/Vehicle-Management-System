# Vehicle Management System - The Primary Keys 
## UC Berkeley Coding Bootcamp - Group Project #2
Welcome to the Vehicle Inventory Management System for the Certified Pre-Owned Car Lot, your ultimate destination for efficient car searching and management. With the ability to log in or sign up, our website provides users with a personalized experience that includes viewing, filtering, and even editing cars stored in inventory. This application was built with the intension of allowing only registered users (or employees) to gain quick access to the company's inventory. Enjoy!

## Table of Contents 
- [Acceptance Criteria](#acceptance-criteria)
- [Key features and usage](#Key-features-and-usage)
- [Installation](#installation)
- [Authors](#authors)
- [Link to Deployement](#link-to-deployement)
- [Future Development](#future-development)

## Acceptance Criteria
- When a user or sign up for the Vehicle Management System.
- Then a page of all vehicles data will be displayed.
- When the user search for vehicle type or make vehicles data of that specific type will be displayed. 
- When the user click on a add new vehicle button.
- Then a new vehicle is added to the data.

## Key features and usage:
- User-Friendly Interface: Our user-friendly website allows you to seamlessly navigate through a comprehensive database of vehicles. Log in or sign up to access advanced features.

- Inventory Viewing: Once logged in, you gain access to a vast inventory of cars stored within the database. Explore detailed listings with specifications, pricing, and more.

- Smart Filtering: Tailor your search by filtering vehicles based on make or type. Find the perfect car that matches your preferences with ease.

- Add to Inventory: As a registered user, you have the power to add new vehicles into the inventory management system. Simple click the 'Add New Vehicle' button and populate the webform with information about the vehicle you wish to add.

## Installation
To run the project in your local machine:

1. Open visual studio in your computer or laptop
2. Clone the git project: https://github.com/pmcclelland11/Vehicle-Management-System.git
3. Pull the latest from the 'main' branch.
4. Open a new terminal and type 'npm install' to install the necessary dependencies
5. Run the following commands in this order:
6. 'mysql -u root -p'  (put your password) - access MySQL
7. 'source db/schema.sql' - create the database
8. 'exit;'
9. 'node seeeds/seed.js' - seed the database
10. Open a new terminal and type 'npm start' or node server.js
11. Open a web browser and navigate to 'http://localhost:3001'
12. Login or Signup to access the vehicle management system

## Future Development
If we had had more time for this project, there would have been a lot more features that we wished to include. We successfully created routes that allow logged in users to view and add information to the database - with further development, we want the user to be able to perform all of the CRUD methods. This includes being able to edit existing vehicle information using a PUT route & even allowing for the deletion of exisiting vehicles using the DELETE route. Additionally, in future versions of this application, we would ideally give the user more filtering options of the inventory - we currently have routes that can search for vehicles matching mark or type, but it would be simple to implement more routes that allow the user to filter vehicles even further. Lastly, we wished to build out User model roles a little bit further but simply didnt have time to implement. The idea here is that all employees should have access to view inventory, but users that are established as manager profiles should have more features at their disposal (such as adding vehicles, editing vehicles, and deleting). As it stands, any registered user has the ability to add new vehicles to the inventory. Have fun playing around with our Vehicle Management System for a Certified Pre-Owned Car Lot - the link to the deployed application can be found below!

## Authors
- Kowther Kahin: https://github.com/Kowther7
- Patrick McClelland: https://github.com/pmcclelland11

## Link to Deployement
[Link to Deployed App](https://vehicle-management-system-7d99e6ab9a87.herokuapp.com/)
