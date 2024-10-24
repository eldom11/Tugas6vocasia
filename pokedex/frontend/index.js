let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

function Navbar() {
  return React.createElement(
    "nav",
    { className: "fixed top-0 bg-teal-800 p-4 flex justify-between items-center shadow-lg w-full bg-opacity-90" },
    React.createElement(
      "div",
      { className: "flex items-center ml-7" },
      React.createElement(
        "img",
        { src: "https://fontmeme.com/permalink/241021/001e4420f2db665974c631fed06d5d4c.png", alt: "logo", className: "h-10 mr-3" }
      ),
    ),
    React.createElement(
      "div",
      { className: "flex space-x-4 mr-0  w-1/2 sm:w-1/3 sm:mr-20 justify-around " },
      React.createElement(
        "a",
        { href: "#root", className: "text-white hover:text-yellow-300 hidden sm:block" },
        "Home"
      ),
      React.createElement(
        "a",
        { href: "https://www.pokemon.com/us/animation", target:"_blank", className: "text-white hover:text-yellow-300" },
        "Animation"
      ),
      React.createElement(
        "a",
        { href: "https://corporate.pokemon.com/en-us/about/", target:"_blank", className: "text-white hover:text-yellow-300" },
        "About"
      )
    )
  );
}

// Card component
function PokemonCard(props) {
  const typeElements = Array.isArray(props.types)
    ? props.types.map((type, index) =>
        React.createElement(
          "div", 
          { className: "w-16 h-7 p-1 bg-gray-600 bg-opacity-50 border-current border-2 rounded-lg m-1 hover:scale-125" },
          React.createElement(
            "p",
            { 
              key: index,
              className: "text-xs font-medium text-center text-yellow-300" 
            }, 
            ` ${type.toUpperCase()}`
          )
        )
      )
    : React.createElement(
        "div", 
        React.createElement(
          "p",
          ` ${props.types.toUpperCase()}`
        )
      );

  return React.createElement(
    "div",
    { className: "w-44 h-56 bg-gradient-to-t from-emerald-400 to-lime-50 shadow-lg shadow-syan-500/50 border-current border-2 rounded-md m-1 hover:scale-125" },
    React.createElement("img", { src: props.image, alt: props.name, className: "h-32 w-32 mx-auto hover:scale-150 hover:-translate-y-6" }),
    React.createElement(
      "div",
      { className: "h-20 w-40 mx-auto bg-gradient-to-t from-emerald-500 to-teal-950 rounded-md p-2" },
      React.createElement("h2", { className: "text-center text-lg font-semibold bg-gradient-to-t from-yellow-200 to-yellow-500 text-transparent bg-clip-text" }, props.name.toUpperCase()),
      React.createElement("hr", { className: "h-1 bg-emerald-950" }),
      React.createElement("div", {className: "flex w-full"}, typeElements )
    )
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "bg-gradient-to-r from-emerald-300 to-teal-950" },
    React.createElement(Navbar, null),
    React.createElement(
      "header",
      { className: "p-7 pt-20" },
      React.createElement(
        "h1",
        { className: "text-5xl text-center font-bold font-mono bg-gradient-to-t from-yellow-200 to-yellow-500 text-transparent bg-clip-text" },
        "Pokedex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
