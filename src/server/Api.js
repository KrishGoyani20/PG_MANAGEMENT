// Api.js
const BASE_URL = 'https://pg-management-system-api-hq7v.onrender.com'; // change to your backend URL
import axios from 'axios';


// Admin APIs
export const registerAdmin = async (data) => {
    const res = await fetch(`${BASE_URL}/admin/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return res.json();
};


export const loginAdmin = async (data) => {
    // console.log('request data--->>', data);

    try {
        const res = await axios.post(`${BASE_URL}/api/v1/admin/login`, data);
        console.log('API JSON:', res.data);
        return res.data; // axios already parses JSON
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getAdminProfile = async (token) => {
    const res = await fetch(`${BASE_URL}/admin/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};

export const updateAdminDetails = async (token, data) => {
    const res = await fetch(`${BASE_URL}/admin/updatedetails`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updateAdminPassword = async (token, data) => {
    const res = await fetch(`${BASE_URL}/admin/updatepassword`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

// Room APIs

export const getRooms = async (token) => {
    // console.log('getRooms--->68', token);
    try {
        const res = await axios.get(
            `${BASE_URL}/api/v1/rooms`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        // console.log('GetRooms Data--->>>79', res)
        return res.data; // Axios automatically parses JSON
    } catch (error) {
        console.error('getRooms API Error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getRoomById = async (token, id) => {
    const res = await fetch(`${BASE_URL}/rooms/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};

export const createRoom = async (token, data) => {
    // console.log('createRoom => token:', token);
    // console.log('createRoom => data:', data);

    try {
        const res = await axios.post(
            `${BASE_URL}/api/v1/rooms`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Create Room API:', res.data);
        return res.data;
    } catch (error) {
        console.error('Create Room API Error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};





export const updateRoom = async (token, id, data) => {
    const res = await fetch(`${BASE_URL}/rooms/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteRoom = async (token, id) => {
    const res = await fetch(`${BASE_URL}/rooms/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};

// // Tenant APIs
// export const getTenants = async (token) => {
//     const res = await fetch(`${BASE_URL}/tenants`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return res.json();
// };

export const getTenants = async (token) => {
    console.log('Get All Tenants Token-->', token)
    const res = await axios.get(`${BASE_URL}/tenants`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('Get All Tenants -->', res.data)

    return res.data; // axios response mein .data hota hai
};



export const getTenantById = async (token, id) => {
    const res = await fetch(`${BASE_URL}/tenants/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};

export const createTenant = async (token, data) => {
    const res = await fetch(`${BASE_URL}/tenants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updateTenant = async (token, id, data) => {
    const res = await fetch(`${BASE_URL}/tenants/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteTenant = async (token, id) => {
    const res = await fetch(`${BASE_URL}/tenants/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};

// Rent APIs
export const getRents = async (token) => {
    const res = await fetch(`${BASE_URL}/rents`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};

export const getRentById = async (token, id) => {
    const res = await fetch(`${BASE_URL}/rents/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};

export const createRent = async (token, data) => {
    const res = await fetch(`${BASE_URL}/rents`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updateRent = async (token, id, data) => {
    const res = await fetch(`${BASE_URL}/rents/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteRent = async (token, id) => {
    const res = await fetch(`${BASE_URL}/rents/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};
