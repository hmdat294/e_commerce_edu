import axios from "axios";

const api = "https://68713eb87ca4d06b34b9d558.mockapi.io/data/";

export const dataProduct = () => axios.get(`${api}/products`);

export const dataProductDetail = (id) => axios.get(`${api}/products/${id}`);


