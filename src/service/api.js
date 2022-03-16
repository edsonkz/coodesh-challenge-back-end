import axios from "axios";

const apiUrl = "https://api.spaceflightnewsapi.net/v3/";
const api = axios.create({
	baseURL: apiUrl,
});

export { api };
