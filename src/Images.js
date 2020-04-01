import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";

const Images = () => {
  const [images, setImages] = useState([]);
  const [start, setStart] = useState(1);
  const [count, setCount] = useState(30);

  useEffect(() => {
    axios.get(`/api/photos?start=${start}&count=${count}`).then(res => {
      setImages([...res.data]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchImages = () => {
    setStart(start + count);
    axios.get(`/api/photos?start=${start}&count=${count}`).then(res => {
      setImages([...images, ...res.data]);
    });
  };

  console.log("Images:", images);
  return (
    <div className="images">
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {images.map(image => (
          <Image key={image.id} image={image} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Images;
