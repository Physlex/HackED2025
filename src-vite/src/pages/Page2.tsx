import { Link } from "react-router-dom";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useRef, useEffect, useState, JSX } from "react";

export function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        area-haspopup="true"
        area-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/"> Home</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link to="/page1">Cool Graph </Link>{" "}
        </MenuItem>
      </Menu>
    </div>
  );
}

const vertexSource = `
    attribute vec4 a_position;
    uniform vec2 u_translation;
    
    void main() {
        vec4 transformedPosition = a_position + vec4(u_translation, 0.0, 0.0);
        gl_Position = transformedPosition;
    }
`;

const fragmentSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.31, 0.27, 0.9, 1.0);
    }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createShaderProgram(
  gl: WebGLRenderingContext,
  vertShader: WebGLShader,
  fragShader: WebGLShader,
): WebGLProgram | null {
  const shaderProgram = gl.createProgram();
  if (!shaderProgram) return null;

  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(
      "Shader program linking error:",
      gl.getProgramInfoLog(shaderProgram),
    );
    gl.deleteProgram(shaderProgram);
    return null;
  }

  return shaderProgram;
}

function circleVertices(r: number, points: number): Float32Array {
  const v = [];
  for (let th = 0; th < 2 * Math.PI; th += (2 * Math.PI) / points) {
    const x = r * Math.cos(th);
    const y = r * Math.sin(th);
    v.push(x, y);
  }
  return new Float32Array(v);
}

type CircleCanvasParams = {
  canvasWidth: number;
  canvasHeight: number;
  outlineRadius: number;
  joystickRadius: number;
  points: number;
  lineWidth: number;
  translation: [number, number];
  pressed: boolean;
};
export function CircleCanvas({
  canvasWidth,
  canvasHeight,
  outlineRadius,
  joystickRadius,
  points,
  lineWidth,
  translation,
  pressed
}: CircleCanvasParams): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const shaderProgramRef = useRef<WebGLProgram | null>(null);

  const outlineBufferRef = useRef<WebGLBuffer | null>(null);
  const outlinePositionLocationRef = useRef<GLint | null>(null);

  const joystickBufferRef = useRef<WebGLBuffer | null>(null);
  const joystickPositionLocationRef = useRef<GLint | null>(null);

  const translationLocationRef = useRef<WebGLUniformLocation | null>(null);

  const initWebGL = () => {
    if (glRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true });
    if (!gl) return;
    glRef.current = gl;

    // Compile shaders
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertShader || !fragShader) return;
    const shaderProgram = createShaderProgram(gl, vertShader, fragShader);
    if (!shaderProgram) return;
    shaderProgramRef.current = shaderProgram;

    // Get attribute locations
    outlinePositionLocationRef.current = gl.getAttribLocation(
      shaderProgram,
      "a_position",
    );
    joystickPositionLocationRef.current = gl.getAttribLocation(
      shaderProgram,
      "a_position",
    );
    translationLocationRef.current = gl.getUniformLocation(
      shaderProgram,
      "u_translation",
    );

    // Create buffers
    const outlineBuffer = gl.createBuffer();
    const joystickBuffer = gl.createBuffer();
    outlineBufferRef.current = outlineBuffer;
    joystickBufferRef.current = joystickBuffer;

    // WebGL settings
    gl.enableVertexAttribArray(outlinePositionLocationRef.current);
    gl.enableVertexAttribArray(joystickPositionLocationRef.current);
    gl.useProgram(shaderProgram);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
  };

  const updateOutlineBuffer = (gl: WebGLRenderingContext) => {
    const outlineBuffer = outlineBufferRef.current;
    const outlinePositionLocation = outlinePositionLocationRef.current;
    if (!gl || !outlineBuffer || outlinePositionLocation === null) return;

    const vertices = circleVertices(outlineRadius, points);
    gl.bindBuffer(gl.ARRAY_BUFFER, outlineBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(outlinePositionLocation, 2, gl.FLOAT, false, 0, 0);
  };

  const renderOutline = (gl: WebGLRenderingContext) => {
    if (!gl) return;

    gl.lineWidth(lineWidth);
    gl.uniform2f(translationLocationRef.current, 0.0, 0.0);
    gl.drawArrays(gl.LINE_LOOP, 0, points);
  };

  const updateJoystickBuffer = (gl: WebGLRenderingContext) => {
    const joystickBuffer = joystickBufferRef.current;
    const joystickPositionLocation = joystickPositionLocationRef.current;
    if (!gl || !joystickBuffer || joystickPositionLocation === null) return;

    const vertices = circleVertices(joystickRadius, points);
    gl.bindBuffer(gl.ARRAY_BUFFER, joystickBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(joystickPositionLocation, 2, gl.FLOAT, false, 0, 0);
  };

  const renderJoystick = (gl: WebGLRenderingContext) => {
    if (!gl) return;

    gl.uniform2f(
      translationLocationRef.current,
      translation[0] * outlineRadius,
      translation[1] * outlineRadius,
    );

    if (pressed) {
      gl.drawArrays(gl.TRIANGLE_FAN, 0, points);
    } else {
      gl.lineWidth(lineWidth);
      gl.drawArrays(gl.LINE_STRIP, 0, points);
    }
  };

  useEffect(() => {
    initWebGL();

    const gl = glRef.current;
    if (!gl) return;
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(shaderProgramRef.current);
    updateOutlineBuffer(gl);
    renderOutline(gl);

    updateJoystickBuffer(gl);
    renderJoystick(gl);
  }, [translation, outlineRadius, joystickRadius, points, lineWidth]);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
}

export default function Page2() {
  const [outlineRadius, setOutlineRadius] = useState(0.9);
  const [joystickRadius, setJoystickRadius] = useState(0.1);
  const [points, setPoints] = useState(50);
  const [lineWidth, setLineWidth] = useState(2);
  const [translation, setTranslation] = useState<[number, number]>([0.0, 0.0]);
  const [polarTranslation, setPolarTranslation] = useState<[number, number]>([
    0.0, 0.0,
  ]);

  return (
    <div>
      <CircleCanvas
        canvasWidth={800}
        canvasHeight={800}
        outlineRadius={outlineRadius}
        joystickRadius={joystickRadius}
        points={points}
        lineWidth={lineWidth}
        translation={translation}
        pressed={true}
      />
      <div>
        <label>Outline Radius: {outlineRadius.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="1.0"
          step="0.01"
          value={outlineRadius}
          onChange={(e) => setOutlineRadius(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Joystick Radius: {joystickRadius.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="1.0"
          step="0.01"
          value={joystickRadius}
          onChange={(e) => setJoystickRadius(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Points: {points}</label>
        <input
          type="range"
          min="3"
          max="100"
          step="1"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Line Width: {lineWidth}</label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={lineWidth}
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Radius: {polarTranslation[0].toFixed(2)}</label>
        <input
          type="range"
          min="0.0"
          max={outlineRadius}
          step="0.01"
          value={polarTranslation[0]}
          onChange={(e) => {
            const newRadius = parseFloat(e.target.value);
            const angle = polarTranslation[1];

            setTranslation([
              newRadius * Math.cos(angle),
              newRadius * Math.sin(angle),
            ]);
            setPolarTranslation([newRadius, angle]);
          }}
        />
      </div>
      <div>
        <label>Angle: {polarTranslation[1].toFixed(2)}</label>
        <input
          type="range"
          min={-Math.PI}
          max={Math.PI}
          step="0.01"
          value={polarTranslation[1]}
          onChange={(e) => {
            const radius = polarTranslation[0];
            const newAngle = parseFloat(e.target.value);

            setTranslation([
              radius * Math.cos(newAngle),
              radius * Math.sin(newAngle),
            ]);
            setPolarTranslation([radius, newAngle]);
          }}
        />
      </div>
      );
    </div>
  );
}
