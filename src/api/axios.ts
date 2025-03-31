import axios from "axios";
import { BASE_URL } from "../constants";

export const defaultInstance = axios.create({ baseURL: BASE_URL, timeout: 2000 });
