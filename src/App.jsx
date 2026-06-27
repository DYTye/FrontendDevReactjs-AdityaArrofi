import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Footer from "./Footer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [dataApi, setDataApi] = useState([]);
  const [btnBuka, setBtnBuka] = useState(false);
  const [filterPrice, setFilterPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      let url = `https://6a3faf1c9b6d371e83810e01.mockapi.io/restorant`

      if (filterCategory != "") url = `${url}?categories=${filterCategory}`;

      const response = await fetch(
        `${url}`,
      );
      const data = await response.json();
      console.log(data[0]);
      setDataApi(data);
    }
    fetchData();
  }, [filterCategory]);

  // function filterOpen(restorant) {
  //   return restorant.isOpen === true;
  // }

  const openOrClose = dataApi?.filter((restorant) => {
    if (btnBuka === true && restorant.isOpen !== true) {
      return false;
    }

    if (filterPrice !== "" && restorant.priceRange !== filterPrice) {
      return false;
    }
    return true;
  });


  return (
    <div className=" flex justify-center flex-col gap-5 m-5">
      <div className="flex flex-col justify-start">
        <p className="text-6xl">Restaurant</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          esse.
        </p>
      </div>

      <hr />
      <div className="flex items-center gap-4">
        <p>Filter by:</p>
        <div className="flex gap-2">
          <label htmlFor="isOpen" className="underline underline-offset-4">
            Open now
          </label>
          <input
            id="isOpen"
            type="checkbox"
            onChange={(e) => setBtnBuka(e.target.checked)}
          />
        </div>
        <select
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          className="underline underline-offset-4 border-none outline-none"
        >
          <option value="">All Price</option>
          <option value="$">$(Cheap)</option>
          <option value="$$">$$(Moderate)</option>
          <option value="$$$">$$$(Expensive)</option>
        </select>
        <div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="underline underline-offset-4 border-none outline-none bg-transparent cursor-pointer"
          >
            <option value="">Category</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Padang">Padang</option>
            <option value="Japanese">Japanese</option>
            <option value="Italian">Italian</option>
            <option value="Western">Western</option>
            <option value="Coffee">Coffee</option>
            <option value="Sushi">Sushi</option>
            <option value="Ramen">Ramen</option>
            <option value="Steak">Steak</option>
            <option value="Coffee">Coffee</option>
            <option value="Italian">Italian</option>
            <option value="Western">Western</option>
            <option value="Fast Food">Fast Food</option>
          </select>
        </div>
        <div className="ring-2 rounded-md">
          <button
            className="p-3"
            onClick={(() => {
              (setBtnBuka(false), setFilterCategory(""), setFilterPrice(""));
            })}
          >
            Clear All
          </button>
        </div>
      </div>
      <hr />

      <div className="grid grid-cols-4 gap-4">
        {openOrClose?.map((item) => {
          return (
            <div key={item.id} className="flex flex-col gap-2 m-2">
              <img src={item?.photos} alt="" className="aspect-square" />
              <p className="text-2xl">{item?.name}</p>
              <p>{item?.rating} </p>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <p className="font-light">{item?.categories?.join(",")}</p>
                  <p>-</p>
                  <p className="font-light">{item?.priceRange}</p>
                </div>
                <p>{item?.isOpen ? "open" : "close"}</p>
              </div>
              <div className="bg-blue-900 text-white text-bold">
                <div className="p-3 text-center">
                  <Link to={`/restaurant/${item.id}`}>Learn More</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
