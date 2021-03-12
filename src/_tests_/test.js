class apiData {
  api() {
    return fetch("https://corona.lmao.ninja/v2/all").then((response) => {
      return response.json();
    });
  }
}

export default apiData;
