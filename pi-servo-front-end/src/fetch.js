export const baseUrl = 'http://192.168.10.8:5000/';
export const socketIoBaseUrl = 'http://192.168.10.8:5000/';
export const ARROW_FUNC = {
    STRAIGHT: 'Straight',
    BACK: 'Backward',
    LEFT: 'Left',
    RIGHT: 'Right',
    STOP: 'Stop'
}

export const fetchPostReq = async (apiUrl, dataObj) => {
    apiUrl = `${baseUrl}${apiUrl}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(dataObj),
      cors: "no-cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .catch((err) => {
          console.log(err.message);
      });
    
      return response;
  };