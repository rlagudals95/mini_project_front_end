import React from "react";
import { useEffect, useState } from "react";
import InfinityScroll from "./InifinityScroll";

const InfiTest = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  InfinityScroll(query, pageNumber);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <React.Fragment>
      <input type="text" />
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Loading...</div>
      <div>Error...</div>
    </React.Fragment>
  );
};

export default InfiTest;
