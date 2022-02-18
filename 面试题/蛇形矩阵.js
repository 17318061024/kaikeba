let n = 5;
function draw(n) {
  let all = [];
  let row = 0;
  let col = 0;
  let i = 1;
  while (all.length <= n) {
    if (!all[row]) {
      all.push([]);
    }
    all[row][col] = i;
    i++;
    row--;
    col++;
    if (row < 0) {
      col = 0;
      row = all.length;
    }
  }
  all.pop();
  all.forEach((item) => {
    console.log(...item);
  });
}
draw(n);
