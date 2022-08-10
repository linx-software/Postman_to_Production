# Postman to Production

## Description
This repo contains all resources necessary to complete the postman to production tutorial. The steps to complete the tutorial are also included below (under the Tutorial Steps section).

The video tutorial can be followed on [YouTube here](https://www.youtube.com/watch?v=UT02poSpfgg)

The Repo contains the following:
- OpenAPI Definition in the form of a YAML file. (Postman_to_Production/API Definition/ProductAPI.yml)
- API Test that will be used in postman (Postman_to_Production/API Tests/)
- SQL Queries to be used in Linx (Postman_to_Production/SQL Queries/)
- OPTIONAL: SQL scripts to create the Products table and insert data (Postman_to_Production/DB Setup/)

A database has been created that contains the data required to test the API. You can use the following URI {URI goes here}. More detail is below. 

## Installation
Postman
Postman can be [downloaded](https://www.postman.com/downloads/) from their official website. 
Linx
Linx can be downloaded from [linx.software](https://linx.software/). Sign up for the designer, you will receive your licence via email. 
Creating the SQL Table [OPTIONAL]
You can use the database provided, however if you do not want to use the hosted database you can create the table with the data on your local database. The scripts to create the table in Microsoft SQL Server can be found in the Postman_to_Production/DB Setup/ folder. First create the table then insert the data. 


## Tutorial Steps
### Steps:
### Setup:
1. Install Postman
2. Install Linx
3. If you will not be using our database, you need to set up a database. Scripts are provided. Go to the ‘[OPTIONAL] Setup Database’ section for instructions.

### Create the API
#### IN POSTMAN:
1. In Postman, Create a workspace for your project
2. Go to APIs and create a new API named Product with OpenAPI 3.0 Schema type
3. Define the API, this can be done by copying the [API schema in the repo](https://github.com/linx-software/Postman_to_Production/blob/main/API%20Definition/ProductAPI.yml) 
4. The API will be tested during development. For this, we need to create a Test Suite by clicking on the Add Test Suite button in the test section. Call it ‘ProductAPI’
#### IN LINX
5. You are now ready to build the API backend in Linx. In Linx, add the REST plugin by clicking on the ‘ADD PLUGINS’ button
6. Add a RESTHost service to your solution
7. Paste the API Definition (YAML) into the API Definition property 
8. Set the Base URI to be http://localhost:5000
9. Debug the REST Host service
#### IN POSTMAN
10. Run all the tests. If setup correctly, all tests will pass but there will be no more detail than that. This is because no tests have been set up
11. Add the tests to each of the methods. This can be done by clicking on the method and then selecting the ‘test’ tab. The test functions have all been pre-created in this repo.
  i. For products add the test specified [here](https://github.com/linx-software/Postman_to_Production/blob/main/API%20Tests/Products%20Test.js).
  ii. For productid add the test specified [here](https://github.com/linx-software/Postman_to_Production/blob/main/API%20Tests/ProductID%20Test.js).
12. Run the tests again, they should now fail because no logic has been specified for the back-end process
#### IN LINX
13. For the getAllProducts event:
  i. Add the Database Plugin
  ii. Add an ExecuteSQL function
  iii. Create a new setting for the database string using the database hosted on the following URI {db URI HERE}. You can also use a locally hosted database if you prefer that. All scripts and instructions have been provided
iv. The setting will be called DB_Connection and should have the following connection string value {Connection string} (if you choose to do this via your own database, the connection string should reflect that)
v. Set the connection to be the DB_Connection setting created above
vi. Add the [SQL in the repo](https://github.com/linx-software/Postman_to_Production/blob/main/SQL%20Queries/1.%20SELECT%20ALL.sql) to that ExecuteSQL function
vii. Change the ExecuteSQL function to only return a list of rows
viii. Add a SetValue function to the event, that will set the response body to the ExecuteSQL result. 
14. For the getProductByID event:
i. Add an ExecuteSQL function
ii. Set the connection to be the DB_Connection setting created above (in step 13)
iii. Add the [SQL in the repo](https://github.com/linx-software/Postman_to_Production/blob/main/SQL%20Queries/2.%20SELECT%20WHERE%20ID.sql) to that ExecuteSQL function
iv. Change the ExecuteSQL function to only return the first value
v. Add a SetValue function to the event, that will set the response body to the ExecuteSQL result. 
15. Debug the RESTHost Service
#### IN POSTMAN
16. Run all tests again, they should now pass. 

After that is done, you can deploy the solution to a Linx server. Once deployed, the Linx server will host the API and the documentation (this can be set up on the RESTHost by selecting Documentation). You can continue to use Postman to test your hosted API, just be sure to point to the Linx Server BaseURI. 

### [OPTIONAL] Setup Database:
Create the table with this [creation script](https://github.com/linx-software/Postman_to_Production/blob/main/DB%20Setup/Products%20TABLE%20CREATE%20Scropt.sql)
Insert the [data](https://github.com/linx-software/Postman_to_Production/blob/main/DB%20Setup/Product%20Data%20INSERT%20Script.sql) into the above-created table. 


## Contributing

For questions please ask the [Linx community](https://linx/software/community) or use the [Slack channel](https://linxsoftware.slack.com/archives/C01FLBC1XNX). 

## License

[MIT](https://github.com/linx-software/template-repo/blob/main/LICENSE.txt)
