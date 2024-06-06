const params = new URLSearchParams(location.search);
const selector = document.querySelector("#text");
selector.value = params.get("nombre");
document.querySelector("#search").addEventListener("click", async (event) => {
  try {
    const text = selector.value;
    location.search = "nombre=" + text;
  } catch (error) {
    alert(error.message);
  }
});
