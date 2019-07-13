const Conversion = {

  offset2Cube:(hex) => {
    var x = hex.q - (hex.r - (hex.r&1)) / 2
    var z = hex.r;
    return Units.Cube(x,-x-z,z);
  },

  cube2Offset:(cube) => {
    var q = cube.x + (cube.z - (cube.z&1)) / 2;
    var r = cube.z;
    return Units.Hex(q, r);
  },

  pixel2Cube:(point) => {
    var x = Math.sqrt(3) * point.x / 3 / size.x - point.y / 3 / size.y;
    var z = 2/3 * point.y / size.y;
    return Units.Cube(x, -x-z, z);
  },

  pixel2Offset:(point)=>{
    return Conversion.cube2Offset(Conversion.cubeRound(Conversion.pixel2Cube(point)))
  },

  hex_to_pixel:(hex)=>{
    var x = size.x * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * (hex.r&1));
    var y = size.y * 3/2 * hex.r;
    return Units.Point(x, y);
  },

  pixel_to_axial:(point)=>{
    var q = Math.sqrt(3) * point.x / 3 / size.x - point.y / 3 / size.y;
    var r = (2/3 * point.y) / size.y;
    return Units.Hex(q, r)
  },

  cubeRound:(cube)=> {
    var x = Math.round(cube.x);
    var y = Math.round(cube.y);
    var z = Math.round(cube.z);

    var x_diff = Math.abs(x - cube.x);
    var y_diff = Math.abs(y - cube.y);
    var z_diff = Math.abs(z - cube.z);

    if (x_diff > y_diff && x_diff > z_diff)
      x = -y - z;
    else if (y_diff > z_diff)
      y = -x - z;
    else
      z = -x - y;

    return Units.Cube(x,y,z);
  }
};
