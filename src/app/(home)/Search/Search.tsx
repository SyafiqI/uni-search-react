"use client";

import TextField from "@mui/material/TextField";
import "../../App.css";
import { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { update, updateSearch } from "../../slice/searchSlice";
import { RootState } from "@/app/store/searchStore";

export default function Search() {
  const [inputValue, setInputValue] = useState<string>("");

  //redux
  const dispatch = useDispatch();
  let searchValue = useSelector((state: RootState) => state.search.search);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    dispatch(updateSearch(inputValue));
    const delayInputTimeoutId = setTimeout(() => {
      dispatch(update(inputValue));
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div>
      <h1>Search for a university</h1>

      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          autoFocus
          fullWidth
          label="Search"
          placeholder="Search by university name or by country"
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={searchValue}
        />
      </div>
    </div>
  );
}
