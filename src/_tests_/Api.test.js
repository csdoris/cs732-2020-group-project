import React from "react";
import apiData from "./test";


it("API testing", async function () {
  const response = new apiData();
  var data = await response.api();

  /* for passing this test successful, everytime please check with the updated number on visiting the api */
  expect(data.cases).toEqual(5401222);
});
