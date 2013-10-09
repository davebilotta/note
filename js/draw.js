function addClick(x, y, dragging)
{
  note.clickX.push(x);
  note.clickY.push(y);
  note.clickDrag.push(dragging);
  note.clickColor.push(fgColor);
  note.clickWidth.push(lineWidth);
}