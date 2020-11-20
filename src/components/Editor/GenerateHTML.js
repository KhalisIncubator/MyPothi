/**
 *  @param {string} html the inner html shabad
 * 
 */
export default ( html ) => {
  return `
<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
</head>
<script>
  const toggle = (tag, value) => {
    document.querySelectorAll(tag).forEach(node => 
      if (value) {
      node.style.display = "block";
    } else {
      node.style.display = "none";
    }
  }
</script>
<body>
  ${html}  
</body>
</html>
  `
}