export type RendererOptions = {
  canvas: HTMLCanvasElement;
};

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);

  // Slight perspective squash so the disk reads as a tilted ring.
  vec2 disk = vec2(uv.x, uv.y / 0.42);
  float r = length(disk);
  float rr = length(uv);
  float angle = atan(disk.y, disk.x);

  // Swirling accretion material.
  float swirl = angle + uTime * 0.55 - 2.4 / max(r, 0.12);
  float turbulence = fbm(vec2(swirl * 1.6, r * 6.0 - uTime * 0.35));
  float band = smoothstep(0.30, 0.44, r) * (1.0 - smoothstep(0.85, 1.45, r));
  float density = band * (0.35 + 0.9 * turbulence);

  vec3 hot = vec3(1.0, 0.86, 0.62);
  vec3 mid = vec3(1.0, 0.52, 0.16);
  vec3 cool = vec3(0.55, 0.16, 0.38);
  vec3 diskColor = mix(hot, mid, smoothstep(0.3, 0.8, r));
  diskColor = mix(diskColor, cool, smoothstep(0.8, 1.4, r));

  // Relativistic beaming: one side brighter.
  float beam = 0.55 + 0.75 * smoothstep(-1.0, 1.0, cos(angle));
  vec3 color = diskColor * density * beam * 2.1;

  // Photon ring halo around the event horizon.
  float ring = exp(-pow(abs(rr - 0.235) * 42.0, 2.0));
  color += vec3(1.0, 0.82, 0.58) * ring * 1.6;

  // Lensed glow.
  color += vec3(0.9, 0.45, 0.25) * exp(-rr * 4.2) * 0.18;

  // Event horizon.
  float horizon = smoothstep(0.215, 0.195, rr);
  color *= (1.0 - horizon);

  // Starfield outside the shadow.
  float stars = pow(hash(floor(gl_FragCoord.xy * 0.55)), 220.0);
  color += vec3(stars) * (1.0 - horizon) * smoothstep(0.25, 0.7, rr) * 0.9;

  // Vignette.
  color *= 1.0 - 0.35 * smoothstep(0.6, 1.4, rr);

  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${log}`);
  }
  return shader;
}

export function createRenderer({ canvas }: RendererOptions) {
  let frame = 0;
  let disposed = false;

  const gl = canvas.getContext("webgl", {
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });

  const ready = new Promise<void>((resolve, reject) => {
    if (!gl) {
      reject(new Error("WebGL is not available"));
      return;
    }
    resolve();
  });
  ready.catch(() => {});

  if (!gl) {
    return { ready, dispose: () => {} };
  }

  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uResolution = gl.getUniformLocation(program, "uResolution");
  const uTime = gl.getUniformLocation(program, "uTime");

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  window.addEventListener("resize", resize);
  resize();

  const start = performance.now();
  const loop = () => {
    if (disposed) return;
    resize();
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, (performance.now() - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  const dispose = () => {
    disposed = true;
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };

  return { ready, dispose };
}
