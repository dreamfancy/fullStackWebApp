const myPromise = () => (new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Resolved!!!');
    }, 1);
  }));

const testAsync = async () => {
    console.log("async inside 1");
    const returnedValue = await myPromise();
    console.log("async inside 2");
    console.log(returnedValue);

}

module.exports = testAsync;