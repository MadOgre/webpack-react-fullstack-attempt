console.log("test passed");

async function test() {
  await new Promise(function(resolve){
    setTimeout(function(){
      console.log("3 seconds, passed");
      resolve();
    },3000);
  });
}

test().then(function(){
  console.log("await function done");
});

let obj = {
  a: 34,
  b: 77
};

let obj2 = {
  ...obj,
  b: 999
};

console.log(obj2);

class TestClass {
  a = 23;
  b = () => console.log("b function called");
}

var inst = new TestClass();

console.log(inst.a);
inst.b();

