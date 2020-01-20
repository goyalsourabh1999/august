console.log("I have been loaded to frontend");
// console.log(axios);
async function login() {
  const answer = await axios.post("/api/login", {
    email: "abcd@gmail.com",
    password: "12345"
  });
  location.assign("/");
}
// login();
