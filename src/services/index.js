import { BASE_URL, ACCESS_TOKEN } from '../constants';
export const getRequest = (url, response) => {
    // const token = localStorage.getItem(ACCESS_TOKEN);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiYWRtaW4iXSwic3RhdHVzIjoiYWN0aXZlIiwiZXhwIjoxNjg0ODUyNzUwfQ.SWN-v16y9Mz3vPX0w4PcEchjGQhnSeCWDjOyTqN3yFI';
    const headers = { 'Authorization': token ? `Bearer ${token}` : undefined };
    fetch(`${BASE_URL}${url}`, { headers })
        .then(response => response.json())
        .then(data => {
            response(data);
        });
}

export const postRequest = (url, payload, response) => {
    // const token = localStorage.getItem(ACCESS_TOKEN);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiYWRtaW4iXSwic3RhdHVzIjoiYWN0aXZlIiwiZXhwIjoxNjg0ODUyNzUwfQ.SWN-v16y9Mz3vPX0w4PcEchjGQhnSeCWDjOyTqN3yFI';
    fetch(`${BASE_URL}${url}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then((data) => {
            response(data);
        })
        .catch((err) => {
            console.log("check err: ", err)
        })
}

export const putRequest = (url, payload, response) => {
    // const token = localStorage.getItem(ACCESS_TOKEN);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiYWRtaW4iXSwic3RhdHVzIjoiYWN0aXZlIiwiZXhwIjoxNjg0ODUyNzUwfQ.SWN-v16y9Mz3vPX0w4PcEchjGQhnSeCWDjOyTqN3yFI';
    fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then((data) => {
            response(data);
        })
        .catch((err) => {
            console.log("check err: ", err)
        })
}