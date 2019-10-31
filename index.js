var moving, xAdd, yAdd, zAdd;
moving = [0.0, 0.0, 0.0];
xAdd = 0.02;
yAdd = 0.003;
zAdd = 0.004;

(function(global) {

  var canvas, gl, program, program2;
  // var linesVertices, triangleVertices;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // Get canvas element and check if WebGL enabled
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);
    
    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    
    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);

    function kubus(){
      gl.useProgram(program2);
      var kubusVertices = [
        -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,  // depan, merah, BAD BDC
        -0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
        0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
        -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
         0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
         0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
         -0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
         0.5, -0.5,  0.5,     1.0, 0.0, 0.0,

         0.5,  0.5,  0.5,     0.0, 0.0, 1.0,  // kanan, biru, CDH CHG
         0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
         0.5,  0.5, -0.5,     0.0, 0.0, 1.0,
         0.5,  0.5,  0.5,     0.0, 0.0, 1.0,
         0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
         0.5,  0.5, -0.5,     0.0, 0.0, 1.0,
         0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
         0.5, -0.5, -0.5,     0.0, 0.0, 1.0,

         0.5, -0.5,  0.5,     0.0, 0.0, 1.0,  // bawah, biru, DAE DEH
        -0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
        0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
         0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
        -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
         0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
         -0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
         -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,

        -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,  // belakang, kuning, EFG EGH
        -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
        0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
        -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
         0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
         0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
         -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
         0.5,  0.5, -0.5,     1.0, 1.0, 0.0,

        -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,  // kiri, kuning, FEA FAB
        -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
        -0.5,  0.5,  0.5,     1.0, 1.0, 0.0,
        -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
        -0.5, -0.5,  0.5,     1.0, 1.0, 0.0,
        -0.5,  0.5,  0.5,     1.0, 1.0, 0.0,
        -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
        -0.5, -0.5,  0.5,     1.0, 1.0, 0.0,

         0.5,  0.5, -0.5,     1.0, 0.0, 1.0,  // atas, magenta, GFB GBC
        -0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
        0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
         0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
        -0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
         0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
         -0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
         -0.5,  0.5,  0.5,     1.0, 0.0, 1.0
      ];

      var kubusVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, kubusVBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(kubusVertices),gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
      gl.vertexAttribPointer(
        vPosition,
        3,
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(vColor,3,gl.FLOAT,gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      // modelview and projection
      var vmLoc = gl.getUniformLocation(program2,'modelview');
      var pmLoc = gl.getUniformLocation(program2,'projection');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, 0.0),  //posisi kamera
        glMatrix.vec3.fromValues(0.0, 0.0, -2.0), //titik lihat
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0),  //arah atas kamera
        );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.5;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
        fovy,
        aspect,
        near,
        far
        );
      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);
    }

    function triangle(){
      gl.useProgram(program);
      
      var triangleVertices = new Float32Array([
        0.15, -0.5, 0.0, 1.0, 1.0, 0.0, //M
        0.1, -0.5, 0.0, 0.7, 0.0, 1.0, //L
        0.35, 0.3, 0.0, 0.1, 1.0, 0.6, // K
        0.3, 0.4, 0.0, 1.0, 1.0, 0.0, // A
        0.35, 0.3, 0.0, 0.7, 0.0, 1.0, // K
        0.4, 0.3, 0.0, 0.1, 1.0, 0.6, // C
        0.3, 0.4, 0.0, 1.0, 1.0, 0.0, // A
        0.5, 0.4, 0.0, 1.0, 1.0, 0.0, // B
        0.3, 0.4, 0.0, 0.7, 0.0, 1.0, // A
        0.4, 0.3, 0.0, 0.1, 1.0, 0.6, // C
        0.4, -0.05, 0.0, 1.0, 1.0, 0.0, // J
        0.4, 0.3, 0.0, 0.7, 0.0, 1.0, // C
        0.455, -0.05, 0.0, 0.1, 1.0, 0.6, // D
        0.4, -0.05, 0.0, 1.0, 1.0, 0.0, // J
        0.3, -0.05, 0.0, 0.7, 0.0, 1.0, // i
        0.27, -0.15, 0.0,  0.1, 1.0, 0.6, // H
        0.4, -0.05, 0.0, 1.0, 1.0, 0.0, // J
        0.42, -0.15, 0.0, 0.7, 0.0, 1.0,// g
        0.455, -0.05, 0.0, 0.1, 1.0, 0.6, // D
        0.45, -0.35, 0.0, 1.0, 1.0, 0.0, // F
        0.5, -0.35, 0.0, 0.7, 0.0, 1.0 // E
      ]);

      var triangleVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices),gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
      gl.vertexAttribPointer(
        vPosition,
        2,
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
      );

      var move = gl.getUniformLocation(program, 'bounce');
      if (moving[0]+(-0.45) < (-0.5*1.5) || moving[0]+(-0.05) > (0.5*1.5)) {
        xAdd *= -1;
      }

      moving[0]+=xAdd;

      var middle_point = -0.3 + moving[0];
      var tengah = gl.getUniformLocation(program,'center');

      gl.uniform1f(tengah, middle_point);
      if (moving[1]+(-0.5)<(-0.5*1.5) || moving[1]+0.6>(0.5*1.5)) {
        yAdd *= -1;
      }

      moving[1]+=yAdd;

      if (moving[2]<(-0.5*1.5) || moving[2]>(0.5*1.5)) {
        zAdd *= -1;
      }

      moving[2]+=zAdd;

      gl.uniform3fv(move,moving);

      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1;
      scale = scale + (membesar * 0.0119);
      gl.uniform1f(scaleLoc,scale);

      // modelview and projection
      var vmLoc = gl.getUniformLocation(program,'modelview');
      var pmLoc = gl.getUniformLocation(program,'projection');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, 0.0),  //posisi kamera
        glMatrix.vec3.fromValues(0.0, 0.0, -2.0), //titik lihat
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0),  //arah atas kamera
        );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.5;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
        fovy,
        aspect,
        near,
        far
        );
      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);
    }

    var sudutLoc = gl.getUniformLocation(program, 'theta');
    var sudutLoc2 = gl.getUniformLocation(program2, 'theta');
    var sudut = 0;
    var scaleLoc = gl.getUniformLocation(program, 'scale');
    var scaleLoc2 = gl.getUniformLocation(program2, 'scale');
    var scale = 1;
    var membesar = 1;

    function render() {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      kubus();
      gl.drawArrays(gl.LINES, 0, 48);
      triangle();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 20);
      requestAnimationFrame(render);
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    // resizer();
    render();
  }


})(window || this);
