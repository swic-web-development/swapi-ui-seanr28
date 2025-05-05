import Button from "./components/button.js";
import Input from "./components/input.js";
import Label from "./components/label.js";
import TextArea from "./components/textarea.js";

const app = document.getElementById("app");

const container = document.createElement("div");
container.className = "flex flex-col items-center justify-center min-h-screen text-center space-y-4";

container.innerHTML = `
  ${Label({ forId: "searchInput", text: "Search Star Wars characters:" })}
  ${Input({ id: "searchInput", placeholder: "Enter name..." })}
  ${Button({ id: "searchButton", text: "Search" })}
  ${TextArea({ id: "results" })}
`;

app.appendChild(container);

document.getElementById("searchButton").addEventListener("click", fetchData);

async function fetchData() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  try {
    const response = await fetch(`https://www.swapi.tech/api/people?name=${query}`);
    const data = await response.json();

    document.getElementById("results").innerHTML =
      data.result.length
        ? `<div class="border border-gray-700 p-4 rounded bg-gray-800 text-white">
             <h2 class="text-2xl font-bold">${data.result[0].properties.name}</h2>
             <p class="text-lg">Height: ${data.result[0].properties.height} cm</p>
             <p class="text-lg">Mass: ${data.result[0].properties.mass} kg</p>
             <p class="text-lg">Birth Year: ${data.result[0].properties.birth_year}</p>
             <p class="text-lg">Gender: ${data.result[0].properties.gender}</p>
             <p class="text-lg">Skin Color: ${data.result[0].properties.skin_color}</p>
             <p class="text-lg">Eye Color: ${data.result[0].properties.eye_color}</p>
           </div>`
        : "<p>No results found.</p>";
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("results").innerHTML = "<p>Error fetching data.</p>";
  }
}
