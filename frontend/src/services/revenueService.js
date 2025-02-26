import axios from "axios";

export const getRevenue = async (filterType) => {
    const response = await axios.get(`http://localhost:3000/api/revenue?filterType=${filterType}`);
    return response.data;
};
