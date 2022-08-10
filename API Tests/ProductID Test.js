pm.test("Id is same as path param", function () {
    const path = pm.request.url.path;
    const pathParam = path[path.length-1];
    pm.expect(pm.response.json().id.toString()).to.equal(pathParam);
});
