function add(a, b, callback) {
  let sum = a + b;
  callback(sum);
}

function display(result) {
  console.log("Result:", result);
}

add(5, 3, display);