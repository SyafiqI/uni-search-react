"use client";
//redux
import { useSelector } from "react-redux";
import { RootState } from "../../store/searchStore";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import "./SavedList.css";

//fetch data
import Loading from "./Loading";

//redux
import { useDispatch } from "react-redux";
import {
  update,
  updateloaded,
  updateSavedList,
  updateSearch,
} from "../../slice/searchSlice";
import Paper from "@mui/material/Paper";
import { getData } from "../fetch/fetchData";
import { Suspense } from "react";

export default function SavedList() {
  let savedList = useSelector((state: RootState) => state.search.savedList);
  let loaded = useSelector((state: RootState) => state.search.loaded);
  // let search = useSelector((state: RootState) => state.search.search);
  let uniList = useSelector((state: RootState) => state.search.value);

  const dispatch = useDispatch();

  if (!loaded) {
    getData().then((res) => {
      dispatch(updateSavedList(res.history));
      dispatch(updateloaded(true));
    });
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    dispatch(update(savedList[index]));
    dispatch(updateSearch(savedList[index]));
  };

  if (uniList.length == 0) {
    return (
      <Paper style={{ maxHeight: 200, overflow: "auto" }}>
        <MenuList>
          {savedList.map((save: string, index: number) => {
            return (
              <MenuItem
                style={{ maxHeight: 50 }}
                key={index}
                divider={true}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {save}
              </MenuItem>
            );
          })}
        </MenuList>
      </Paper>
    );
  }
}
