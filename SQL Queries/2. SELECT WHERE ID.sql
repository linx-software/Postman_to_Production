SELECT id
      ,name
      ,price
      ,quantityInStock
  FROM dbo.Products
  WHERE Id = @{$.Parameters.Data.productId}