
import ApiManagment from "./apiManagment";

export const user_login = async (data) => {
    try {
        const result = await ApiManagment("/User/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            data: data
        })
        return result
    }
    catch (error) {
        return error
    }
}

export const getUserByPhone= async (phone) => {
    try {
        const result = await ApiManagment(`/User/${phone}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            data: phone
        })
        return result
    }
    catch (error) {
        return error
    }
}

export const getUsers= async () => {
    try {
        const result = await ApiManagment(`/User`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })
        return result
    }
    catch (error) {
        return error
    }
}

export const getUserById = async (id) => {
    try {
        const result = await ApiManagment(`/User/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        })
        return result
    }
    catch (error) {
        return error
    }
}

export const saveImage = async (uri, id) => {
    const formData = new FormData();
    formData.append('fileImage', {
        uri,
        type: 'image/jpeg', // Thay thế bằng kiểu dữ liệu thích hợp nếu cần
        name: 'image.jpg' // Thay thế bằng tên tệp tin thích hợp nếu cần
    });

    try {
        const result = await ApiManagment(`/User/${id}/uploadImage`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        return result
    }
    catch (error) {
        console.log(error)
    }

}

export const getHomeByUserId = async (id) => {
    try {
        const result = await ApiManagment(`/User/${id}/getHome`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        })
        return result
    }
    catch (error) {
        return error
    }
}