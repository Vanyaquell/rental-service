import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reduce.ts";

export const store = configureStore({ reducer });