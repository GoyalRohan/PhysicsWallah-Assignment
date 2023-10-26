# PhysicsWallah-Assignment

## Description

This web service provides various API endpoints to manage a dataset of records. It includes functionalities such as adding and deleting records, fetching summary statistics, fetching summary statistics department-wise, fetching summary statistics department-subdepartment and authentication/authorization.

## Deployment

You can access this web service online via Render. It's hosted at the following URL:
https://pwassg.onrender.com

### Authentication and Authorization

- The user can Register/Login himself.
- Basic authentication is implemented with a dummy user (username and password). You can use these credentials for authentication.

  URL:** `POST https://pwassg.onrender.com/auth/login`
  {
      "username": "rohan987", 
      "password": "abcdefgh"
  }
  This will return an accessToken through which we can authorize a user.
  
- Authorization is based on token authentication. Obtain a token after successful authentication to access protected endpoints.

## Accessing API Endpoints

To access the API endpoints and test the service, you can use a tool like Postman. Follow these steps to test the API:

In all APIs, you have to pass the accessToken you got while logging in for authorization.

1. **Add a New Record:**

   - **URL:** `POST https://pwassg.onrender.com/record/add`
   - **Description:** Add a new record to the dataset.
   - **Sample Request:**
        POST https://pwassg.onrender.com/record/add
  
      Sample Input Body
     {
      "name": "Rohan",
      "salary": "5000", "currency": "INR", "department": "Engineering",
      "sub_department": "Platform2"
      }

3. **Delete a Record:**

   - **URL:** `DELETE https://pwassg.onrender.com/record/delete?recordId=id`
   - **Description:** Delete a record from the dataset.
   - **Sample Request:**

     `DELETE https://pwassg.onrender.com/record/delete?recordId=6539216b37733027dfb555ae`

     3. **Fetch Summary Statistics for Salary (Entire dataset):**

   - **URL:** `GET https://pwassg.onrender.com/record/summarystats`
   - **Description:** Get summary statistics (mean, min, max) for salary over the entire dataset.
   - **Sample Request:**
      GET https://pwassg.onrender.com/record/summarystats

4. **Fetch Summary Statistics for Salary (On Contract):**

   - **URL:** `GET https://pwassg.onrender.com/record/summarystatscontract`
   - **Description:** Get summary statistics for salary for records with "on_contract" set to "true".
   - **Sample Request:**
      GET https://pwassg.onrender.com/record/summarystatscontract

5. **Fetch Summary Statistics for Salary (By Department):**

   - **URL:** `GET https://pwassg.onrender.com/record/summarystatsdepartment`
   - **Description:** Get summary statistics for salary for each department.
   - **Sample Request:**
        GET https://pwassg.onrender.com/record/summarystatsdepartment
     

6. **Fetch Summary Statistics for Salary (By Department and Sub-Department):**

   - **URL:** `GET https://pwassg.onrender.com/record/summarystatssubdepartment`
   - **Description:** Get summary statistics for salary for each department and sub-department combination.
   - **Sample Request:**
      GET https://pwassg.onrender.com/record/summarystatssubdepartment
     

### Error Handling

- Proper error codes and error messages are returned for different types of errors, including validation errors, authentication failures, and logic errors in the code.


