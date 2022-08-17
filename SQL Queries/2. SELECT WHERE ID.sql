--This query will select a specific product record based on it's product ID
SELECT 
     id
     ,name
    ,price
    ,quantityInStock
FROM dbo.Products
WHERE Id = @{$.Parameters.productId}
