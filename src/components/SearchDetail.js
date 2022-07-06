import React from "react";
import { useParams } from "react-router-dom";

const SearchDetail = () => {
  const params = useParams();
  if (params.id === "purpose=for-sale") {
    return <></>;
  } else if (params.id === "purpose=for-rent") {
    return <></>;
  }
};

export default SearchDetail;
