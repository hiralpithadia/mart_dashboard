import { getComments, getUsers, getProducts } from "./api.js";

window.onload = function () {
  const menuItem = document.querySelectorAll("#sidebarMenu li a.nav-link");
  menuItem.forEach((item) => {
    item.addEventListener("click", function (event) {
      const activeTab = document.querySelectorAll(".nav-link.active")[0];
      activeTab.classList.remove("active");
      const showActive = document.getElementById(event.target.id);
      showActive.classList.add("active");
    });
  });

  const submitBtn = document.querySelector("button.submitBtn");
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const result = validateEmail(event.target.form.email.value);
    if (result) {
      document.getElementsByTagName("form")[0].style.display = "none";
      const submitData = {
        name: event.target.form.name.value,
        email: event.target.form.email.value,
        msg: event.target.form.message.value,
      };
      document.getElementById("submittedData").innerHTML =
        "Thank you your data is submitted!";
      console.log("Data Submitted: " + JSON.stringify(submitData));
    } else {
      document.getElementsByTagName("form")[0][1].style.borderColor = "#ff0000";
      document.getElementById("emailError").innerHTML =
        "Please add email address with correct format.";
      document.getElementById("emailError").style.color = "#ff0000";
    }
  });

  function validateEmail(email) {
    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validateEmail.test(String(email).toLowerCase());
  }
};

const products = await getProducts();
const userProductCount = products.reduce((usersSoFar, { userId }) => {
  if (!usersSoFar[userId]) usersSoFar[userId] = 0;
  usersSoFar[userId]++;
  return usersSoFar;
}, {});

const comments = await getComments();

const productsByComment = comments.reduce((productSoFar, comment) => {
  if (!productSoFar[comment.productId]) productSoFar[comment.productId] = [];
  productSoFar[comment.productId].push(comment);
  return productSoFar;
}, {});

const sortedProductsReversed = products.sort((x, y) => {
  return productsByComment[y.id].length - productsByComment[x.id].length;
});

getUsers().then((users) => {
  // code to show User cards
  document.getElementById("showUsersCards").innerHTML = users
    .map((user, index) => {
      return `<div class="userCard card">
          <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" class="card-img-top" alt="..." width: "100px">
          <div class="card-body">
            <h6 class="card-title userName">${user.name}</h6>
            <p class="card-text font-weight-bold userEmail" title=${
              user.email
            }>${user.email}</p>
            <p class="card-text font-weight-bold">User ID: ${user.id}</p>
            <p class="card-text font-weight-bold">Products Used: <span class="badge bg-primary">${
              userProductCount[user.id] !== undefined
                ? userProductCount[user.id]
                : 0
            }</span></p>
        </div></div>`;
    })
    .join("");
});

document.getElementById("showAllProducts").innerHTML = sortedProductsReversed
  .map((post, index) => {
    const filteredComments = productsByComment[post.id];
    const commentList = filteredComments
      .map((comment) => {
        return `<li class="list-group-item">
                  <p class="usersEmailInComment"> Comment by: ${comment.email}</p>
                  <h6 class="fw-bold usersNameInComment">${comment.name}</h6>
                  <p class="usersCommentInComment">${comment.body}</p>
                </li>`;
      })
      .join("");
    return `<li class="list-group-item">
            <div class="me-auto productData">
              <div class="fw-bold">${post.title}</div>
              <p>${post.body}</p>
            </div>
            <button data-bs-toggle="collapse" href="#comments${index}" role="button" aria-expanded="false" aria-controls="collapseExample" class="viewComments">View ${filteredComments.length} comments</button>
            <div id="comments${index}" class="collapse">
            <ul class="list-group">${commentList}</ul>
            </div>
          </li>`;
  })
  .join("");
