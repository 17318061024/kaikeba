let str = "$bo*y gi!r#l";
function run(str) {
  str = str.replace(/[^a-zA-Z]/g, " ");
  let result = str.split(" ").reverse().join(" ");
  console.log(result);
}
run(str);
