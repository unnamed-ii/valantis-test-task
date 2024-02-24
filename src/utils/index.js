import md5 from "crypto-js/md5";

export const generateXAuthHeader = () => {
    const timestamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    return md5(`${process.env.REACT_APP_API_KEY}_${timestamp}`).toString();
}