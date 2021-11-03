import { getComments, getUsers, getProducts } from "./api.js";

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
    let filteredComments = productsByComment[post.id];
    let commentList = filteredComments
      .map((comment) => {
        return `<li class="list-group-item">
                  <p style="color: grey; font-size: small; margin-bottom: 3px"> Comment by: ${comment.email}</p>
                  <h6 class="fw-bold" style="margin-bottom: 5px">${comment.name}</h6>
                  <p style="margin-bottom: 0px">${comment.body}</p>
                </li>`;
      }).join("");
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
