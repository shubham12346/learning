// memoize function

const square = (x) => {
  return x * x;
};

const memoize = (fn) => {
  const cache = {};

  return function (x) {
    if (cache[x]) {
      console.log("Cache hit!");
      return cache[x];
    }
    const result = fn(x);
    cache[x] = result;
    console.log("Cache miss!");
    return result;
  };
};

const memozieSquare = memoize(square);

memozieSquare(5);
memozieSquare(5);

memozieSquare(5);

// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>JS Bin</title>
// </head>
// <body>
//   <ul id='ulEle'>Element </ul>
//   <button onclick="functionLoadRes()" > Load Data</button>

//   <script>

//     let functionLoadRes =async()=>{
//       console.log("fun start ")
//     let result = await fetch('https://dummyjson.com/users');
//     let data =   await result.json();

//     let resultData = await data.users ;
//     console.log("data", resultData[0])

//     let resultLiList =[];

//       resultData.forEach((items)=>{
//       let listEle = document.createElement('li');
//       listEle.innerText = items.lastName;
//        resultLiList.push(listEle)
//       })

//       const ulElement = document.getElementById('ulEle')

//       resultLiList.forEach((itemList)=>ulElement.appendChild(itemList) )

//     }

//   </script>
//   </body>
// </html>
