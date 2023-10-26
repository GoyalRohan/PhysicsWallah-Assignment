# PhysicsWallah-Assignment

## Description

This web service provides various API endpoints to manage a dataset of records. It includes functionalities such as adding and deleting records, fetching summary statistics, fetching summary statistics department-wise, fetching summary statistics department-subdepartment, and authentication/authorization.

## Deployment

You can access this web service online via Render. It's hosted at the following URL:
https://pwassg.onrender.com

### Authentication and Authorization

- The user can Register/Login himself.
- The user can register himself by accessing this API.

  URL:** `POST https://pwassg.onrender.com/auth/register`
  {
    "email": "rohangoyal991gmail.com", 
    "username": "rohan987", 
    "password": "abcdefgh"
  }
  This will return an accessToken through which we can authorize a user.


- Basic authentication is implemented with a dummy user (username and password). You can use these credentials for authentication. We have used passportJs for authentication.

  Example :
  
  URL:** `POST https://pwassg.onrender.com/auth/login`
  {
      "username": "rohan987", 
      "password": "abcdefgh"
  }
  This will return an accessToken through which we can authorize a user.

  {
    "authToken":         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzOTcwODVhZmM5YTBjNGU0YjVlN2ZlIn0sImlhdCI6MTY5ODI5MTI5OX0.F73s__86EeWePYAbL2LL-xIt44fHxYEP2Ivsv2flp2A"
  }
  
- Authorization is based on token authentication. Obtain a token after successful authentication to access protected endpoints.

## Accessing API Endpoints

To access the API endpoints and test the service, you can use a tool like Postman. Follow these steps to test the API:

In all APIs, you have to pass the accessToken in the header of the request you got while logging in for authorization.

1. **Add a New Record:**

   - **URL:** `POST https://pwassg.onrender.com/record/add`
   - **Description:** Add a new record to the dataset.
   - **Sample Request:**
        POST https://pwassg.onrender.com/record/add

      Example :
     
      Sample Input Body
     {
      "name": "Rohan",
      "salary": "5000", "currency": "INR", "department": "Engineering",
      "sub_department": "Platform2"
      }

      Returned Object :
       {
          "message": "Record added successfully",
          "record": {
              "name": "Rohan",
              "salary": 5000,
              "currency": "INR",
              "department": "Engineering",
              "sub_department": "Platform2",
              "on_contract": false,
              "_id": "6539df122b9a8ccf572693a5",
              "__v": 0
          }
      }
    
     

2. **Delete a Record:**

   - **URL:** `DELETE https://pwassg.onrender.com/record/delete?recordId=id`
   - **Description:** Delete a record from the dataset.
   - **Sample Request:**

     `DELETE https://pwassg.onrender.com/record/delete?recordId=6539df122b9a8ccf572693a5`

     Returned Object :
     {
        "message": "Record deleted successfully",
        "record": {
            "_id": "6539df122b9a8ccf572693a5",
            "name": "Rohan",
            "salary": 5000,
            "currency": "INR",
            "department": "Engineering",
            "sub_department": "Platform2",
            "on_contract": false,
            "__v": 0
        }
    }

3. **Fetch Summary Statistics for Salary (Entire dataset):**

   - **URL:** `GET https://pwassg.onrender.com/record/summarystats`
   - **Description:** Get summary statistics (mean, min, max) for salary over the entire dataset.
   - **Sample Request:**
      GET https://pwassg.onrender.com/record/summarystats

     Returned Object:
     {
        "mean": 20059012,
        "min": 30,
        "max": 200000000
    }

4. **Fetch Summary Statistics for Salary (On Contract):**

   - **URL:** `GET https://pwassg.onrender.com/record/summarystatscontract`
   - **Description:** Get summary statistics for salary for records with "on_contract" set to "true".
   - **Sample Request:**
      GET https://pwassg.onrender.com/record/summarystatscontract

     Returned Object:
     {
        "mean": 100000,
        "min": 90000,
        "max": 110000
    }

5. **Fetch Summary Statistics for Salary (By Department):**

   - **URL:** `GET https://pwassg.onrender.com/record/summarystatsdepartment`
   - **Description:** Get summary statistics for salary for each department.
   - **Sample Request:**
        GET https://pwassg.onrender.com/record/summarystatsdepartment

     Returned Object:
     {
        "Engineering": {
            "mean": 33416671.666666668,
            "min": 30,
            "max": 200000000
        },
        "Banking": {
            "mean": 90000,
            "min": 90000,
            "max": 90000
        },
        "Operations": {
            "mean": 30,
            "min": 30,
            "max": 30
        },
        "Administration": {
            "mean": 30,
            "min": 30,
            "max": 30
        }
    }

6. **Fetch Summary Statistics for Salary (By Department and Sub-Department):**

   - **URL:** `GET https://pwassg.onrender.com/record/summarystatssubdepartment`
   - **Description:** Get summary statistics for salary for each department and sub-department combination.
   - **Sample Request:**
      GET https://pwassg.onrender.com/record/summarystatssubdepartment

     Returned Object:
     {
        "Engineering": {
            "Platform2": {
                "mean": 5000,
                "min": 5000,
                "max": 5000
            },
            "Platform": {
                "mean": 40099006,
                "min": 30,
                "max": 200000000
            }
        },
        "Banking": {
            "Loan": {
                "mean": 90000,
                "min": 90000,
                "max": 90000
            }
        },
        "Operations": {
            "CustomerOnboarding": {
                "mean": 30,
                "min": 30,
                "max": 30
            }
        },
        "Administration": {
            "Agriculture": {
                "mean": 30,
                "min": 30,
                "max": 30
            }
        }
    }


### Error Handling

- Proper error codes and error messages are returned for different types of errors, including validation errors, authentication failures, and logic errors in the code.


