import fetch from "node-fetch";

/**
 * 
 * @param {*} obj {a:1,b:2}
 * @returns a=1&b=2
 */
function stringify(obj = {}) {
    let a = Object.keys(obj)
        .filter(k => obj[k] || +obj[k] === 0)
        .map(k => {
            let value = obj[k];
            if (typeof value === 'object') {
                value = encodeURIComponent(JSON.stringify(value));
            } else {
                value = encodeURIComponent(value);
            }
            return encodeURIComponent(k) + '=' + value;
        })
        .join('&');
    return a;
}


/**
 * 
 * @param {*} url 
 * @param {*} data body
 * @returns 
 */
const get_request = async (url, data) => {
    return await fetch(`${url}?${stringify(data)}`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            if(data.ret === '404') return false
            return data.data
        })
}

/**
 * 
 * @param {*} url 
 * @param {*} data body
 * @returns 
 */
const post_request = async (url, data) => {
    return await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            return data.data
        })
}

export {
    get_request,
    post_request
}