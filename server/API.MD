## Middlewares

The server uses the following middlewares:

- `body-parser`: This middleware is used to parse the request body and make it available on the `req.body` object.
- `cors`: This middleware is used to enable Cross-Origin Resource Sharing (CORS) for the server.

## Routes

The server has the following routes:

### Employees

- `POST /employees`: This route creates a new employee and stores it in the Employee collection.
- `GET /employees/:name`: This route gets an employee by their name from the Employee collection.
- `POST /employees/:employeeId/lists`: This route creates a new list for the employee with ID `employeeId` and stores it in the `lists` array of the Employee collection.

### Lists

- `GET /employees/:employeeId/lists`: This route gets all the lists for the employee with ID `employeeId` from the Employee collection.
- `DELETE /employees/:employeeId/lists/:listId`: This route deletes the list with ID `listId` from the `lists` array of the employee with ID `employeeId` in the Employee collection.

### Parcels

- `POST /employees/:employeeId/lists/:listId/parcels`: This route adds a new parcel to the list with ID `listId` for the employee with ID `employeeId` in the Employee collection.
- `PATCH /employees/:employeeId/lists/:listId/parcels/:parcelId`: This route updates the parcel with ID `parcelId` in the list with ID `listId` for the employee with ID `employeeId` in the Employee collection.
- `DELETE /employees/:employeeId/lists/:listId/parcels/:parcelId`: This route deletes the parcel with ID `parcelId` from the list with ID `listId` for the employee with ID `employeeId` in the Employee collection.

## Models

The server uses the following Mongoose models:

- `Employee`: This model represents an employee and has a `lists` field that stores an array of `listSchema` objects.
- `listSchema`: This schema represents a list and has a `parcels` field that stores an array of `parcelSchema` objects.
- `parcelSchema`: This schema represents a parcel and has fields for `name`, `description`, and `status`.

Note: The code for the `listSchema` and `parcelSchema` models is not included in this code block.

## Functions

The server uses the following functions:

### Employees

- `createEmployee`: This function creates a new employee and stores it in the Employee collection. It checks if an employee with the same name already exists and returns an error if it does.
- `getEmployeeByName`: This function gets an employee by their name from the Employee collection. It populates the `lists.parcels` field for the employee.

### Lists

- `addList`: This function creates a new list for the employee with ID `employeeId` and stores it in the `lists` array of the Employee collection.