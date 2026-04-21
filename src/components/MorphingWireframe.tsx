import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MorphingWireframe() {
  const mountRef = useRef<HTMLDivElement>(null);

  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Probe WebGL availability — sandboxed iframes / headless browsers may block it.
    const probe = document.createElement("canvas");
    const hasWebGL = !!(
      probe.getContext("webgl2") ||
      probe.getContext("webgl") ||
      probe.getContext("experimental-webgl")
    );
    if (!hasWebGL) {
      if (fallbackRef.current) fallbackRef.current.style.opacity = "1";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 4;

    // Read theme-aware foreground color from CSS so wireframe inverts with theme
    const getThemeColor = () => {
      const cs = getComputedStyle(document.documentElement);
      const c = cs.getPropertyValue("--foreground").trim() || "oklch(0.98 0 0)";
      return new THREE.Color(c);
    };

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, failIfMajorPerformanceCaveat: false });
    } catch (err) {
      console.warn("WebGL unavailable, using CSS fallback", err);
      if (fallbackRef.current) fallbackRef.current.style.opacity = "1";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Build a single sphere geometry; we'll morph vertex positions
    const baseGeometry = new THREE.IcosahedronGeometry(1.4, 4);
    const vertexCount = baseGeometry.attributes.position.count;

    // Generate target shape attribute sets matching vertex count
    const makeShape = (fn: (i: number, total: number) => THREE.Vector3) => {
      const arr = new Float32Array(vertexCount * 3);
      for (let i = 0; i < vertexCount; i++) {
        const v = fn(i, vertexCount);
        arr[i * 3] = v.x;
        arr[i * 3 + 1] = v.y;
        arr[i * 3 + 2] = v.z;
      }
      return arr;
    };

    const sphereTarget = baseGeometry.attributes.position.array.slice() as Float32Array;

    const cubeTarget = makeShape((i) => {
      const v = new THREE.Vector3(
        baseGeometry.attributes.position.getX(i),
        baseGeometry.attributes.position.getY(i),
        baseGeometry.attributes.position.getZ(i),
      ).normalize();
      // project sphere point onto cube of half-size 1.4
      const m = Math.max(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
      return v.multiplyScalar(1.4 / m);
    });

    const torusTarget = makeShape((i, total) => {
      const u = (i / total) * Math.PI * 2 * 6;
      const w = (i / total) * Math.PI * 2;
      const R = 1.2;
      const r = 0.45;
      return new THREE.Vector3(
        (R + r * Math.cos(w)) * Math.cos(u),
        (R + r * Math.cos(w)) * Math.sin(u),
        r * Math.sin(w),
      );
    });

    const helixTarget = makeShape((i, total) => {
      const t = (i / total) * Math.PI * 2 * 8;
      const y = (i / total - 0.5) * 3;
      return new THREE.Vector3(Math.cos(t) * 1.2, y, Math.sin(t) * 1.2);
    });

    const targets: Float32Array[] = [sphereTarget, cubeTarget, torusTarget, helixTarget];
    const morph = { value: 0 };

    const positionAttr = baseGeometry.attributes.position as THREE.BufferAttribute;

    // Wireframe material via edges
    const edges = new THREE.EdgesGeometry(baseGeometry, 1);
    const lineMat = new THREE.LineBasicMaterial({
      color: getThemeColor(),
      transparent: true,
      opacity: 0.55,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    scene.add(wireframe);

    // Inner soft point cloud
    const pointsMat = new THREE.PointsMaterial({
      color: getThemeColor(),
      size: 0.012,
      transparent: true,
      opacity: 0.7,
    });
    const points = new THREE.Points(baseGeometry, pointsMat);
    scene.add(points);

    const updateGeometry = (m: number) => {
      const segments = targets.length - 1;
      const seg = Math.min(Math.floor(m * segments), segments - 1);
      const localT = m * segments - seg;
      const a = targets[seg];
      const b = targets[seg + 1];
      const arr = positionAttr.array as Float32Array;
      for (let i = 0; i < arr.length; i++) {
        arr[i] = a[i] * (1 - localT) + b[i] * localT;
      }
      positionAttr.needsUpdate = true;
      // Rebuild edges (cheap enough at this resolution? swap geometry)
      const newEdges = new THREE.EdgesGeometry(baseGeometry, 1);
      wireframe.geometry.dispose();
      wireframe.geometry = newEdges;
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        morph.value = self.progress;
        updateGeometry(self.progress);
      },
    });

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      wireframe.rotation.y += dt * 0.15;
      wireframe.rotation.x += dt * 0.05;
      points.rotation.copy(wireframe.rotation);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // React to theme class changes on <html>
    const themeObserver = new MutationObserver(() => {
      const c = getThemeColor();
      lineMat.color.copy(c);
      pointsMat.color.copy(c);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();
      scrollTrigger.kill();
      renderer.dispose();
      baseGeometry.dispose();
      edges.dispose();
      lineMat.dispose();
      pointsMat.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        className="pointer-events-none fixed inset-0 z-10"
        aria-hidden="true"
      />
      <div
        ref={fallbackRef}
        className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-1000"
        aria-hidden="true"
      >
        <div className="relative h-[55vmin] w-[55vmin]">
          <div className="absolute inset-0 rounded-full border border-foreground/20 animate-[spin_28s_linear_infinite]" />
          <div className="absolute inset-[8%] rounded-full border border-foreground/15 animate-[spin_18s_linear_infinite_reverse]" />
          <div className="absolute inset-[18%] rounded-full border border-foreground/10 animate-[spin_38s_linear_infinite]" />
          <div className="absolute inset-[30%] rounded-full border border-dashed border-foreground/20 animate-[spin_22s_linear_infinite_reverse]" />
          <div className="absolute inset-[42%] rounded-full bg-foreground/5 backdrop-blur-sm" />
        </div>
      </div>
    </>
  );
}
