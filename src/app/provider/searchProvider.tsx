"use client";
import { Provider } from "react-redux";
import { store } from "../store/searchStore";
import React from "react";

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
