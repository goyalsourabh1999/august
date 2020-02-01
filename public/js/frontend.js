
// selector
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const uploadPlanImages = document.querySelector(".uploadPlanImages");
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
async function addFormdata(form) {
  const button=document.querySelector(".updatebtn");
  const id=button.getAttribute("planId")
  const response = await axios.patch(`/api/plans/${id}`, form);
  if (response.data.success) { alert("Plan Successfully uploaded") }
}
// add event listener
if (login) {
  login.addEventListener("submit", function (event) {
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
if (uploadPlanImages) {
  uploadPlanImages.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = new FormData();
    const inputs = document.getElementsByTagName("input");
    form.append("cover",inputs[0].value);
    for (var i = 1; i < inputs.length; i++) {
      form.append("picture",inputs[i].value);
    }
addFormdata(form)

  })
}
