
// selector
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");

async function sendLogin(email, password) {
  try {
    const response = await axios.post("/api/users/login", { email, password });
    if (response.data.success) {
      alert("User logged In");
      // browser
      location.assign("/me");
    } else {
      alert("some Thing went wrong");
    }
  } catch (err) {
    console.log(err);
  }
}
// add event listener
if (login) {
  login.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputArr = document.getElementsByTagName("input");
    const email = inputArr[0].value;
    const password = inputArr[1].value;
    sendLogin(email, password);
  });
}
if (signup) {
  if (response.data.success) {
    location.assign("/");
  }
}
