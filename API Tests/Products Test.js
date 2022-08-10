const products = pm.response.json();
pm.test("More than 20 valid products", function () {
	pm.expect(products.length).to.greaterThan(20, "Expected more than 20 items");
    products.forEach(x => {
        pm.expect(x.id).to.greaterThan(0, "Id should be > 0");
    })
});