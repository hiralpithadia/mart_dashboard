# Front-end challenge

This is a simple MVP of a fake product.
Required features must be implemented as well with 2 of the optional ones on your choice. Please give a reason for your choices.
You should deliver this project in github, gitlab or in a zip file.
You are free to ask questions to the person who sent you this challenge.

- You can choose any framework you want(or none).
- You can choose any package you want(or none) to handle the data;
- You must update the instructions on "Setup and run" section of this Readme providing instructions on how to run you project;
- You must use the provided data from the functions `getProducts`, `getUsers` and `getComments`
  that have already been called on dashboard.js file. You should not change the api.js file;
- Aesthetics and design will not be evaluated, but the page must be minimally functional.

## Setup and run

Open this folder in your terminal and run:
```shell
npx http-server -os
```
If asked to install the package, press `y`


## Tasks

### Required task
- List every user using the [card](https://getbootstrap.com/docs/5.0/components/card/) component;
- Display in their cards, the count of products each user has using the [badge](https://getbootstrap.com/docs/5.0/components/badge/) component;
- The page must remain responsive;
- Regarding the optional features you choose to implement, the project should be delivered in a "done" status,
  without incomplete features or broken links;

### Optional tasks (implement only two of them)
- Implement a product page/section with a [list group](https://getbootstrap.com/docs/5.0/components/list-group/) ordered by the amount of comments each product has;
- Implement a contact page/section with a simple contact form (name, email, message) with email validation and print the data in console in JSON format on form submit;
- Add any feature you consider important for this MVP, and tell us why you think it's important;
- Add a comment count in the user card (summing up all their product comments) or in the product list.

