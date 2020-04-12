fetch('http://localhost:3000/api/books/')
.then(response => response.json())
.then(data => {
  console.log(data)
})
.catch(error => console.error(error))



// getDevices = async () => {
//     const location = window.location.hostname;
//     const settings = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         }
//     };
//     try {
//         const fetchResponse = await fetch(`http://${location}:9000/api/sensors/`, settings);
//         const data = await fetchResponse.json();
//         return data;
//     } catch (e) {
//         return e;
//     }    

// }