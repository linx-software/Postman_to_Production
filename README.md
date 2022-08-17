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
#### Setup:
1. Install Postman
2. Install Linx
3. If you will not be using our database, you need to set up a database. Scripts are provided. Go to the ‘[OPTIONAL] Setup Database’ section for instructions.

### Create the API
#### IN POSTMAN:
1. In Postman, Create a workspace for your project
2. Go to APIs and create a new API named Product with OpenAPI 3.0 Schema type and YAML as the Schema Format
3. Define the API, this can be done by copying the below [API schema in the repo](https://github.com/linx-software/Postman_to_Production/blob/main/API%20Definition/ProductAPI.yml):
```YAML
openapi: "3.0.0"
info:
  version: 1.0.0
  title: Product API
servers:
  - url: http://localhost:5000
paths:
  /products:
    get:
      summary: Get all products
      operationId: getAllProducts
      tags:
        - products
      responses:
        '200':
          description: List of products
          content:
            application/json:    
              schema:
                $ref: "#/components/schemas/Products"
        default:
          description: Unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /products/{productId}:
    get:
      summary: Get product by id
      operationId: getProductById
      tags:
        - products
      parameters:
        - name: productId
          in: path
          required: true
          description: The id of the product to retrieve
          schema:
            type: integer
      responses:
        '200':
          description: The product requested
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
        default:
          description: Unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
components:
  schemas:
    Product:
      type: object
      required:
        - id
        - name
        - price
        - quantityInStock
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        price:
          type: number
        quantityInStock:
          type: integer
          format: int64
    Products:
      type: array
      items:
        $ref: "#/components/schemas/Product"
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
```
4. The API will be tested during development. For this, we need to create a Test Suite by clicking on the Add Test Suite button in the test section. Call it ‘ProductAPI’   
#### IN LINX
5. You are now ready to build the API backend in Linx. In Linx create a new solution and add the REST plugin by clicking on the ‘ADD PLUGINS’ button
6. Add a RESTHost service to your solution
7. Paste the API Definition (YAML) into the API Definition property 
```YAML
openapi: "3.0.0"
info:
  version: 1.0.0
  title: Product API
servers:
  - url: http://localhost:5000
paths:
  /products:
    get:
      summary: Get all products
      operationId: getAllProducts
      tags:
        - products
      responses:
        '200':
          description: List of products
          content:
            application/json:    
              schema:
                $ref: "#/components/schemas/Products"
        default:
          description: Unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /products/{productId}:
    get:
      summary: Get product by id
      operationId: getProductById
      tags:
        - products
      parameters:
        - name: productId
          in: path
          required: true
          description: The id of the product to retrieve
          schema:
            type: integer
      responses:
        '200':
          description: The product requested
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
        default:
          description: Unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
components:
  schemas:
    Product:
      type: object
      required:
        - id
        - name
        - price
        - quantityInStock
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        price:
          type: number
        quantityInStock:
          type: integer
          format: int64
    Products:
      type: array
      items:
        $ref: "#/components/schemas/Product"
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
```
8. Set the Base URI to be http://localhost:5000
9. Save your solution
10. Debug the REST Host service. Do this by clicking on the Debug button, and then when it becomes available click on the Start button. This will start the service in a locally hosted instance for you to test.
#### IN POSTMAN
11. Run all the tests. If setup correctly, all tests will pass but there will be no more detail than that. This is because no tests have been set up. You will receive a "500 Internal Server Error" response from the API no logic has been specified for the back-end process
12. Add the tests to each of the methods. This can be done by clicking on the method and then selecting the ‘test’ tab. The test functions have all been pre-created in this repo.
    - For products add the test specified [here](https://github.com/linx-software/Postman_to_Production/blob/main/API%20Tests/Products%20Test.js).
    ```javascript
	const products = pm.response.json();
	pm.test("More than 20 valid products", function () {
	pm.expect(products.length).to.greaterThan(20, "Expected more than 20 items");
   	 products.forEach(x => {
        pm.expect(x.id).to.greaterThan(0, "Id should be > 0");
   	 })
	});
    ```  
    - For productid add the test specified [here](https://github.com/linx-software/Postman_to_Production/blob/main/API%20Tests/ProductID%20Test.js).
    ```javascript
       pm.test("Id is same as path param", function () {
       const path = pm.request.url.path;
       const pathParam = path[path.length-1];
      pm.expect(pm.response.json().id.toString()).to.equal(pathParam);
      });
    ```
13. Run the tests again, they should now fail because no logic has been specified for the back-end process. You will still receive a "500 Internal Server Error" response from the API 
#### IN LINX
13. For the getAllProducts event:
    - Add the Database Plugin
    - Add an ExecuteSQL function
    - Create a new setting for the database connection string. The setting will be called DB_Connection and should have the following connection string value provided below (if you choose to do this via your own database, the connection string should reflect that). Here is the connection string:
    ```
    Server=postmandb.northeurope.cloudapp.azure.com;Database=postmanTemplate;User Id=Guest_User;Password=DwVHXx!sVeA9x52Mhus6Vfg?;
    ```
    - Set the connection string in the ExecuteSQL function to be the DB_Connection setting created above. It will look something like this: _$.Settings.DB_Connection_
    - Leave the Connection Type as 'SQL Server'
    - Add the [SQL in the repo](https://github.com/linx-software/Postman_to_Production/blob/main/SQL%20Queries/1.%20SELECT%20ALL.sql) to that ExecuteSQL function:

    ```SQL
    SELECT 
         id
        ,name
        ,price
        ,quantityInStock
     FROM dbo.Products;
    ```
    - Change the return options of the ExecuteSQL function to be 'List of rows'
    - Add a SetValue function to the event that will set the response body to the ExecuteSQL result. To do this set the Target as '$.Result' and for the source, click on the edit button, then in the Response200 section select 'ExecuteSQL' (the result of the SQL query from the function)
14. For the getProductByID event:
    - Add an ExecuteSQL function
    - Set the connection to be the DB_Connection setting created above (in step 13)
    - Add the [SQL in the repo](https://github.com/linx-software/Postman_to_Production/blob/main/SQL%20Queries/2.%20SELECT%20WHERE%20ID.sql) to that ExecuteSQL function:
    
    ```SQL
    --This query will select a specific product record based on it's product ID
    SELECT 
        id
        ,name
        ,price
        ,quantityInStock
    FROM dbo.Products
    WHERE Id = @{$.Parameters.productId}
    ```
    (_Note: If you get an error stating that the parameter can not be found, remove '@{$.Parameters.productId}' and replace it with the correct parameter passed in via the API call from the '$.Parameters' section in the query editor._)
    - Change the return option of the ExecuteSQL function to only return the 'First row'.
    - Add a SetValue function to the event that will set the response body to the ExecuteSQL result. To do this set the Target as '$.Result' and for the source, click on the edit button, then in the Response200 section select 'ExecuteSQL' (the result of the SQL query from the function)
15. Debug the RESTHost Service
#### IN POSTMAN
16. Run all tests again, they should now pass. 
    - If you are receiving an Internal Server Error for getProductById, ensure that a suitable parameter is being passed for the Product ID, making this parameter 1 should work as there is a product with ID 1.

After that is done, you can deploy the solution to a Linx server. Once deployed, the Linx server will host the API and the documentation (this can be set up on the RESTHost by selecting Documentation). You can continue to use Postman to test your hosted API, just be sure to point to the Linx Server BaseURI. 

### [OPTIONAL] Setup Database:
Create the table with this [creation script](https://github.com/linx-software/Postman_to_Production/blob/main/DB%20Setup/Products%20TABLE%20CREATE%20Scropt.sql)
Insert the [data](https://github.com/linx-software/Postman_to_Production/blob/main/DB%20Setup/Product%20Data%20INSERT%20Script.sql) into the above-created table. 


## Contributing

For questions please ask the [Linx community](https://linx/software/community) or use the [Slack channel](https://linxsoftware.slack.com/archives/C01FLBC1XNX). 

## License

[MIT](https://github.com/linx-software/template-repo/blob/main/LICENSE.txt)
