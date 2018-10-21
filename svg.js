/* jshint node: true, esversion: 6 */

function triangle(points, color) {
  const data = `M ${points.x1} ${points.y1} L ${points.x2} ${points.y2} L ${points.x3} ${points.y3}`;
  return `<path d="${data}" fill="rgb(${color.r},${color.g},${color.b})" fill-opacity="${color.a / 255}" />`;
}

function header(width, height) {
  const id = Math.random().toString(36).slice(2);

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" version="1.1">\n` +
         `<defs><clipPath id="${id}"><rect x="0" y="0" width="${width}" height="${height}" /></clipPath></defs>\n` +
         `<g clip-path="url(#${id})">\n`;
}

function footer() {
  return `</g>\n</svg>`;
}

function serializer(output) {
  let svg = header(output.sw, output.sh) + '\n';

  svg += output.shapes.map((points, idx) => {
    return triangle(points, output.colors[idx]);
  }).join('\n') + '\n';

  svg += footer();

  return svg;
}

module.exports = serializer;
