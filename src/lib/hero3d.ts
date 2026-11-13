// Three.js scene for the home hero. Imported lazily so other pages never load it.
import {
  AmbientLight,
  Timer,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  SRGBColorSpace,
  Scene,
  Shape,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export type Stop = () => void;

export async function start(root: HTMLElement): Promise<Stop | null> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const canvas = root.querySelector('canvas')!;
  const probe = document.createElement('canvas');
  if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return null;

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 7.2);

  // Pointy-top hexagon matching the badge shape (badge art is 166x192 px).
  const R = 1.62;
  const shape = new Shape();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 3;
    const p = [Math.cos(a) * R, Math.sin(a) * R] as const;
    if (i === 0) shape.moveTo(...p); else shape.lineTo(...p);
  }
  shape.closePath();
  const depth = 0.22;
  const slab = new ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 3 });
  slab.translate(0, 0, -depth / 2);

  const group = new Group();
  // Reflections make the gold read as metal instead of flat brown.
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  // ExtrudeGeometry groups: 0 = front and back caps, 1 = sides and bevel.
  const capMat = new MeshStandardMaterial({ color: 0x161d26, metalness: 0.5, roughness: 0.4 });
  const goldMat = new MeshStandardMaterial({ color: 0xd9a93a, metalness: 1, roughness: 0.22 });
  group.add(new Mesh(slab, [capMat, goldMat]));
  const rim = new LineSegments(new EdgesGeometry(slab, 30), new LineBasicMaterial({ color: 0xf5cf6a }));
  group.add(rim);

  const urls: string[] = JSON.parse(root.dataset.badges!);
  const loader = new TextureLoader();
  const textures = await Promise.all(
    urls.map((u) => loader.loadAsync(u).then((t) => { t.colorSpace = SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t; })),
  );
  const faceGeo = new PlaneGeometry(R * 2 * 0.866 * 0.96, R * 2 * 0.96);
  const faceMat = new MeshBasicMaterial({ map: textures[0], transparent: true });
  const front = new Mesh(faceGeo, faceMat);
  front.position.z = depth / 2 + 0.065;
  const back = new Mesh(faceGeo, faceMat);
  back.position.z = -depth / 2 - 0.065;
  back.rotation.y = Math.PI;
  group.add(front, back);
  scene.add(group);

  scene.add(new AmbientLight(0xffffff, 0.55));
  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(3, 4, 5);
  scene.add(key);
  const glow = new PointLight(0xad5cff, 18, 12);
  glow.position.set(-3, -2, 3);
  scene.add(glow);

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const pointer = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  let index = 0;
  let lastHalfTurn = 0;
  let raf = 0;
  let visible = true;
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  io.observe(root);
  const timer = new Timer();
  const loop = (now?: number) => {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    timer.update(now);
    const t = timer.getElapsed();
    const spin = t * 0.55;
    // Swap to the next badge each half turn, while the slab is edge-on.
    const halfTurn = Math.floor((spin + Math.PI / 2) / Math.PI);
    if (halfTurn !== lastHalfTurn) {
      lastHalfTurn = halfTurn;
      index = (index + 1) % textures.length;
      faceMat.map = textures[index];
      faceMat.needsUpdate = true;
    }
    group.rotation.y = spin;
    group.rotation.x = Math.sin(t * 0.7) * 0.08 + pointer.y * 0.18;
    group.rotation.z = pointer.x * -0.08;
    group.position.y = Math.sin(t * 1.1) * 0.08;
    renderer.render(scene, camera);
  };
  loop();
  root.classList.add('live');

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onMove);
    textures.forEach((t) => t.dispose());
    slab.dispose();
    capMat.dispose();
    goldMat.dispose();
    env.dispose();
    pmrem.dispose();
    faceGeo.dispose();
    renderer.dispose();
  };
}
