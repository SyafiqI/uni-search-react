"use client";

import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { createUniLink } from "../../../../utils/helpers";

//redux
import type { RootState } from "../../store/searchStore";
import { useSelector } from "react-redux";

//env
import { postData } from "../fetch/fetchData";

export default function UniList() {
  let uniList = useSelector((state: RootState) => state.search.value);

  let itemList = uniList.map((item: any, index: number) => {
    let uniLink = "/" + createUniLink(item.name);
    return (
      <ListItem
        key={index}
        divider={true}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            href={uniLink}
            onClick={() => {
              postData(item.name);
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        }
      >
        {item.name}, {item.country}
      </ListItem>
    );
  });

  return (
    <div>
      {uniList.length != 0 ? `${uniList.length} universities found` : ""}
      <List>{itemList}</List>
    </div>
  );
}
