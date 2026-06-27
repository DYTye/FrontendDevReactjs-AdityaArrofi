import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function detail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    async function fetchDetail() {
      const response = await fetch(
        `https://6a3faf1c9b6d371e83810e01.mockapi.io/restorant/${id}`,
      );
      const data = await response.json();
      console.log(data);
      setRestaurant(data);
    }
    fetchDetail();
  }, [id]);

  if (!restaurant) {
    return <div>Loading</div>;
  }

  console.log(restaurant.reviews);
  return (
    <div>
      <div className="flex flex-col justify-center gap-5 max-w-3xl mx-auto">
        <div className="flex flex-col">
          <div className="w-full mb-5">
            <img
              src={restaurant?.photos}
              alt=""
              className="w-full h-100 object-cover"
            />
          </div>
          <p className="text-3xl">{restaurant.name}</p>
          <p>{restaurant.rating}</p>
        </div>
        <div>
          <p>{restaurant.description}</p>
        </div>
        <div className="flex justify-center">
          <iframe
            src={restaurant?.map}
            frameborder="0"
            className="aspect-video max-w-xl"
          ></iframe>
        </div>
        {restaurant.reviews?.map((item) => {
          return (
            <div key={item.index}>
              <div className="flex items-center gap-5">
                <img src={item.image} alt="" className="rounded-full aspect-square object-cover h-12"/>
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <p>{item.name}</p>
                    <p>-</p>
                    <p>{item.rating}</p>
                  </div>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default detail;
