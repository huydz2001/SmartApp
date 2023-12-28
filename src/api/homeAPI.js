import ApiManagment from "./apiManagment";


export const createHome = async (home, img) => {

    const formData = new FormData();
    formData.append('fileImage', {
        img,
        type: 'image/jpeg', // Thay thế bằng kiểu dữ liệu thích hợp nếu cần
        name: 'image.jpg' // Thay thế bằng tên tệp tin thích hợp nếu cần
    });

    formData.append('jsonData', JSON.stringify(home));

    try {
        const result = await ApiManagment(`/Home/addWithImage`, {
            method: "POST",
            headers: {
                'Content-Type': "multipart/form-data"
            },
            data: formData
        })
        return result
    }
    catch (error) {
        return error
    }
}

export const addMemberApi = async (id, members) => {

    try {
        const result = await ApiManagment(`/Home/${id}/addMember`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            data: members
        })
        return result
    }
    catch (error) {
        return error
    }
}

