import axios from "axios";
import { accountService } from "../serviceRequest/accountService";



const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_API_URL,
  headers: { Authorization: `Bearer ${accountService?.accountValue?.token}` },
});
export default httpRequest;
