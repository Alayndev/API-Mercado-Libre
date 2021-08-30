function removeResults() {
  const productEl = document.querySelectorAll(".result-item");

  productEl.forEach((prod) => prod.remove());
}

function showResults(results) {
  removeResults();

  const templateEl = document.querySelector("#result-item-div");

  const container = document.querySelector(".results");

  const resultsQuantity = document.querySelector(".results-count");
  resultsQuantity.textContent = results.length;

  for (let product of results) {
    const imgEl = templateEl.content.querySelector(".result-item-img");
    imgEl.src = product.thumbnail;

    const titleEl = templateEl.content.querySelector(".result-item-title");
    titleEl.textContent = product.title;

    const conditionEl = templateEl.content.querySelector(
      ".result-item-condition"
    );
    if (product.condition == "new") {
      conditionEl.textContent = product.condition;
      conditionEl.style.color = "#00a650";
    } else if (product.condition == "used") {
      conditionEl.textContent = product.condition;
      conditionEl.style.color = "orange";
    }

    const soldQuantity = templateEl.content.querySelector(".sold-quantity");
    soldQuantity.textContent = product.sold_quantity;

    const price = templateEl.content.querySelector(".result-item-price");
    price.textContent = "$" + product.price;

    const stock = templateEl.content.querySelector(".stock-counter");
    stock.textContent = product.available_quantity;

    const clone = document.importNode(templateEl.content, true);
    container.appendChild(clone);
  }
}

function search() {
  const formEl = document.querySelector(".search-form");

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();

    const wordToSearch = e.target.search.value;

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + wordToSearch)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        showResults(json.results);
      });
  });
}

function main() {
  search();
}

main();
