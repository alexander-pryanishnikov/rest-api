const BASE_API_URL = 'store-example.com/v1';

module.exports.apiGet = async (url) => {
    try {
        const rawResponse = await fetch(`${BASE_API_URL}${url}`);
        return response = await rawResponse.json();
    }
    catch (e) {
        console.error(e);
    }
}

module.exports.apiPost = async (url, body) => {
    let rawResponse = await fetch(`${BASE_API_URL}${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      return response = await rawResponse.json();
}