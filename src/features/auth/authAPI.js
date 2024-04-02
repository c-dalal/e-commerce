export function createUser(userData) {
  //This line creates and returns a new Promise. The promise is resolved asynchronously after some operations are completed.
  return new Promise(async (resolve) => {
    // This section sends a POST request to the specified 
    // URL (http://localhost:8080/users) with the provided userData. 
    // It uses the Fetch API to make an asynchronous HTTP request to the server.

    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });

    //awaits the response from the server and parses it as JSON. It extracts the data returned by the server.
    const data = await response.json();   
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    //This line sends a GET request to the server to fetch user data based on the provided email. 
    //The URL likely includes a query parameter for filtering users by email.
   
    const response = await fetch('http://localhost:8080/users?email=' + email);
    const data = await response.json();
    console.log({data})
    
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: 'wrong credentials' });
      }
    } else {
      reject({ message: 'user not found' });
    }
    // TODO: on server it will only return some info of user (not password)
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}