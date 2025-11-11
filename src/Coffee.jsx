import { useState, useEffect } from "react";
import "./Coffee.css"
function CoffeeGenerator() {

    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)

    async function getCoffee() {
        try {
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=coffee&client_id=HMukN4MnThFTg26-kYeBZlPGuNIBebP3yboUGdciaME`;
            const response = await fetch(url);
            const getData = await response.json();

            setData(getData);
            console.log(getData)


            setCount(0)


        } catch (error) {
            console.error("Couldnt fetch data ", error)
        }

    }
    useEffect(() => {
        getCoffee()
    }, [page])


    return (
        <>
            {data ? (
                <div className="container">
               

                    <img src={data.results[count].urls.regular} alt="" />
                    <p>{data.results[count].alt_description || "Coffee photo"}</p>

                      <button
                  className="prev"
                        onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                    >Previous Page</button>
                    
                       <button onClick={() => {
                        setCount((prev) => prev >= data.results.length - 1 ? 0 : prev + 1)
                    }}>Generate Image</button>

                   <button onClick={() => setPage((prev) => prev + 1)}
                    className="next"
                    >
                     Next Page 
                    </button>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default CoffeeGenerator