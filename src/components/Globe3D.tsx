/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  label?: string;
  type: 'land' | 'pin' | 'star' | 'cloud';
}

interface TravelRoute {
  from: { lat: number; lng: number; label: string };
  to: { lat: number; lng: number; label: string };
  progress: number;
  speed: number;
  color: string;
}

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Globe rotation angles
  const angleY = useRef(0);
  const angleX = useRef(-0.1); // Slightly tilted forward
  const [activePin, setActivePin] = useState<string | null>('Tokyo');

  // Interactive mouse dragging variables
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0.005, y: 0 }); // Slow automatic spin initially

  // Generate coordinates for lands procedurally (simulating continents on a sphere of radius 140)
  // We use lat-lng to spherical conversion:
  // x = R * cos(lat) * sin(lng)
  // y = R * sin(lat)
  // z = R * cos(lat) * cos(lng)
  const sphereRadius = 130;

  const points3D = useMemo<Point3D[]>(() => {
    const list: Point3D[] = [];

    // 1. Procedural Continents (approximate world map density clusters)
    const continents = [
      { lat: 35, lng: 135, rLat: 15, rLng: 25, label: 'Asia' }, // Asia
      { lat: 48, lng: 15, rLat: 10, rLng: 20, label: 'Europe' }, // Europe
      { lat: -25, lng: 133, rLat: 18, rLng: 15, label: 'Australia' }, // Australia
      { lat: 38, lng: -97, rLat: 15, rLng: 25, label: 'North America' }, // North America
      { lat: -14, lng: -55, rLat: 18, rLng: 12, label: 'South America' }, // South America
      { lat: 5, lng: 20, rLat: 18, rLng: 15, label: 'Africa' }, // Africa
    ];

    continents.forEach((cont) => {
      // Create clumps of points for the landmass
      const density = 60;
      for (let i = 0; i < density; i++) {
        // distribute within a box with some Gaussian-like falloff
        const lat = cont.lat + (Math.random() - 0.5) * cont.rLat * 2 * (0.3 + Math.random() * 0.7);
        const lng = cont.lng + (Math.random() - 0.5) * cont.rLng * 2 * (0.3 + Math.random() * 0.7);

        // Convert to 3D Cartesian coordinates
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        const x = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const y = sphereRadius * Math.cos(phi);
        const z = sphereRadius * Math.sin(phi) * Math.cos(theta);

        list.push({ x, y, z, type: 'land' });
      }
    });

    // Add random archipelago islands
    for (let i = 0; i < 80; i++) {
      const lat = (Math.random() - 0.5) * 140; // Avoid polar tops
      const lng = (Math.random() - 0.5) * 360;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const y = sphereRadius * Math.cos(phi);
      const z = sphereRadius * Math.sin(phi) * Math.cos(theta);
      list.push({ x, y, z, type: 'land' });
    }

    // 2. Interactive Location Pins (Key destinations we represent)
    const pins = [
      { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
      { lat: 48.8566, lng: 2.3522, label: 'Paris' },
      { lat: -8.4095, lng: 115.1889, label: 'Bali' },
      { lat: 41.9028, lng: 12.4964, label: 'Rome' },
      { lat: 46.8182, lng: 8.2275, label: 'Swiss Alps' },
      { lat: -33.8688, lng: 151.2093, label: 'Sydney' },
      { lat: -1.8211, lng: 34.6853, label: 'Serengeti' },
      { lat: -22.9068, lng: -43.1729, label: 'Rio' },
      { lat: 40.7128, lng: -74.0060, label: 'New York' },
    ];

    pins.forEach((pin) => {
      const phi = (90 - pin.lat) * (Math.PI / 180);
      const theta = (pin.lng + 180) * (Math.PI / 180);

      const x = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const y = sphereRadius * Math.cos(phi);
      const z = sphereRadius * Math.sin(phi) * Math.cos(theta);

      list.push({ x, y, z, label: pin.label, type: 'pin' });
    });

    // 3. Clouds (Higher altitude + 12)
    for (let i = 0; i < 15; i++) {
      const lat = (Math.random() - 0.5) * 100;
      const lng = (Math.random() - 0.5) * 360;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const x = (sphereRadius + 14) * Math.sin(phi) * Math.sin(theta);
      const y = (sphereRadius + 14) * Math.cos(phi);
      const z = (sphereRadius + 14) * Math.sin(phi) * Math.cos(theta);

      list.push({ x, y, z, type: 'cloud' });
    }

    return list;
  }, []);

  // Background stars for depth
  const stars = useMemo(() => {
    const starList = [];
    for (let i = 0; i < 60; i++) {
      starList.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }
    return starList;
  }, []);

  // Set-up travel flight routes with active looping indicators
  const routes = useRef<TravelRoute[]>([
    { from: { lat: 35.67, lng: 139.65, label: 'Tokyo' }, to: { lat: 48.85, lng: 2.35, label: 'Paris' }, progress: 0.1, speed: 0.008, color: '#3B82F6' },
    { from: { lat: 48.85, lng: 2.35, label: 'Paris' }, to: { lat: 40.71, lng: -74.0, label: 'New York' }, progress: 0.4, speed: 0.006, color: '#10B981' },
    { from: { lat: 40.71, lng: -74.0, label: 'New York' }, to: { lat: -22.9, lng: -43.17, label: 'Rio' }, progress: 0.7, speed: 0.009, color: '#FBBF24' },
    { from: { lat: -22.9, lng: -43.17, label: 'Rio' }, to: { lat: -1.82, lng: 34.68, label: 'Serengeti' }, progress: 0.2, speed: 0.005, color: '#3B82F6' },
    { from: { lat: -8.40, lng: 115.18, label: 'Bali' }, to: { lat: -33.86, lng: 151.2, label: 'Sydney' }, progress: 0.5, speed: 0.012, color: '#10B981' },
  ]);

  // Airplane orbital parameters
  const airplaneAngle = useRef(0);

  // Mouse Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    rotationVelocity.current = { x: 0, y: 0 }; // stop autodesign on grab
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    angleY.current = angleY.current + deltaX * 0.007;
    angleX.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, angleX.current + deltaY * 0.007));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    rotationVelocity.current = { x: deltaX * 0.0005, y: deltaY * 0.0005 };
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Convert lat/lng on rotating globe to screen X/Y to handle pin clicks
  const detectPinHighlight = (clickX: number, clickY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const scale = Math.min(rect.width, rect.height) / 400;

    // Filter points to pins and project them
    const p3 = points3D.filter((p) => p.type === 'pin');
    let closestPin: string | null = null;
    let minDist = 25; // Click radius target threshold

    p3.forEach((p) => {
      // Apply 3D Y-rotation
      let x1 = p.x * Math.cos(angleY.current) - p.z * Math.sin(angleY.current);
      let z1 = p.x * Math.sin(angleY.current) + p.z * Math.cos(angleY.current);

      // Apply X-rotation (tilt)
      let y2 = p.y * Math.cos(angleX.current) - z1 * Math.sin(angleX.current);
      let z2 = p.y * Math.sin(angleX.current) + z1 * Math.cos(angleX.current);

      // Render only front of globe (positive depth index)
      if (z2 > 0) {
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;
        const xDiff = clickX - (rect.left + screenX);
        const yDiff = clickY - (rect.top + screenY);
        const dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        if (dist < minDist) {
          minDist = dist;
          closestPin = p.label || null;
        }
      }
    });

    if (closestPin) {
      setActivePin(closestPin);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    detectPinHighlight(e.clientX, e.clientY);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw Starfield Background behind globe
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(cx + star.x, cy + star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Slowly dissipate velocity or rotate passively
      if (!isDragging.current) {
        // Slow return of standard spin velocity
        const targetSpinY = 0.002;
        rotationVelocity.current.x += (targetSpinY - rotationVelocity.current.x) * 0.05;
        // Keep tilt stabilized
        rotationVelocity.current.y += (0 - rotationVelocity.current.y) * 0.05;

        angleY.current = angleY.current + rotationVelocity.current.x;
        angleX.current = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, angleX.current + rotationVelocity.current.y));
      }

      // 1. Globe Ambient Shadow Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, sphereRadius - 10, cx, cy, sphereRadius + 30);
      glowGrad.addColorStop(0, 'rgba(10, 37, 64, 0.4)');
      glowGrad.addColorStop(0.6, 'rgba(59, 130, 246, 0.15)');
      glowGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius + 30, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Circle Backdrop
      ctx.fillStyle = '#0B1120'; // Matching our slate background
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Base globe shading
      const shadowGrad = ctx.createRadialGradient(cx - sphereRadius/3, cy - sphereRadius/3, 10, cx, cy, sphereRadius);
      shadowGrad.addColorStop(0, 'rgba(13, 148, 136, 0.08)'); // subtle ocean teal
      shadowGrad.addColorStop(0.5, 'rgba(10, 37, 64, 0.3)');
      shadowGrad.addColorStop(1, 'rgba(3, 7, 18, 0.95)'); // dark border depth
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Ring
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Project & sort land points
      // We process points drawing landmass (particles)
      points3D.forEach((p) => {
        // Apply 3D Y-rotation
        let x1 = p.x * Math.cos(angleY.current) - p.z * Math.sin(angleY.current);
        let z1 = p.x * Math.sin(angleY.current) + p.z * Math.cos(angleY.current);

        // Apply X-rotation (tilt)
        let y2 = p.y * Math.cos(angleX.current) - z1 * Math.sin(angleX.current);
        let z2 = p.y * Math.sin(angleX.current) + z1 * Math.cos(angleX.current);

        // Clip things behind the coordinates
        if (z2 > -10) {
          const depthMultiplier = (z2 + sphereRadius) / (sphereRadius * 2); // 0 (back) to 1 (front)
          
          if (p.type === 'land') {
            // Draw land dot
            const size = Math.max(1, 3 * depthMultiplier);
            const opacity = Math.max(0.1, 0.85 * depthMultiplier);
            ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`; // emerald green
            ctx.beginPath();
            ctx.arc(cx + x1, cy + y2, size, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === 'pin') {
            // Draw dynamic interactive Pin
            const opacity = Math.max(0.1, 1.0 * depthMultiplier);
            const isTarget = activePin === p.label;
            
            // Draw glow circle
            ctx.strokeStyle = isTarget ? `rgba(251, 191, 36, ${opacity})` : `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = isTarget ? 3 : 1;
            ctx.beginPath();
            ctx.arc(cx + x1, cy + y2, isTarget ? 8 + Math.sin(Date.now() / 150) * 2 : 5, 0, Math.PI * 2);
            ctx.stroke();

            // Core dot
            ctx.fillStyle = isTarget ? '#FBBF24' : '#3B82F6';
            ctx.beginPath();
            ctx.arc(cx + x1, cy + y2, isTarget ? 4 : 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Pin label on hover or highlighted state
            if (isTarget && p.label) {
              ctx.fillStyle = '#FFFFFF';
              ctx.font = 'bold 11px Inter, sans-serif';
              ctx.textAlign = 'center';
              ctx.shadowColor = 'rgba(0,0,0,0.8)';
              ctx.shadowBlur = 4;
              ctx.fillText(p.label, cx + x1, cy + y2 - 12);
              ctx.shadowBlur = 0; // reset
            }
          } else if (p.type === 'cloud') {
            // Draw atmospheric cloud puffs
            const size = Math.max(4, 12 * depthMultiplier);
            const opacity = Math.max(0.05, 0.25 * depthMultiplier);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(cx + x1, cy + y2, size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(cx + x1 + size * 0.4, cy + y2 - size * 0.2, size * 0.7, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 4. Render Orbiting Travel Routes Arcs
      routes.current.forEach((route) => {
        // Convert route starting/ending points from spherical to Cartesian, then rotate
        const getProjPt = (lat: number, lng: number) => {
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lng + 180) * (Math.PI / 180);

          const rx = sphereRadius * Math.sin(phi) * Math.sin(theta);
          const ry = sphereRadius * Math.cos(phi);
          const rz = sphereRadius * Math.sin(phi) * Math.cos(theta);

          // Rotate
          let rx1 = rx * Math.cos(angleY.current) - rz * Math.sin(angleY.current);
          let rz1 = rx * Math.sin(angleY.current) + rz * Math.cos(angleY.current);

          let ry2 = ry * Math.cos(angleX.current) - rz1 * Math.sin(angleX.current);
          let rz2 = ry * Math.sin(angleX.current) + rz1 * Math.cos(angleX.current);

          return { x: cx + rx1, y: cy + ry2, z: rz2 };
        };

        const pt1 = getProjPt(route.from.lat, route.from.lng);
        const pt2 = getProjPt(route.to.lat, route.to.lng);

        // If one of the endpoints is visible
        if (pt1.z > -10 || pt2.z > -10) {
          // Draw a curved line (quadratic bezier arc bowing upwards relative to center)
          const midX = (pt1.x + pt2.x) / 2;
          const midY = (pt1.y + pt2.y) / 2;
          
          // Pull control point away from center slightly to create a lovely flight arch
          const dx = pt2.x - pt1.x;
          const dy = pt2.y - pt1.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const pullAngle = Math.atan2(dy, dx) - Math.PI/2;
          const cpX = midX + Math.cos(pullAngle) * (dist * 0.3);
          const cpY = midY + Math.sin(pullAngle) * (dist * 0.3);

          // Set dash pattern
          ctx.strokeStyle = route.color;
          ctx.setLineDash([3, 4]);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.quadraticCurveTo(cpX, cpY, pt2.x, pt2.y);
          ctx.stroke();
          ctx.setLineDash([]); // reset

          // Draw the sweeping glowing tracer dot along route
          route.progress += route.speed;
          if (route.progress > 1) {
            route.progress = 0;
            // Switch color of active pulse path randomly to increase organic beauty
            route.color = Math.random() > 0.5 ? '#10B981' : '#FBBF24';
          }

          // Evaluate quadratic bezier point
          const t = route.progress;
          const traceX = (1-t)*(1-t)*pt1.x + 2*(1-t)*t*cpX + t*t*pt2.x;
          const traceY = (1-t)*(1-t)*pt1.y + 2*(1-t)*t*cpY + t*t*pt2.y;
          const traceZ = (1-t)*pt1.z + t*pt2.z;

          if (traceZ > 0) {
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = route.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(traceX, traceY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      });

      // 5. Plane Orbiting Orbit
      airplaneAngle.current += 0.006;
      const planeRadius = sphereRadius + 35;
      const pAngle = airplaneAngle.current;
      // Orbit in a tilted plane
      const px = planeRadius * Math.cos(pAngle);
      const py = planeRadius * Math.sin(pAngle) * 0.5; // flatter orbit ellipse
      const pz = planeRadius * Math.sin(pAngle) * 0.86;

      // Rotate orbit coordinates on global Y and X tilt
      let px1 = px * Math.cos(angleY.current) - pz * Math.sin(angleY.current);
      let pz1 = px * Math.sin(angleY.current) + pz * Math.cos(angleY.current);

      let py2 = py * Math.cos(angleX.current) - pz1 * Math.sin(angleX.current);
      let pz2 = py * Math.sin(angleX.current) + pz1 * Math.cos(angleX.current);

      if (pz2 > 0) {
        // Plane is on front face - draw elegant plane icon representation
        ctx.fillStyle = '#FBBF24'; // beautiful golden star/airplane indicator
        ctx.beginPath();
        ctx.arc(cx + px1, cy + py2, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Little dynamic exhaust engine trails
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // Draw tail trail segment
        const prevAngle = pAngle - 0.12;
        const tx = planeRadius * Math.cos(prevAngle);
        const ty = planeRadius * Math.sin(prevAngle) * 0.5;
        const tz = planeRadius * Math.sin(prevAngle) * 0.86;
        let tx1 = tx * Math.cos(angleY.current) - tz * Math.sin(angleY.current);
        let tz1 = tx * Math.sin(angleY.current) + tz * Math.cos(angleY.current);
        let ty2 = ty * Math.cos(angleX.current) - tz1 * Math.sin(angleX.current);
        ctx.moveTo(cx + px1, cy + py2);
        ctx.lineTo(cx + tx1, cy + ty2);
        ctx.stroke();

        // Draw micro SVG airplane wings decoration
        ctx.save();
        ctx.translate(cx + px1, cy + py2);
        ctx.rotate(Math.atan2(py2 - ty2, px1 - tx1));
        ctx.fillStyle = '#FBBF24';
        ctx.beginPath();
        ctx.moveTo(4, 0);
        ctx.lineTo(-6, -5);
        ctx.lineTo(-4, 0);
        ctx.lineTo(-6, 5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [points3D, stars, activePin]);

  // Adjust size to container fluid width
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      const parentWidth = container.clientWidth;
      canvas.width = parentWidth;
      canvas.height = parentWidth; // Keep aspect ratio squared
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      <canvas
        id="globe-3d-canvas"
        ref={canvasRef}
        className="block max-w-full z-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClick={handleCanvasClick}
      />
    </div>
  );
}
