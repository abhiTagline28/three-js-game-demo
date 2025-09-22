"use client";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

//================================================================//
//  1. Model Viewer Component
//================================================================//
const ModelViewer = ({ url, duration, speed, isAnimating, onAnimationEnd }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions, mixer } = useAnimations(animations, group);

  // Effect to apply yellow color to coin objects
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Look for objects that might be coins (you can adjust this condition)
          if (
            child.name.toLowerCase().includes("coin") ||
            child.name.toLowerCase().includes("circle") ||
            child.geometry.type === "SphereGeometry" ||
            child.geometry.type === "CylinderGeometry"
          ) {
            child.material = new THREE.MeshStandardMaterial({
              color: "#FFD700", // Gold/Yellow color
              metalness: 0.8,
              roughness: 0.2,
            });
          }
        }
      });
    }
  }, [scene]);

  // Effect to handle playing and stopping the animation
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;
    const allActions = Object.values(actions);

    allActions.forEach((action) => {
      // action.setLoop(THREE.LoopRepeat, Infinity);
      // action.clampWhenFinished = false;
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;

      if (isAnimating) {
        action.reset().play();
      }
    });

    if (isAnimating && mixer) {
      mixer.addEventListener("finished", onAnimationEnd);
    }

    return () => {
      if (mixer) mixer.removeEventListener("finished", onAnimationEnd);
    };
  }, [actions, isAnimating, mixer, onAnimationEnd]);

  // Effect to adjust animation speed based on duration and speed multiplier
  useEffect(() => {
    if (actions && animations.length > 0 && duration > 0) {
      const originalDuration = animations[0].duration; // Original duration in seconds
      const targetDuration = duration / 1000; // Your desired duration in seconds

      // Calculate the time scale from duration and then multiply by the speed control
      const timeScale = (originalDuration / targetDuration) * speed;

      Object.values(actions).forEach((action) => {
        action.setEffectiveTimeScale(timeScale);
      });
    }
  }, [duration, speed, actions, animations]);

  return <primitive ref={group} object={scene} dispose={null} />;
};

//================================================================//
//  2. Main Application Component
//================================================================//
const ModelViewerApp = () => {
  const glbFiles = ["/head.glb", "/tail.glb"];

  // Set the initial file directly instead of randomly
  const [currentFile, setCurrentFile] = useState(glbFiles[1]);
  const [fileName, setFileName] = useState("");
  const [duration, setDuration] = useState(5000);
  const [speed, setSpeed] = useState(1);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(9);
  const [orbitControlsRef, setOrbitControlsRef] = useState(null);

  // This effect updates the display name when the model changes
  useEffect(() => {
    if (currentFile) {
      setFileName(currentFile.split("/").pop());
    }
  }, [currentFile]);

  // Apply initial zoom level when OrbitControls are ready
  useEffect(() => {
    if (orbitControlsRef && zoomLevel === 9) {
      updateCameraZoom(zoomLevel);
    }
  }, [orbitControlsRef, zoomLevel]);

  // Auto-start animation after 3 seconds when component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAnimating) {
        startAnimation();
      }
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [isAnimating]);

  const toggleModel = () => {
    // Switch to the other file in the glbFiles array
    setCurrentFile((prevFile) =>
      prevFile === glbFiles[0] ? glbFiles[1] : glbFiles[0]
    );
    // Reset animation state for the new model
    setIsAnimating(false);
  };

  const toggleControls = () => {
    setControlsEnabled(!controlsEnabled);
  };

  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  const handleAnimationEnd = () => {
    console.log(`Animation finished for: ${fileName}`);
    setIsAnimating(false);
  };

  const zoomIn = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.min(prev + 1, 10); // Max zoom of 10
      updateCameraZoom(newZoom);
      return newZoom;
    });
  };

  const zoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 1, 1); // Min zoom of 1
      updateCameraZoom(newZoom);
      return newZoom;
    });
  };

  const updateCameraZoom = (zoomValue) => {
    if (orbitControlsRef) {
      // Reset to default position first
      const targetDistance = 10 / zoomValue; // Higher zoom = closer distance
      orbitControlsRef.object.position.setLength(targetDistance);
      orbitControlsRef.update();
    }
  };

  return (
    <div
      className="gaming-table-bg"
      style={{
        width: "35vw",
        height: "50vh",
        position: "relative",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        border: "2px solid rgba(255, 215, 0, 0.3)",
        boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
      }}
    >
      <Canvas camera={{ position: [0, 2, 0], rotation: [1, 2, 3] }}>
        <ambientLight intensity={0.6} color="#ffd4a3" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          color="#ffd4a3"
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#ffd4a3"
        />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#ffd4a3" />
        {currentFile && (
          <ModelViewer
            // Adding a key ensures the component fully resets when the model changes
            key={currentFile}
            url={currentFile}
            duration={duration}
            speed={speed}
            isAnimating={isAnimating}
            onAnimationEnd={handleAnimationEnd}
          />
        )}
        <OrbitControls
          ref={setOrbitControlsRef}
          enabled={controlsEnabled}
          enableZoom={true}
          zoomSpeed={0.5}
        />
      </Canvas>
      {fileName && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          Model: **{fileName}**
        </div>
      )}

      {/* Controls Panel */}
      {/* <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "12px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            htmlFor="duration-input"
            style={{ color: "white", marginRight: "10px", minWidth: "150px" }}
          >
            Duration (ms):
          </label>
          <input
            id="duration-input"
            type="number"
            step="100"
            value={duration}
            onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
            style={{ width: "80px", padding: "4px" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            htmlFor="speed-slider"
            style={{ color: "white", marginRight: "10px", minWidth: "150px" }}
          >
            Speed Multiplier:
          </label>
          <input
            id="speed-slider"
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
          <span style={{ color: "white", marginLeft: "10px", width: "40px" }}>
            {speed.toFixed(1)}x
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            style={{ color: "white", marginRight: "10px", minWidth: "150px" }}
          >
            Zoom:
          </label>
          <button
            onClick={zoomOut}
            style={{
              padding: "5px 10px",
              marginRight: "5px",
              backgroundColor: "#4a5568",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            -
          </button>
          <button
            onClick={zoomIn}
            style={{
              padding: "5px 10px",
              marginRight: "10px",
              backgroundColor: "#4a5568",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            +
          </button>
          <span style={{ color: "white", minWidth: "40px" }}>
            {zoomLevel.toFixed(1)}x
          </span>
        </div>
      </div> */}

      {/* Action Buttons */}
      {/* <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
          zIndex: 10,
        }}
      >
        <button
          onClick={toggleModel}
          style={{ padding: "10px", width: "150px" }}
        >
          Toggle Model
        </button>
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          style={{ padding: "10px", width: "150px" }}
        >
          {isAnimating ? "Animating..." : "Play Animation"}
        </button>
        <button
          onClick={toggleControls}
          style={{ padding: "10px", width: "150px" }}
        >
          {controlsEnabled ? "Disable Controls" : "Enable Controls"}
        </button>
      </div> */}
    </div>
  );
};

export default ModelViewerApp;
