import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, RoundedBox } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';

const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;

const KW = '#569cd6';
const STR = '#ce9178';
const FN = '#dcdcaa';
const VAR = '#9cdcfe';
const FG = '#d4d4d4';
const CMT = '#6a9955';

const CODE_LINES = [
  [
    { t: 'import', c: KW },
    { t: ' React ', c: FG },
    { t: 'from', c: KW },
    { t: " 'react';", c: STR },
  ],
  [],
  [
    { t: 'function', c: KW },
    { t: ' Laptop', c: FN },
    { t: '() {', c: FG },
  ],
  [
    { t: '  const', c: KW },
    { t: ' [open, setOpen] = ', c: FG },
    { t: 'useState', c: FN },
    { t: '(false);', c: FG },
  ],
  [],
  [
    { t: '  useEffect', c: FN },
    { t: '(() => {', c: FG },
  ],
  [{ t: "    gsap.to(hinge, { x: -1.72 });", c: FG }],
  [{ t: '  }, []);', c: FG }],
  [],
  [
    { t: '  return', c: KW },
    { t: ' (', c: FG },
  ],
  [
    { t: '    <Hero ', c: FG },
    { t: 'title', c: VAR },
    { t: '=', c: FG },
    { t: '"Indudhara"', c: STR },
    { t: ' />', c: FG },
  ],
  [{ t: '  );', c: FG }],
  [{ t: '}', c: FG }],
  [],
  [{ t: '// building clear, intelligent products', c: CMT }],
];

function createScreenTexture() {
  const W = 1024;
  const H = 640;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const mono = "14px 'Consolas', 'Menlo', 'Monaco', monospace";

  // editor background
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, 0, W, H);

  // activity bar
  ctx.fillStyle = '#333333';
  ctx.fillRect(0, 0, 44, H);
  const iconColors = ['#ffffff', '#858585', '#858585', '#858585'];
  iconColors.forEach((c, i) => {
    ctx.fillStyle = i === 0 ? '#ffffff' : c;
    ctx.globalAlpha = i === 0 ? 1 : 0.7;
    ctx.fillRect(15, 20 + i * 46, 16, 16);
  });
  ctx.globalAlpha = 1;
  ctx.fillStyle = KW;
  ctx.fillRect(0, 16, 2, 24);

  // tab bar
  ctx.fillStyle = '#252526';
  ctx.fillRect(44, 0, W - 44, 40);
  const tabs = [
    { name: 'Home.jsx', dot: KW, active: true },
    { name: 'Laptop.jsx', dot: KW, active: false },
    { name: 'App.css', dot: '#a074c4', active: false },
  ];
  let tx = 44;
  const tabW = 148;
  tabs.forEach((tab) => {
    ctx.fillStyle = tab.active ? '#1e1e1e' : '#2d2d2d';
    ctx.fillRect(tx, 0, tabW, 40);
    if (tab.active) {
      ctx.fillStyle = KW;
      ctx.fillRect(tx, 0, tabW, 2);
    }
    ctx.fillStyle = tab.dot;
    ctx.beginPath();
    ctx.arc(tx + 20, 20, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = tab.active ? '#ffffff' : '#8a8a8a';
    ctx.font = mono;
    ctx.textBaseline = 'middle';
    ctx.fillText(tab.name, tx + 32, 21);
    tx += tabW;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.moveTo(tx, 8);
    ctx.lineTo(tx, 32);
    ctx.stroke();
  });

  // code area
  const codeTop = 40;
  const codeBottom = H - 28;
  const gutterX = 44;
  const gutterW = 46;
  const codeX = gutterX + gutterW + 12;
  const lineH = 25;

  ctx.font = mono;
  ctx.textBaseline = 'middle';
  CODE_LINES.forEach((line, i) => {
    const y = codeTop + 22 + i * lineH;
    if (y > codeBottom) return;
    ctx.fillStyle = '#5a5a5a';
    ctx.textAlign = 'right';
    ctx.fillText(String(i + 1), gutterX + gutterW - 8, y);
    ctx.textAlign = 'left';
    let x = codeX;
    line.forEach((seg) => {
      ctx.fillStyle = seg.c;
      ctx.fillText(seg.t, x, y);
      x += ctx.measureText(seg.t).width;
    });
  });

  // minimap
  const mmX = W - 34;
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(mmX, codeTop, 34, codeBottom - codeTop);
  const mmColors = [KW, FG, STR, FG, FN, FG, VAR, CMT];
  for (let i = 0; i < 46; i++) {
    ctx.fillStyle = mmColors[i % mmColors.length];
    ctx.globalAlpha = 0.5;
    const w = 6 + ((i * 7) % 22);
    ctx.fillRect(mmX + 4, codeTop + 6 + i * 6, w, 3);
  }
  ctx.globalAlpha = 1;

  // status bar
  ctx.fillStyle = '#007acc';
  ctx.fillRect(0, H - 28, W, 28);
  ctx.fillStyle = '#ffffff';
  ctx.font = "12px 'Consolas', 'Menlo', 'Monaco', monospace";
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.globalAlpha = 0.95;
  ctx.fillText('⌥ main', 12, H - 14);
  ctx.textAlign = 'right';
  ctx.fillText('JSX  ·  UTF-8  ·  Ln 15', W - 14, H - 14);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function Keyboard() {
  const meshRef = useRef();
  const rows = 5;
  const cols = 14;
  const keyW = 0.155;
  const keyD = 0.135;
  const keyH = 0.02;
  const gapX = 0.025;
  const gapZ = 0.025;
  const count = rows * cols;
  const totalW = cols * (keyW + gapX) - gapX;
  const totalD = rows * (keyD + gapZ) - gapZ;
  const startX = -totalW / 2 + keyW / 2;
  const startZ = -totalD / 2 + keyD / 2;

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jitter = (Math.sin(r * 12.9 + c * 3.7) * 0.5 + 0.5) * 0.003;
        dummy.position.set(
          startX + c * (keyW + gapX),
          0.095 + jitter,
          startZ + r * (keyD + gapZ)
        );
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group position={[0, 0, -0.42]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[keyW, keyH, keyD]} />
        <meshStandardMaterial color="#111214" metalness={0.2} roughness={0.7} />
      </instancedMesh>
      {/* spacebar */}
      <mesh position={[0, 0.095, startZ + rows * (keyD + gapZ) + 0.02]}>
        <boxGeometry args={[keyW * 5.5, keyH, keyD]} />
        <meshStandardMaterial color="#111214" metalness={0.2} roughness={0.7} />
      </mesh>
    </group>
  );
}

function LaptopModel() {
  const groupRef = useRef();
  const hingeRef = useRef();
  const screenTexture = useMemo(() => createScreenTexture(), []);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!hingeRef.current) return;
    gsap.fromTo(
      hingeRef.current.rotation,
      { x: 0.08 },
      { x: -1.72, duration: 1.7, delay: 0.35, ease: 'power3.out' }
    );

    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const baseY = isSmallScreen ? -1.05 : -0.72;
  const baseScale = isSmallScreen ? 0.56 : 0.82;

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetRotY = -0.32 + pointer.current.x * 0.25;
    const targetRotX = 0.08 + pointer.current.y * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.045;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.045;
    groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      position={[isSmallScreen ? 0.75 : 0.5, baseY, 0]}
      rotation={[0.08, -0.32, 0]}
      scale={baseScale}
    >
      {/* base */}
      <RoundedBox args={[3.4, 0.16, 2.3]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#1a1c1e" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.085, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.0, 1.9]} />
        <meshStandardMaterial color="#131416" metalness={0.4} roughness={0.6} />
      </mesh>
      <Keyboard />
      <mesh position={[0, 0.087, 0.78]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.05, 0.65]} />
        <meshStandardMaterial color="#0c0d0e" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* hinge bar */}
      <mesh position={[0, 0.075, -1.14]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 3.25, 16]} />
        <meshStandardMaterial color="#0d0e0f" metalness={0.8} roughness={0.35} />
      </mesh>

      {/* hinge + lid, pivoted at the back edge */}
      <group ref={hingeRef} position={[0, 0.08, -1.14]}>
        <RoundedBox args={[3.4, 0.12, 2.15]} radius={0.025} smoothness={4} position={[0, 0.06, 1.075]}>
          <meshStandardMaterial color="#1a1c1e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, -0.015, 1.075]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.0, 1.85]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
        {/* webcam notch */}
        <mesh position={[0, -0.001, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.014, 16]} />
          <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function Rig() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <pointLight position={[-4, 1, 2]} intensity={0.9} color="#569cd6" />
      <pointLight position={[4, -1, -2]} intensity={0.5} color="#4ec9b0" />
      <LaptopModel />
      <ContactShadows
        position={[isSmallScreen ? 0.75 : 0.5, isSmallScreen ? -1.22 : -0.86, 0]}
        opacity={0.55}
        scale={isSmallScreen ? 4.5 : 7}
        blur={2.4}
        far={2}
        color="#000000"
      />
    </>
  );
}

export default function Laptop() {
  return (
    <Canvas
      dpr={[1, isSmallScreen ? 1.5 : 2]}
      camera={{ position: [0, 0.7, 6.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Rig />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      {!isSmallScreen && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.4} luminanceThreshold={0.55} luminanceSmoothing={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
