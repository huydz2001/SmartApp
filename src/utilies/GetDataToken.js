import { decode } from "base-64";
global.atob = decode;
import { jwtDecode } from "jwt-decode";

const getDataToken = async (token, user, setUser) => {
    const decodedToken = jwtDecode(token);
  
    const updatedUser = {
      ...user,
      userId: decodedToken.UserId,
      name: decodedToken.unique_name,
      image: decodedToken.Image,
    };
  
    setUser(updatedUser);
  };


export default getDataToken