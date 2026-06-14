import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScanFace, CheckCircle2, XCircle, ArrowLeft, AlertCircle } from "lucide-react";
import { PageTopbar } from "../components/layout/Navbar";
import api from "../services/api";
import { useAppStore } from "../store/useAppStore";

interface CameraLocationState {
  personId?: string;
  fullName?: string;
  lastSeenLocation?: string;
}

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processingRef = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { addAdminLog } = useAppStore();

  const state = (location.state as CameraLocationState) || {};
  const personId = state.personId || "person1";

  const [found, setFound] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [cameraError, setCameraError] = useState("");
  const [cameraReady, setCameraReady] = useState(false);

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const sendFrame = async () => {
    if (processingRef.current) return;
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    processingRef.current = true;

    try {
      const canvas = canvasRef.current;
      canvas.width = 640;
      canvas.height = 480;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        processingRef.current = false;
        return;
      }

      ctx.drawImage(video, 0, 0, 640, 480);
      const frame = canvas.toDataURL("image/jpeg", 0.7);

      const response = await api.post("/search", {
        profile: personId,
        frame,
      });

      const aiResult = response.data?.result;

      if (aiResult) {
        const isMatch = aiResult.found === true;
        setFound(isMatch);
        setConfidence(aiResult.confidence || 0);

        if (isMatch) {
          addAdminLog({
            event: "Match Confirmed",
            user: "System AI",
            location: state.lastSeenLocation || "Live Camera",
            status: `Match Found (${Math.round((aiResult.confidence || 0) * 100)}%)`,
            color: "#10B981",
          });
        }
      } else {
        setFound(false);
        setConfidence(0);
      }
    } catch (error) {
      console.error(error);
      setFound(false);
      setConfidence(0);
    } finally {
      processingRef.current = false;
    }
  };

  const startCamera = async () => {
    try {
      setCameraError("");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraReady(true);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = window.setInterval(sendFrame, 500);
    } catch (error) {
      console.error(error);
      setCameraError(
        "Unable to access camera. Please allow camera permissions and try again."
      );
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div style={{ background: "#161618", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <PageTopbar pageTitle="Live Face Recognition" />

      <div className="px-4 py-6 md:px-8 md:py-10 max-w-[1000px] mx-auto w-full flex-1">
        <button
          onClick={() => navigate("/missing-person")}
          style={{
            background: "transparent",
            border: "1px solid #475569",
            borderRadius: 8,
            padding: "8px 14px",
            color: "#9CA3AF",
            fontSize: 12,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 24,
          }}
        >
          <ArrowLeft size={14} /> Back to Report
        </button>

        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#F8FAFC",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <ScanFace size={28} color="#A855F7" /> Live Camera Scan
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 13, maxWidth: 600, lineHeight: 1.6 }}>
            {state.fullName
              ? `Scanning for ${state.fullName}. Point the camera at faces to compare against the uploaded reference photos.`
              : "Point the camera at faces to compare against registered missing person photos."}
          </p>
        </div>

        {cameraError && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 8,
              padding: "16px",
              marginBottom: 24,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ color: "#FCA5A5", fontSize: 13, marginBottom: 8 }}>{cameraError}</div>
              <button
                onClick={startCamera}
                style={{
                  background: "#7C3AED",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 14px",
                  color: "#FFF",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Retry Camera
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div
            style={{
              background: "#1A1C20",
              borderRadius: 12,
              border: `2px solid ${found ? "#10B981" : "#2A2D35"}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #2A2D35",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF" }}>
                LIVE CAMERA FEED
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: cameraReady ? "#EF4444" : "#9CA3AF",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: cameraReady ? "#EF4444" : "#64748B",
                  }}
                />
                {cameraReady ? "LIVE" : "STARTING..."}
              </span>
            </div>

            <div style={{ background: "#000", display: "flex", justifyContent: "center" }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: "100%",
                  maxHeight: 480,
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: found ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                border: `1px solid ${found ? "#10B981" : "#EF4444"}`,
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              {found ? (
                <CheckCircle2 size={40} color="#10B981" style={{ margin: "0 auto 12px" }} />
              ) : (
                <XCircle size={40} color="#EF4444" style={{ margin: "0 auto 12px" }} />
              )}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: found ? "#10B981" : "#EF4444",
                  marginBottom: 4,
                }}
              >
                {found ? "MATCH FOUND" : "NO MATCH"}
              </div>
              <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                Confidence: {(confidence * 100).toFixed(1)}%
              </div>
            </div>

            <div
              style={{
                background: "#1A1C20",
                borderRadius: 12,
                border: "1px solid #2A2D35",
                padding: 20,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", marginBottom: 12 }}>
                SCAN STATUS
              </div>
              <div style={{ fontSize: 13, color: "#E2E8F0", lineHeight: 1.6 }}>
                {cameraReady
                  ? "Camera is active. AI is analyzing each frame in real-time against the registered face profile."
                  : "Initializing camera..."}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  color: "#64748B",
                }}
              >
                Profile ID: {personId}
              </div>
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}
