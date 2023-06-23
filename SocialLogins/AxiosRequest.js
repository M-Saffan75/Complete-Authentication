import axios from "axios"

export const myAxiosPostRequest = async data => {
    const res = await axios({
        method: "post",
        url: "https://safanapitest.gmgsolutions.io/api/registerhere",
        data: data,
    });
    return res;
}