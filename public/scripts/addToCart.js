const selector = document.querySelector(".addToCart");
selector.addEventListener("click", async (event) => {
  try {
    const data = { product_id: product.target.id };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/orders", opts);
    //winston.INFO(JSON.stringify(data));
    response = await response.json();
    console.log(response);
    if (response.statusCode === 401) alert("PLEASE LOG IN!");
    else location.replace("/orders");
  } catch (error) {
    alert(error.message);
  }
});
